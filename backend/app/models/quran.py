"""
Models for Quranic data in the Quranic Quest application.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class QuranVerse(BaseModel):
    """Model for a Quranic verse."""
    
    id: str = Field(..., description="Unique identifier for the verse (format: surah:ayah)")
    surah_number: int = Field(..., description="Surah number")
    ayah_number: int = Field(..., description="Ayah number within the surah")
    
    arabic_text: str = Field(..., description="Arabic text of the verse")
    transliteration: str = Field(..., description="Transliteration of the verse")
    translation: str = Field(..., description="English translation of the verse")
    
    tajweed_rules: List[Dict[str, Any]] = Field([], description="Tajweed rules applicable to this verse")
    phonetic_segments: List[Dict[str, str]] = Field([], description="Phonetic breakdown of the verse")
    
    difficulty_level: int = Field(1, description="Difficulty level for recitation (1-5)")
    
class QuranSurah(BaseModel):
    """Model for a Quranic surah (chapter)."""
    
    number: int = Field(..., description="Surah number")
    name_arabic: str = Field(..., description="Arabic name of the surah")
    name_english: str = Field(..., description="English name of the surah")
    english_meaning: str = Field(..., description="English meaning of the surah name")
    
    revelation_type: str = Field(..., description="Meccan or Medinan")
    verses_count: int = Field(..., description="Number of verses in the surah")
    
    summary: str = Field(..., description="Brief summary of the surah")
    
class TajweedRule(BaseModel):
    """Model for a tajweed rule."""
    
    id: str = Field(..., description="Unique identifier for the rule")
    name_arabic: str = Field(..., description="Arabic name of the rule")
    name_english: str = Field(..., description="English name of the rule")
    
    description: str = Field(..., description="Description of the rule")
    examples: List[Dict[str, str]] = Field(..., description="Examples of the rule in application")
    
    difficulty_level: int = Field(1, description="Difficulty level (1-5)")
    
class RecitationReference(BaseModel):
    """Model for a reference recitation."""
    
    id: str = Field(..., description="Unique identifier for the recitation")
    verse_id: str = Field(..., description="ID of the verse")
    
    reciter_name: str = Field(..., description="Name of the reciter")
    audio_url: str = Field(..., description="URL to the audio file")
    
    duration_seconds: float = Field(..., description="Duration of the recitation in seconds")
    quality: str = Field("high", description="Audio quality (low, medium, high)")
    
    tajweed_features: List[str] = Field([], description="Tajweed features demonstrated in this recitation")
