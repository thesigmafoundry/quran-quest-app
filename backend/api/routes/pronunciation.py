"""
Pronunciation assessment API routes for the Quranic Quest application.
This module handles all endpoints related to pronunciation feedback and assessment.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import List, Optional
import os
import uuid
import logging
from datetime import datetime

# Import services and models
from services.pronunciation import PronunciationService
from services.audio import AudioProcessingService
from models.pronunciation import PronunciationAssessment, PronunciationFeedback
from models.user import User
from api.dependencies import get_current_user

# Set up logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

# Initialize services
pronunciation_service = PronunciationService()
audio_service = AudioProcessingService()

@router.post("/assess", response_model=PronunciationAssessment)
async def assess_pronunciation(
    background_tasks: BackgroundTasks,
    audio_file: UploadFile = File(...),
    verse_id: str = None,
    user: User = Depends(get_current_user)
):
    """
    Assess the pronunciation of a Quranic verse from an audio recording.
    
    Args:
        audio_file: The audio recording of the user reciting the verse
        verse_id: The ID of the verse being recited
        user: The authenticated user (from token)
        
    Returns:
        PronunciationAssessment: Assessment results with feedback
    """
    try:
        # Generate a unique filename
        file_extension = os.path.splitext(audio_file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = f"data/audio_uploads/{unique_filename}"
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            content = await audio_file.read()
            buffer.write(content)
        
        # Process the audio file (normalize, remove noise, etc.)
        processed_audio_path = await audio_service.process_audio(file_path)
        
        # Perform pronunciation assessment
        assessment = await pronunciation_service.assess_pronunciation(
            processed_audio_path, 
            verse_id,
            user.id
        )
        
        # Schedule cleanup of audio files in the background
        background_tasks.add_task(audio_service.cleanup_audio_files, [file_path, processed_audio_path])
        
        # Log the assessment
        logger.info(f"Pronunciation assessment completed for user {user.id}, verse {verse_id}")
        
        return assessment
        
    except Exception as e:
        logger.error(f"Error in pronunciation assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing pronunciation: {str(e)}")

@router.get("/feedback/{assessment_id}", response_model=PronunciationFeedback)
async def get_detailed_feedback(
    assessment_id: str,
    user: User = Depends(get_current_user)
):
    """
    Get detailed feedback for a previous pronunciation assessment.
    
    Args:
        assessment_id: The ID of the assessment to get feedback for
        user: The authenticated user (from token)
        
    Returns:
        PronunciationFeedback: Detailed feedback with improvement suggestions
    """
    try:
        # Get detailed feedback
        feedback = await pronunciation_service.get_detailed_feedback(assessment_id, user.id)
        
        if not feedback:
            raise HTTPException(status_code=404, detail="Assessment not found")
            
        return feedback
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving pronunciation feedback: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving feedback: {str(e)}")

@router.get("/history", response_model=List[PronunciationAssessment])
async def get_pronunciation_history(
    user: User = Depends(get_current_user),
    limit: int = 10,
    offset: int = 0
):
    """
    Get the user's pronunciation assessment history.
    
    Args:
        user: The authenticated user (from token)
        limit: Maximum number of records to return
        offset: Number of records to skip
        
    Returns:
        List[PronunciationAssessment]: List of previous pronunciation assessments
    """
    try:
        history = await pronunciation_service.get_user_history(user.id, limit, offset)
        return history
        
    except Exception as e:
        logger.error(f"Error retrieving pronunciation history: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving history: {str(e)}")

@router.get("/progress", response_model=dict)
async def get_pronunciation_progress(
    user: User = Depends(get_current_user),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    """
    Get the user's pronunciation progress over time.
    
    Args:
        user: The authenticated user (from token)
        start_date: Optional start date for the progress report
        end_date: Optional end date for the progress report
        
    Returns:
        dict: Progress metrics and trends
    """
    try:
        progress = await pronunciation_service.get_progress_metrics(
            user.id,
            start_date,
            end_date
        )
        
        return progress
        
    except Exception as e:
        logger.error(f"Error retrieving pronunciation progress: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving progress: {str(e)}")
