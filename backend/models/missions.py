from pydantic import BaseModel
from typing import Optional
from enum import Enum
from typing import List 

class Reward(BaseModel):
    amt_money: int
    amt_exp: int
    amt_health: int
    
# class MissionStatus(str, Enum):
#     not_completed = "not_completed"
#     completed = "completed"

class Consequence(BaseModel):
    health_penalty: int
    money_penalty: int

class LearnerMedal(BaseModel):
    title: str  # Example: "Financial Planning & Discipline"
    options: List[str]  # List of lesson choices

class Mission(BaseModel):
    title: str 
    description: str
    task_type: str 
    objective: str 
    reward: Reward
    required_level: int
    # status: MissionStatus = MissionStatus.not_completed  # Default status is "active"
    consequence: Consequence
    learner_medal: Optional[LearnerMedal] = None  # New field for unlocked lessons

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
