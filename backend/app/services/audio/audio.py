"""
Audio processing service for the Quranic Quest application.
This module handles audio file processing for pronunciation assessment.
"""

import os
import logging
import uuid
from typing import List, Optional
import numpy as np
import soundfile as sf
from pydub import AudioSegment
import librosa

# Set up logging
logger = logging.getLogger(__name__)

class AudioProcessingService:
    """Service for processing audio files for pronunciation assessment."""
    
    def __init__(self):
        """Initialize the audio processing service."""
        # Ensure necessary directories exist
        os.makedirs("data/audio_uploads", exist_ok=True)
        os.makedirs("data/audio_processed", exist_ok=True)
    
    async def process_audio(self, audio_file_path: str) -> str:
        """
        Process an audio file for pronunciation assessment.
        
        Args:
            audio_file_path: Path to the audio file to process
            
        Returns:
            str: Path to the processed audio file
        """
        try:
            # Generate a unique filename for the processed audio
            file_extension = os.path.splitext(audio_file_path)[1]
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            processed_file_path = f"data/audio_processed/{unique_filename}"
            
            # Load the audio file
            y, sr = librosa.load(audio_file_path, sr=None)
            
            # Apply preprocessing steps
            
            # 1. Noise reduction
            y_denoised = self._reduce_noise(y, sr)
            
            # 2. Normalization
            y_normalized = self._normalize_audio(y_denoised)
            
            # 3. Trim silence
            y_trimmed, _ = librosa.effects.trim(y_normalized, top_db=20)
            
            # Save the processed audio
            sf.write(processed_file_path, y_trimmed, sr)
            
            logger.info(f"Audio processed successfully: {processed_file_path}")
            return processed_file_path
            
        except Exception as e:
            logger.error(f"Error processing audio: {str(e)}")
            # If processing fails, return the original file
            return audio_file_path
    
    def _reduce_noise(self, y: np.ndarray, sr: int) -> np.ndarray:
        """
        Reduce noise in an audio signal.
        
        Args:
            y: Audio signal
            sr: Sample rate
            
        Returns:
            np.ndarray: Denoised audio signal
        """
        try:
            # In a real implementation, this would use a sophisticated noise reduction algorithm
            # For the prototype, we'll use a simple approach
            
            # Estimate noise from a small segment (assuming the first 0.5 seconds is noise)
            noise_sample = y[:int(sr * 0.5)] if len(y) > int(sr * 0.5) else y[:len(y)//10]
            
            # Calculate noise profile
            noise_profile = np.mean(np.abs(noise_sample))
            
            # Apply simple noise gate
            y_denoised = y.copy()
            mask = np.abs(y) < noise_profile * 2
            y_denoised[mask] = 0
            
            return y_denoised
            
        except Exception as e:
            logger.error(f"Error reducing noise: {str(e)}")
            return y
    
    def _normalize_audio(self, y: np.ndarray) -> np.ndarray:
        """
        Normalize audio to a standard volume level.
        
        Args:
            y: Audio signal
            
        Returns:
            np.ndarray: Normalized audio signal
        """
        try:
            # Normalize to -3 dB
            target_dB = -3
            current_dB = 20 * np.log10(np.max(np.abs(y)) + 1e-8)
            gain = 10 ** ((target_dB - current_dB) / 20)
            
            return y * gain
            
        except Exception as e:
            logger.error(f"Error normalizing audio: {str(e)}")
            return y
    
    async def cleanup_audio_files(self, file_paths: List[str]) -> None:
        """
        Clean up temporary audio files.
        
        Args:
            file_paths: List of file paths to clean up
        """
        try:
            for file_path in file_paths:
                if os.path.exists(file_path):
                    os.remove(file_path)
                    logger.info(f"Cleaned up audio file: {file_path}")
                    
        except Exception as e:
            logger.error(f"Error cleaning up audio files: {str(e)}")
    
    async def convert_audio_format(
        self, 
        audio_file_path: str, 
        target_format: str = "wav"
    ) -> Optional[str]:
        """
        Convert audio to a different format.
        
        Args:
            audio_file_path: Path to the audio file to convert
            target_format: Target audio format
            
        Returns:
            Optional[str]: Path to the converted audio file, or None if conversion failed
        """
        try:
            # Generate a unique filename for the converted audio
            file_name = os.path.splitext(os.path.basename(audio_file_path))[0]
            unique_filename = f"{file_name}_{uuid.uuid4()}.{target_format}"
            converted_file_path = f"data/audio_processed/{unique_filename}"
            
            # Load the audio file with pydub
            audio = AudioSegment.from_file(audio_file_path)
            
            # Export to the target format
            audio.export(converted_file_path, format=target_format)
            
            logger.info(f"Audio converted successfully: {converted_file_path}")
            return converted_file_path
            
        except Exception as e:
            logger.error(f"Error converting audio: {str(e)}")
            return None
    
    async def extract_audio_features(self, audio_file_path: str) -> Optional[dict]:
        """
        Extract audio features for analysis.
        
        Args:
            audio_file_path: Path to the audio file
            
        Returns:
            Optional[dict]: Extracted audio features, or None if extraction failed
        """
        try:
            # Load the audio file
            y, sr = librosa.load(audio_file_path, sr=None)
            
            # Extract features
            
            # 1. Mel-frequency cepstral coefficients (MFCCs)
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            mfcc_mean = np.mean(mfccs, axis=1)
            
            # 2. Spectral centroid
            spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
            spectral_centroid_mean = np.mean(spectral_centroid)
            
            # 3. Zero crossing rate
            zero_crossing_rate = librosa.feature.zero_crossing_rate(y)
            zero_crossing_rate_mean = np.mean(zero_crossing_rate)
            
            # 4. Tempo
            onset_env = librosa.onset.onset_strength(y=y, sr=sr)
            tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sr)[0]
            
            # Return features
            features = {
                "mfcc_mean": mfcc_mean.tolist(),
                "spectral_centroid_mean": float(spectral_centroid_mean),
                "zero_crossing_rate_mean": float(zero_crossing_rate_mean),
                "tempo": float(tempo),
                "duration": float(len(y) / sr)
            }
            
            return features
            
        except Exception as e:
            logger.error(f"Error extracting audio features: {str(e)}")
            return None
