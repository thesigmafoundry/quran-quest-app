"""
Models for user data in the Quranic Quest application.
"""

from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base model for user data."""
    
    email: EmailStr = Field(..., description="User's email address")
    name: str = Field(..., description="User's full name")
    
class UserCreate(UserBase):
    """Model for creating a new user."""
    
    password: str = Field(..., description="User's password")
    
class User(UserBase):
    """Model for a user."""
    
    id: str = Field(..., description="Unique identifier for the user")
    created_at: datetime = Field(..., description="When the user was created")
    updated_at: datetime = Field(..., description="When the user was last updated")
    
    is_active: bool = Field(True, description="Whether the user is active")
    is_verified: bool = Field(False, description="Whether the user's email is verified")
    
    role: str = Field("user", description="User's role (user, admin, etc.)")
    
    # Profile information
    age: Optional[int] = Field(None, description="User's age")
    gender: Optional[str] = Field(None, description="User's gender")
    language: Optional[str] = Field(None, description="User's preferred language")
    
    # Learning information
    proficiency_level: Optional[str] = Field(None, description="User's proficiency level")
    learning_goals: List[str] = Field([], description="User's learning goals")
    
    # Subscription information
    subscription_status: Optional[str] = Field(None, description="User's subscription status")
    subscription_plan: Optional[str] = Field(None, description="User's subscription plan")
    subscription_expiry: Optional[datetime] = Field(None, description="When the subscription expires")
    
    # Family information
    is_parent: bool = Field(False, description="Whether the user is a parent")
    children: List[str] = Field([], description="IDs of the user's children")
    parent_id: Optional[str] = Field(None, description="ID of the user's parent")
    
    class Config:
        orm_mode = True

class UserProfile(BaseModel):
    """Model for user profile data."""
    
    user_id: str = Field(..., description="ID of the user")
    
    # Personal information
    name: str = Field(..., description="User's full name")
    age: Optional[int] = Field(None, description="User's age")
    gender: Optional[str] = Field(None, description="User's gender")
    language: Optional[str] = Field(None, description="User's preferred language")
    
    # Learning information
    proficiency_level: Optional[str] = Field(None, description="User's proficiency level")
    learning_goals: List[str] = Field([], description="User's learning goals")
    time_commitment: Dict[str, Any] = Field({}, description="User's time commitment")
    
    # Preferences
    notification_preferences: Dict[str, bool] = Field({}, description="User's notification preferences")
    display_preferences: Dict[str, Any] = Field({}, description="User's display preferences")
    
class ChildProfile(BaseModel):
    """Model for child profile data."""
    
    id: str = Field(..., description="Unique identifier for the child profile")
    parent_id: str = Field(..., description="ID of the parent user")
    
    name: str = Field(..., description="Child's full name")
    age: int = Field(..., description="Child's age")
    gender: Optional[str] = Field(None, description="Child's gender")
    
    proficiency_level: str = Field(..., description="Child's proficiency level")
    learning_goals: List[str] = Field(..., description="Child's learning goals")
    
    created_at: datetime = Field(..., description="When the profile was created")
    updated_at: datetime = Field(..., description="When the profile was last updated")
    
    active_learning_path_id: Optional[str] = Field(None, description="ID of the active learning path")
    
class UserAuth(BaseModel):
    """Model for user authentication data."""
    
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")
    
class Token(BaseModel):
    """Model for authentication token."""
    
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field("bearer", description="Token type")
    
class TokenData(BaseModel):
    """Model for token payload data."""
    
    user_id: str = Field(..., description="ID of the user")
    email: EmailStr = Field(..., description="User's email address")
    role: str = Field(..., description="User's role")
    exp: datetime = Field(..., description="Token expiration time")
