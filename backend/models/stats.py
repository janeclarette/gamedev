from pydantic import BaseModel, Field
from datetime import date, datetime, timezone
from bson import ObjectId
from typing import Optional
from enum import Enum
from typing import List

class AcquiredMedal(BaseModel):
    medal_title: str  
    chosen_option: str  
    acquired_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
class Coordinates(BaseModel):
    x: float
    y: float
    z: float

class Stats(BaseModel):
    user_id: str
    health: int = 100
    level: int = 1
    money: int = 5000
    experience: int = 0
    location: Coordinates = Coordinates(x=0.0, y=0.0, z=0.0)
    acquired_medals: List[AcquiredMedal] = []  

    

    class Config:
        arbitrary_types_allowed = True  # Allow arbitrary types like ObjectId

