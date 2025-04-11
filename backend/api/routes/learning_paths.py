"""
Learning paths API routes for the Quranic Quest application.
This module handles all endpoints related to personalized learning paths.
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
import logging
from datetime import datetime

# Import services and models
from services.learning_paths import LearningPathService
from models.learning_path import LearningPath, LearningPathCreate, LearningUnit, LearningProgress
from models.user import User
from api.dependencies import get_current_user

# Set up logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

# Initialize services
learning_path_service = LearningPathService()

@router.post("/generate", response_model=LearningPath)
async def generate_learning_path(
    learning_path_request: LearningPathCreate,
    user: User = Depends(get_current_user)
):
    """
    Generate a personalized learning path based on user profile and assessment results.
    
    Args:
        learning_path_request: Parameters for learning path generation
        user: The authenticated user (from token)
        
    Returns:
        LearningPath: The generated personalized learning path
    """
    try:
        # Generate personalized learning path
        learning_path = await learning_path_service.generate_learning_path(
            user_id=user.id,
            age=learning_path_request.age,
            proficiency_level=learning_path_request.proficiency_level,
            learning_goals=learning_path_request.learning_goals,
            time_commitment=learning_path_request.time_commitment,
            assessment_results=learning_path_request.assessment_results
        )
        
        logger.info(f"Learning path generated for user {user.id}")
        return learning_path
        
    except Exception as e:
        logger.error(f"Error generating learning path: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating learning path: {str(e)}")

@router.get("/current", response_model=LearningPath)
async def get_current_learning_path(
    user: User = Depends(get_current_user)
):
    """
    Get the user's current active learning path.
    
    Args:
        user: The authenticated user (from token)
        
    Returns:
        LearningPath: The user's current learning path
    """
    try:
        learning_path = await learning_path_service.get_current_learning_path(user.id)
        
        if not learning_path:
            raise HTTPException(status_code=404, detail="No active learning path found")
            
        return learning_path
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving learning path: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving learning path: {str(e)}")

@router.get("/history", response_model=List[LearningPath])
async def get_learning_path_history(
    user: User = Depends(get_current_user),
    limit: int = 10,
    offset: int = 0
):
    """
    Get the user's learning path history.
    
    Args:
        user: The authenticated user (from token)
        limit: Maximum number of records to return
        offset: Number of records to skip
        
    Returns:
        List[LearningPath]: List of previous learning paths
    """
    try:
        history = await learning_path_service.get_learning_path_history(user.id, limit, offset)
        return history
        
    except Exception as e:
        logger.error(f"Error retrieving learning path history: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving history: {str(e)}")

@router.get("/next-units", response_model=List[LearningUnit])
async def get_next_learning_units(
    user: User = Depends(get_current_user),
    count: int = Query(3, ge=1, le=10)
):
    """
    Get the next learning units in the user's current learning path.
    
    Args:
        user: The authenticated user (from token)
        count: Number of next units to retrieve
        
    Returns:
        List[LearningUnit]: The next learning units
    """
    try:
        next_units = await learning_path_service.get_next_learning_units(user.id, count)
        
        if not next_units:
            raise HTTPException(status_code=404, detail="No upcoming learning units found")
            
        return next_units
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving next learning units: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving next units: {str(e)}")

@router.post("/update-progress", response_model=LearningProgress)
async def update_learning_progress(
    progress: LearningProgress,
    user: User = Depends(get_current_user)
):
    """
    Update the user's progress in their learning path.
    
    Args:
        progress: The progress update information
        user: The authenticated user (from token)
        
    Returns:
        LearningProgress: The updated learning progress
    """
    try:
        # Ensure the user can only update their own progress
        if progress.user_id != user.id:
            raise HTTPException(status_code=403, detail="Cannot update another user's progress")
            
        updated_progress = await learning_path_service.update_learning_progress(progress)
        
        # Check if learning path needs adjustment based on progress
        needs_adjustment = await learning_path_service.check_path_adjustment(user.id, progress)
        
        if needs_adjustment:
            # Adjust the learning path in the background
            await learning_path_service.adjust_learning_path(user.id, progress)
            logger.info(f"Learning path adjusted for user {user.id} based on progress")
        
        return updated_progress
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating learning progress: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating progress: {str(e)}")

@router.get("/recommendations", response_model=List[LearningUnit])
async def get_learning_recommendations(
    user: User = Depends(get_current_user),
    count: int = Query(5, ge=1, le=10)
):
    """
    Get personalized learning recommendations based on the user's progress and performance.
    
    Args:
        user: The authenticated user (from token)
        count: Number of recommendations to retrieve
        
    Returns:
        List[LearningUnit]: Personalized learning recommendations
    """
    try:
        recommendations = await learning_path_service.get_recommendations(user.id, count)
        return recommendations
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@router.post("/reset", response_model=LearningPath)
async def reset_learning_path(
    user: User = Depends(get_current_user)
):
    """
    Reset the user's current learning path and generate a new one based on their latest profile.
    
    Args:
        user: The authenticated user (from token)
        
    Returns:
        LearningPath: The newly generated learning path
    """
    try:
        new_path = await learning_path_service.reset_learning_path(user.id)
        logger.info(f"Learning path reset for user {user.id}")
        return new_path
        
    except Exception as e:
        logger.error(f"Error resetting learning path: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error resetting learning path: {str(e)}")
