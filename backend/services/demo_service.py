import json
from typing import Dict, Any
from prisma import Prisma
from pathlib import Path

class DemoService:
    def __init__(self):
        self.db = Prisma()
        self.simulation_data_path = Path(__file__).parent.parent / "data" / "simulation_data.json"

    async def connect(self):
        if not self.db.is_connected():
            await self.db.connect()

    async def get_state(self) -> Dict[str, Any]:
        """Get current demo state"""
        await self.connect()
        
        # Get or create demo state
        state = await self.db.demostate.find_first()
        
        if not state:
            # Create initial state
            state = await self.db.demostate.create(
                data={
                    "speed": 1.0,
                    "isPaused": False,
                    "currentPosition": 0
                }
            )
        
        # Calculate progress based on posts created vs total posts in simulation
        total_posts = await self._get_total_simulation_posts()
        current_posts = await self.db.post.count()
        progress = min(100, (current_posts / total_posts * 100) if total_posts > 0 else 0)
        
        return {
            "speed": state.speed,
            "isPaused": state.isPaused,
            "progress": round(progress, 2)
        }

    async def update_speed(self, speed: float):
        """Update demo playback speed"""
        await self.connect()
        
        state = await self.db.demostate.find_first()
        
        if state:
            await self.db.demostate.update(
                where={"id": state.id},
                data={"speed": speed}
            )
        else:
            await self.db.demostate.create(
                data={
                    "speed": speed,
                    "isPaused": False,
                    "currentPosition": 0
                }
            )

    async def pause(self):
        """Pause the demo simulation"""
        await self.connect()
        
        state = await self.db.demostate.find_first()
        
        if state:
            await self.db.demostate.update(
                where={"id": state.id},
                data={"isPaused": True}
            )
        else:
            await self.db.demostate.create(
                data={
                    "speed": 1.0,
                    "isPaused": True,
                    "currentPosition": 0
                }
            )

    async def resume(self):
        """Resume the demo simulation"""
        await self.connect()
        
        state = await self.db.demostate.find_first()
        
        if state:
            await self.db.demostate.update(
                where={"id": state.id},
                data={"isPaused": False}
            )
        else:
            await self.db.demostate.create(
                data={
                    "speed": 1.0,
                    "isPaused": False,
                    "currentPosition": 0
                }
            )

    async def reset(self):
        """Reset demo - flush DB and re-seed with simulation data"""
        await self.connect()
        
        # Delete all data
        await self.db.comment.delete_many()
        await self.db.post.delete_many()
        await self.db.incident.delete_many()
        await self.db.demostate.delete_many()
        
        # Re-seed with simulation data
        await self._seed_simulation_data()
        
        # Create fresh demo state
        await self.db.demostate.create(
            data={
                "speed": 1.0,
                "isPaused": False,
                "currentPosition": 0
            }
        )

    async def _seed_simulation_data(self):
        """Seed database with simulation data"""
        if not self.simulation_data_path.exists():
            print(f"Warning: Simulation data file not found at {self.simulation_data_path}")
            return
        
        with open(self.simulation_data_path, 'r') as f:
            data = json.load(f)
        
        # Create incidents
        for incident_data in data.get("incidents", []):
            await self.db.incident.create(
                data={
                    "id": incident_data["id"],
                    "title": incident_data["title"],
                    "severity": incident_data["severity"],
                    "location": incident_data["location"],
                    "status": incident_data["status"]
                }
            )
        
        print(f"Seeded {len(data.get('incidents', []))} incidents")

    async def _get_total_simulation_posts(self) -> int:
        """Get total number of posts in simulation data"""
        if not self.simulation_data_path.exists():
            return 0
        
        try:
            with open(self.simulation_data_path, 'r') as f:
                data = json.load(f)
            return len(data.get("posts", []))
        except Exception:
            return 0
