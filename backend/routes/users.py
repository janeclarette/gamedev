from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse

# MongoDB and Secret Key
from config.db import db  
from utils.utils import SECRET_KEY

# Cloudinary
import cloudinary.uploader
import config.cloudinary 
# Logging
import logging

from motor.motor_asyncio import AsyncIOMotorClient

from itsdangerous import URLSafeTimedSerializer
from bson import ObjectId
import bcrypt
from utils.utils import create_access_token
from datetime import timedelta, datetime, date  
from models.users import Role
from fastapi import Body

# Mailtrap
from config.mailtrap import MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# firebase
from google.auth.transport import requests   
from google.oauth2 import id_token 
from firebase_backend import firebaseconfig
from firebase_admin import auth


router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the serializer with the SECRET_KEY
serializer = URLSafeTimedSerializer(SECRET_KEY)



def send_verification_email(email: str, token: str):
    subject = "Email Verification"
    verification_url = f"http://localhost:8000/users/verify-email?token={token}"
    body = f"""
    <html>
        <body>
            <p>Please click the following link to verify your email:</p>
            <a href="{verification_url}">Verify Email</a>
        </body>
    </html>
    """

    msg = MIMEMultipart()
    msg["From"] = MAIL_FROM
    msg["To"] = email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))  # Use "html" instead of "plain"

    try:
        with smtplib.SMTP(MAIL_HOST, MAIL_PORT) as server:
            server.login(MAIL_USERNAME, MAIL_PASSWORD)
            server.sendmail(MAIL_FROM, email, msg.as_string())
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")
@router.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    birthday: date = Form(...), 
    verified: bool = Form(False),
    img: UploadFile = File(None)  # Make img optional
):
    try:
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        img_url = None
        if img:
            try:
                # Ensure the "users" folder exists in Cloudinary
                result = cloudinary.uploader.upload(img.file, folder="users")
                img_url = result.get("secure_url")
            except Exception as e:
                logger.error(f"Image upload failed: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")
        
        birthday_str = birthday.strftime("%Y-%m-%d")
        
        user_dict = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "birthday": birthday_str,
            "img_path": img_url,
            "verified": verified,
            "role": Role.user,
            "created_at": datetime.now().isoformat()  # Use ISO format for JSON serialization
        }
        inserted_user = db["users"].insert_one(user_dict)
        user_dict["_id"] = str(inserted_user.inserted_id)

        # Generate verification token
        token = serializer.dumps(email, salt="email-verification")
        send_verification_email(email, token)
        
        return JSONResponse(content={
            "message": "User registered successfully. Please check your email to verify your account.", 
            "user": user_dict
        })
    
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/verify-email")
async def verify_email(token: str):
    try:
        email = serializer.loads(token, salt="email-verification", max_age=3600)
        user = db["users"].find_one({"email": email})
        if not user:
            raise HTTPException(status_code=400, detail="Invalid token or user does not exist")

        db["users"].update_one({"email": email}, {"$set": {"verified": True}})
        return JSONResponse(content={"message": "Email verified successfully"})
    except Exception as e:
        logger.error(f"Email verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Email verification failed")
    
@router.post("/login")
async def login(
    email: str = Body(...), 
    password: str = Body(...),  
):
    try:
        user = db["users"].find_one({"email": email})
        if not user:
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        if not user["verified"]:
            raise HTTPException(status_code=400, detail="Email not verified. Please check your email to verify your account.")
        
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)
        
        # Initialize stats for the user if they don't already exist
        user_id = user["_id"]
        existing_stats = db["stats"].find_one({"user_id": ObjectId(user_id)})
        if not existing_stats:
            new_stats = {
                "user_id": ObjectId(user_id),
                "health": 100,
                "level": 1,
                "money": 5000,
                "experience": 0,
                "location": {
                    "x": 0.0,
                    "y": 0.0,
                    "z": 0.0
                }
            }
            db["stats"].insert_one(new_stats)
        
        return JSONResponse(content={"access_token": access_token, "token_type": "bearer"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/google-signup")
async def google_signup(request: Request):
    try:
        body = await request.json()
        token = body.get("token")
        logger.info(f"Received token: {token}")  # Log the token

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        username = id_info.get("name")
        email = id_info.get("email")
        birthday = id_info.get("birthday", None)  # Handle missing birthday
        img_path = id_info.get("picture")

        # Check if user already exists in MongoDB
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Check if user already exists in Firebase
        try:
            user_record = auth.get_user_by_email(email)
            logger.info(f"User already exists in Firebase: {user_record.uid}")
        except auth.UserNotFoundError:
            # Create a new user in Firebase
            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

        # Save additional user information to your MongoDB database
        try:
            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        except Exception as e:
            logger.error(f"MongoDB user creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="MongoDB user creation failed")

        return JSONResponse(content={"message": "User registered successfully", "user": user_dict})

    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/google-login")
async def google_login(request: Request):
    try:
        body = await request.json()
        token = body.get("token")

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        email = id_info.get("email")

        # Check if user exists in the database
        user = db["users"].find_one({"email": email})
        if not user:
            # If user does not exist, create a new user in Firebase and the database
            username = id_info.get("name")
            birthday = id_info.get("birthday")
            img_path = id_info.get("picture")

            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user,
                "verified": True
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        else:
            user_dict = user
            user_dict["_id"] = str(user_dict["_id"])  # Convert ObjectId to string

        # Generate access token
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(data={"sub": user_dict["email"]}, expires_delta=access_token_expires)

        return JSONResponse(content={"access_token": access_token, "token_type": "bearer", "user": user_dict})

    except ValueError as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Token verification failed")
    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
# @router.post("/facebook-signup")
# async def facebook_signup(request: Request):
    try:
        body = await request.json()
        token = body.get("token")

        if not token:
            raise HTTPException(status_code=400, detail="Token is required")

        # Verify the token with Firebase
        try:
            id_info = auth.verify_id_token(token)
        except ValueError as e:
            logger.error(f"Token verification failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Token verification failed")

        # Retrieve user information
        username = id_info.get("name")
        email = id_info.get("email")
        birthday = id_info.get("birthday", None)  # Handle missing birthday
        img_path = id_info.get("picture")

        # Check if user already exists in MongoDB
        if db["users"].find_one({"email": email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Check if user already exists in Firebase
        try:
            user_record = auth.get_user_by_email(email)
            logger.info(f"User already exists in Firebase: {user_record.uid}")
        except auth.UserNotFoundError:
            # Create a new user in Firebase
            try:
                user_record = auth.create_user(
                    email=email,
                    email_verified=True,
                    display_name=username,
                    photo_url=img_path,
                )
            except Exception as e:
                logger.error(f"Firebase user creation failed: {str(e)}")
                raise HTTPException(status_code=500, detail="Firebase user creation failed")

        # Save additional user information to your MongoDB database
        try:
            user_dict = {
                "username": username,
                "email": email,
                "password": None,  # Explicitly set password to None
                "birthday": birthday,
                "img_path": img_path,
                "firebase_uid": user_record.uid,
                "role": Role.user
            }
            inserted_user = db["users"].insert_one(user_dict)
            user_dict["_id"] = str(inserted_user.inserted_id)
        except Exception as e:
            logger.error(f"MongoDB user creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="MongoDB user creation failed")

        return JSONResponse(content={"message": "User registered successfully", "user": user_dict})

    except HTTPException as e:
        logger.error(f"HTTPException: {str(e)}")
        raise e
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")