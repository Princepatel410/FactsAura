"""
Database seeding script for FactZAura
Seeds the database with initial demo data
"""
import asyncio
import json
from pathlib import Path
from prisma import Prisma

async def seed_database():
    """Seed database with demo data"""
    db = Prisma()
    await db.connect()
    
    print("🌱 Seeding database...")
    
    # Load simulation data
    data_file = Path("data/simulation_data.json")
    if not data_file.exists():
        print("❌ simulation_data.json not found!")
        await db.disconnect()
        return
    
    with open(data_file) as f:
        data = json.load(f)
    
    # Create incidents
    print(f"Creating {len(data['incidents'])} incidents...")
    incidents = []
    for incident_data in data["incidents"]:
        incident = await db.incident.create(
            data={
                "id": incident_data["id"],
                "title": incident_data["title"],
                "severity": incident_data["severity"],
                "location": incident_data["location"],
                "status": incident_data["status"]
            }
        )
        incidents.append(incident)
        print(f"✅ Created incident: {incident.title}")
    
    # Create posts (use first incident for all posts)
    print(f"Creating {len(data['posts'])} posts...")
    for post_data in data["posts"]:
        post = await db.post.create(
            data={
                "id": post_data["id"],
                "content": post_data["content"],
                "author": post_data["author"],
                "incidentId": post_data.get("incidentId", incidents[0].id),
                "parentId": post_data.get("parentId"),
                "mutationScore": post_data.get("mutationScore", 0.0),
                "mutationType": post_data.get("mutationType"),
                "credibleVotes": 0,
                "totalVotes": 0
            }
        )
        print(f"  ✅ Created post by {post.author}")
    
    # Create demo state
    print("Creating demo state...")
    demo_state = await db.demostate.create(
        data={
            "speed": 1.0,
            "isPaused": False,
            "currentPosition": 0
        }
    )
    print(f"✅ Created demo state")
    
    await db.disconnect()
    print("\n🎉 Database seeded successfully!")
    print(f"   - {len(incidents)} incidents")
    print(f"   - {len(data['posts'])} posts")
    print(f"   - 1 demo state")

async def reset_database():
    """Reset database (delete all data)"""
    db = Prisma()
    await db.connect()
    
    print("🗑️  Resetting database...")
    
    # Delete in correct order (respecting foreign keys)
    await db.comment.delete_many()
    print("  ✅ Deleted comments")
    
    await db.post.delete_many()
    print("  ✅ Deleted posts")
    
    await db.incident.delete_many()
    print("  ✅ Deleted incidents")
    
    await db.demostate.delete_many()
    print("  ✅ Deleted demo states")
    
    await db.disconnect()
    print("✅ Database reset complete!")

async def main():
    """Main function"""
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "reset":
        await reset_database()
    else:
        await seed_database()

if __name__ == "__main__":
    asyncio.run(main())
