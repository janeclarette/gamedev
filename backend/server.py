from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, characters, animations

app = FastAPI()


origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(users.router, prefix="/users")
app.include_router(characters.router, prefix="/characters")
app.include_router(animations.router, prefix="/animations")