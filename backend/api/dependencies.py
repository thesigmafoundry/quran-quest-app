"""
API dependencies for the Quranic Quest application.
This module provides dependency functions for the API routes.
"""

import os
import logging
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# Import models
from models.user import User, TokenData

# Set up logging
logger = logging.getLogger(__name__)

# Set up OAuth2 with Password flow
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")  # In production, use a secure environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Mock user database for prototype
# In a real app, this would be a database query
MOCK_USERS = {
    "user1": {
        "id": "user1",
        "email": "parent@example.com",
        "name": "Parent User",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "password"
        "is_active": True,
        "is_verified": True,
        "role": "user",
        "created_at": datetime.now() - timedelta(days=30),
        "updated_at": datetime.now(),
        "is_parent": True,
        "children": ["child1"],
        "subscription_status": "active",
        "subscription_plan": "premium",
        "subscription_expiry": datetime.now() + timedelta(days=30)
    },
    "child1": {
        "id": "child1",
        "email": "child@example.com",
        "name": "Child User",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "password"
        "is_active": True,
        "is_verified": True,
        "role": "child",
        "created_at": datetime.now() - timedelta(days=30),
        "updated_at": datetime.now(),
        "is_parent": False,
        "parent_id": "user1",
        "age": 10
    }
}

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.
    
    Args:
        data: Data to encode in the token
        expires_delta: Optional expiration time
        
    Returns:
        str: JWT access token
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """
    Get the current authenticated user from the token.
    
    Args:
        token: JWT access token
        
    Returns:
        User: The authenticated user
        
    Raises:
        HTTPException: If authentication fails
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
        token_data = TokenData(
            user_id=user_id,
            email=payload.get("email"),
            role=payload.get("role"),
            exp=datetime.fromtimestamp(payload.get("exp"))
        )
        
    except JWTError:
        raise credentials_exception
        
    # Get the user from the database
    # In a real app, this would query a database
    user_data = MOCK_USERS.get(token_data.user_id)
    
    if user_data is None:
        raise credentials_exception
        
    if not user_data["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
        
    # Convert to User model
    user = User(
        id=user_data["id"],
        email=user_data["email"],
        name=user_data["name"],
        created_at=user_data["created_at"],
        updated_at=user_data["updated_at"],
        is_active=user_data["is_active"],
        is_verified=user_data["is_verified"],
        role=user_data["role"],
        is_parent=user_data.get("is_parent", False),
        children=user_data.get("children", []),
        parent_id=user_data.get("parent_id"),
        age=user_data.get("age"),
        subscription_status=user_data.get("subscription_status"),
        subscription_plan=user_data.get("subscription_plan"),
        subscription_expiry=user_data.get("subscription_expiry")
    )
    
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Get the current active user.
    
    Args:
        current_user: The authenticated user
        
    Returns:
        User: The authenticated active user
        
    Raises:
        HTTPException: If the user is inactive
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
        
    return current_user

async def get_current_parent_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Get the current parent user.
    
    Args:
        current_user: The authenticated user
        
    Returns:
        User: The authenticated parent user
        
    Raises:
        HTTPException: If the user is not a parent
    """
    if not current_user.is_parent:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Parent access required"
        )
        
    return current_user

async def get_current_subscribed_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Get the current subscribed user.
    
    Args:
        current_user: The authenticated user
        
    Returns:
        User: The authenticated subscribed user
        
    Raises:
        HTTPException: If the user does not have an active subscription
    """
    # Check if the user has an active subscription or is within the free trial period
    if (current_user.subscription_status != "active" and 
        current_user.subscription_status != "trial"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active subscription required"
        )
        
    # Check if the subscription has expired
    if (current_user.subscription_expiry and 
        current_user.subscription_expiry < datetime.now()):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Subscription has expired"
        )
        
    return current_user
