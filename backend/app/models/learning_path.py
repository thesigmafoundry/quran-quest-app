"""
Models for learning paths in the Quranic Quest application.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class LearningUnit(BaseModel):
    """Model for a learning unit within a learning path."""
    
    id: str = Field(..., description="Unique identifier for the learning unit")
    title: str = Field(..., description="Title of the learning unit")
    description: str = Field(..., description="Description of the learning unit")
    content_type: str = Field(..., description="Type of content (lesson, recitation, quiz, etc.)")
    difficulty: int = Field(..., description="Difficulty level (1-5)")
    estimated_duration_minutes: int = Field(..., description="Estimated time to complete in minutes")
    order: int = Field(..., description="Order in the learning path")
    completed: bool = Field(False, description="Whether the unit has been completed")
    verses: List[str] = Field([], description="List of verse IDs if applicable")

class LearningPath(BaseModel):
    """Model for a personalized learning path."""
    
    id: str = Field(..., description="Unique identifier for the learning path")
    user_id: str = Field(..., description="ID of the user this path is for")
    created_at: datetime = Field(..., description="When the learning path was created")
    updated_at: datetime = Field(..., description="When the learning path was last updated")
    
    level: str = Field(..., description="Learning level (beginner, intermediate, advanced)")
    estimated_completion_date: datetime = Field(..., description="Estimated date of completion")
    
    learning_units: List[LearningUnit] = Field(..., description="Units in the learning path")
    current_unit_index: int = Field(0, description="Index of the current unit in the path")
    completed_unit_ids: List[str] = Field([], description="IDs of completed units")
    
    active: bool = Field(True, description="Whether this is the active learning path")

class LearningProgress(BaseModel):
    """Model for tracking progress in a learning unit."""
    
    id: str = Field(..., description="Unique identifier for the progress record")
    user_id: str = Field(..., description="ID of the user")
    unit_id: str = Field(..., description="ID of the learning unit")
    timestamp: datetime = Field(..., description="When the progress was recorded")
    
    completed: bool = Field(False, description="Whether the unit was completed")
    time_spent_minutes: int = Field(..., description="Time spent on the unit in minutes")
    
    score: Optional[int] = Field(None, description="Score if applicable (0-100)")
    accuracy_score: Optional[int] = Field(None, description="Accuracy score if applicable (0-100)")
    memorization_score: Optional[int] = Field(None, description="Memorization score if applicable (0-100)")
    
    notes: Optional[str] = Field(None, description="User or system notes on the progress")

class LearningPathCreate(BaseModel):
    """Model for creating a new learning path."""
    
    age: int = Field(..., description="Age of the user")
    proficiency_level: str = Field(..., description="Self-reported proficiency level")
    learning_goals: List[str] = Field(..., description="User's learning goals")
    time_commitment: Dict[str, Any] = Field(..., description="User's time commitment")
    assessment_results: Optional[Dict[str, Any]] = Field(None, description="Optional assessment results")
