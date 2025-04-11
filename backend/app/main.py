"""
Main application entry point for the Quranic Quest backend API.
This file sets up the FastAPI application, includes all routers,
and configures middleware, exception handlers, and startup/shutdown events.
"""

import os
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from api.routes import users, auth, lessons, pronunciation, learning_paths

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Quranic Quest API",
    description="Backend API for the Quranic Quest mobile application",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(pronunciation.router, prefix="/api/pronunciation", tags=["Pronunciation"])
app.include_router(learning_paths.router, prefix="/api/learning-paths", tags=["Learning Paths"])

# Serve static files (if needed)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint to check if the API is running."""
    return {"message": "Welcome to the Quranic Quest API", "status": "online"}

# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy"}

# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions and return appropriate responses."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    """Run tasks when the application starts."""
    logger.info("Starting up Quranic Quest API")
    # Add any startup tasks here (e.g., database connection)

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Run tasks when the application shuts down."""
    logger.info("Shutting down Quranic Quest API")
    # Add any cleanup tasks here

if __name__ == "__main__":
    # Run the application with uvicorn when executed directly
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
