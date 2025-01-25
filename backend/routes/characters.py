# # filepath: /C:/Users/ACER/Downloads/SIA2/backend/routes/characters.py
# from fastapi import APIRouter, HTTPException, Depends
# from pydantic import BaseModel
# from bson import ObjectId
# from typing import Optional
# from models.characters import Character, CharacterType
# from config_db import collection  # Import the MongoDB collection
# from utils import get_current_user  # Import the function to get the current authenticated user

# router = APIRouter()

# class CharacterCreate(BaseModel):
#     type: CharacterType
#     description: str

# @router.post("/create")
# async def create_character(character: CharacterCreate, current_user: dict = Depends(get_current_user)):
#     try:
#         # Create a new character associated with the authenticated user
#         new_character = Character(
#             type=character.type,
#             description=character.description,
#             user_id=current_user["_id"]
#         )
#         inserted_character = collection["characters"].insert_one(new_character.dict())
#         character_id = inserted_character.inserted_id

#         # Update the user with the character_id
#         collection["users"].update_one({"_id": current_user["_id"]}, {"$set": {"character_id": character_id}})
        
#         return {"message": "Character created successfully", "character_id": str(character_id)}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")