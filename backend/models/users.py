from pydantic import BaseModel
from datetime import date
from bson import ObjectId
from typing import Optional
from enum import Enum


class Role(str, Enum):
    admin = "admin"
    user = "user"
    
    
class User(BaseModel):
    username: str
    email: str
    password: str
    birthday: date = None
    img_path: str = None
    disabled: bool = None
    role: Role = Role.user
    character_id: Optional[ObjectId] = None  # Add this line to include character_id