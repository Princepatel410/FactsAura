from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.demo_service import DemoService

router = APIRouter(prefix="/api/demo", tags=["demo"])
service = DemoService()

class SpeedUpdate(BaseModel):
    speed: float

@router.on_event("startup")
async def startup():
    await service.connect()

@router.get("/state")
async def get_demo_state():
    """Get current demo state"""
    try:
        state = await service.get_state()
        return state
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/speed")
async def update_speed(data: SpeedUpdate):
    """Update demo playback speed"""
    try:
        if data.speed < 0.5 or data.speed > 5.0:
            raise HTTPException(status_code=400, detail="Speed must be between 0.5 and 5.0")
        
        await service.update_speed(data.speed)
        return {"message": "Speed updated successfully", "speed": data.speed}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pause")
async def pause_demo():
    """Pause the demo simulation"""
    try:
        await service.pause()
        return {"message": "Demo paused"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/resume")
async def resume_demo():
    """Resume the demo simulation"""
    try:
        await service.resume()
        return {"message": "Demo resumed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reset")
async def reset_demo():
    """Reset demo - flush DB and re-seed with simulation data"""
    try:
        await service.reset()
        return {"message": "Demo reset successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
