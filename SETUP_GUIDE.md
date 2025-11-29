# FactZAura Setup Guide

## Quick Start (After PostgreSQL Setup)

### 1. Backend Setup

```bash
cd 1_FactZAura/backend

# Update .env with your PostgreSQL connection
# DATABASE_URL="postgresql://user:password@localhost:5432/factzaura"

# Generate Prisma client
prisma generate

# Run migrations
prisma migrate dev

# Optional: Seed database with demo data
python3 seed_database.py

# Start backend server
python3 -m uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd 1_FactZAura/frontend

# Install dependencies (if not already done)
npm install

# Start dev server
npm run dev
```

### 3. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## PostgreSQL Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb factzaura

# Update .env
DATABASE_URL="postgresql://localhost:5432/factzaura"
```

### Option 2: Docker PostgreSQL

```bash
# Run PostgreSQL in Docker
docker run --name factzaura-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=factzaura \
  -p 5432:5432 \
  -d postgres:15

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/factzaura"
```

### Option 3: Keep SQLite (Simpler for Demo)

```bash
# Just update the path in .env
DATABASE_URL="file:./prisma/dev.db"

# Make sure the file exists
touch prisma/dev.db

# Generate and migrate
prisma generate
prisma migrate dev
```

## Troubleshooting

### Backend won't start

1. **Check Python version**: `python3 --version` (need 3.9+)
2. **Install dependencies**: `pip install -r requirements.txt`
3. **Check database connection**: Test DATABASE_URL
4. **Regenerate Prisma**: `prisma generate`

### Frontend errors

1. **Check Node version**: `node --version` (need 18+)
2. **Reinstall dependencies**: `rm -rf node_modules && npm install`
3. **Check backend is running**: Visit http://localhost:8000

### Database errors

1. **Reset database**: `prisma migrate reset`
2. **Check permissions**: Ensure user has access to database
3. **Check connection string**: Verify DATABASE_URL format

## Features to Test

### ✅ Tasks 1-19 (Core Features)
- Crisis Monitor Feed
- Phylogenetic Tree Visualization
- Agent Activity Monitor
- Submission Portal
- Real-time WebSocket updates

### ✅ Tasks 20-23 (Demo Controls)
- Speed adjustment (0.5x - 3x)
- Pause/Resume simulation
- Reset to initial state
- Progress tracking

### ✅ Tasks 24-30 (Community Features)
- Vote on post credibility
- View credibility scores
- Flag low-credibility posts (<20%)
- Add comments to posts
- View comment threads
- Real-time vote/comment updates

## API Endpoints Reference

### Incidents
- `GET /api/incidents` - List all incidents
- `GET /api/incidents/{id}` - Get incident details
- `POST /api/incidents` - Create incident
- `PATCH /api/incidents/{id}` - Update incident

### Posts
- `GET /api/incidents/{id}/posts` - Get posts for incident
- `GET /api/posts/{id}` - Get post details
- `POST /api/posts` - Create post
- `GET /api/posts/{id}/diff` - Get mutation diff
- `POST /api/posts/{id}/vote` - Vote on credibility
- `GET /api/posts/{id}/comments` - Get comments
- `POST /api/posts/{id}/comments` - Add comment

### Analysis
- `POST /api/analyze` - Analyze content for misinformation

### Demo Controls
- `GET /api/demo/state` - Get demo state
- `PATCH /api/demo/speed` - Update speed
- `POST /api/demo/pause` - Pause simulation
- `POST /api/demo/resume` - Resume simulation
- `POST /api/demo/reset` - Reset to initial state

### Agents
- `GET /api/agents/logs` - Get agent activity logs

### WebSocket
- `WS /ws/{incident_id}` - Real-time updates for incident

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://localhost:5432/factzaura"
GEMINI_API_KEY="your_api_key_here"  # Optional for AI analysis
```

### Frontend (.env)
```env
VITE_API_URL="http://localhost:8000"  # Optional, defaults to localhost:8000
```

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **API Docs**: Visit http://localhost:8000/docs for interactive API docs
3. **Database GUI**: Use Prisma Studio: `prisma studio`
4. **Logs**: Check terminal for backend logs and browser console for frontend

## Production Deployment

### Backend
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
# Build for production
npm run build

# Serve with nginx or any static server
npx serve -s dist
```

## Support

If you encounter issues:
1. Check this guide first
2. Review error messages in terminal/console
3. Check FRONTEND_VERIFICATION.md for component status
4. Check INTEGRATION_SUMMARY.md for feature details
