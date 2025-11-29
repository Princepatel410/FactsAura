# FactZAura - AI-Powered Misinformation Detection Platform

![FactZAura Logo](frontend/public/logo%202.png)

## Overview

FactZAura is a cutting-edge platform that leverages AI to detect, track, and analyze misinformation across digital platforms. Using phylogenetic tree visualization and advanced mutation tracking, FactZAura helps users understand how false information spreads and evolves.

## Features

### 🔍 Content Analysis
- Real-time misinformation detection
- AI-powered credibility scoring
- Cross-reference with verified sources
- Instant risk assessment

### 🌳 Phylogenetic Tree Visualization
- Track how misinformation mutates over time
- Visual representation of content evolution
- Interactive node exploration
- Mutation severity indicators

### 🤖 Autonomous AI Agents
- Scanner Agent: Monitors social media feeds
- Verifier Agent: Analyzes content patterns
- Publisher Agent: Publishes truth scorecards
- Real-time activity logging

### 👥 Community Features
- Voting system for content credibility
- Comment and discussion threads
- Collaborative fact-checking
- Community-driven verification

### 📊 Incident Tracking
- Monitor active misinformation incidents
- Severity classification (Critical/Warning)
- Real-time statistics dashboard
- Detailed incident analysis

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **React Flow** for tree visualization
- **React Router** for navigation

### Backend
- **FastAPI** (Python)
- **Prisma** ORM
- **SQLite** database
- **WebSocket** support
- **CORS** enabled

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.9+
- pip

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Generate Prisma client
prisma generate

# Run database migrations
prisma db push

# Seed the database
python seed_database.py

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
1_FactZAura/
├── backend/
│   ├── app/              # Application utilities
│   ├── data/             # Simulation data
│   ├── models/           # Data models
│   ├── prisma/           # Database schema
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── tests/            # Test suite
│   ├── main.py           # FastAPI application
│   └── seed_database.py  # Database seeding
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── api/          # API clients
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript types
│   └── index.html
├── plan/                 # Project specifications
└── SETUP_GUIDE.md       # Detailed setup instructions
```

## Key Pages

### Home Page
- Dashboard with active incidents
- Real-time statistics
- Quick access to analysis tools
- Login/Register access

### Analyze Page
- Content submission form
- AI-powered analysis
- Truth scorecard results
- Related content matching

### Incident Page
- Phylogenetic tree visualization
- Mutation tracking
- Interactive node exploration
- Community voting and comments

### Activity Page
- Live agent activity feed
- Real-time monitoring
- Agent status indicators

### Auth Page
- Beautiful login/register interface
- Diagonal animated transitions
- Secure authentication

## API Endpoints

### Incidents
- `GET /api/incidents` - List all incidents
- `GET /api/incidents/{id}` - Get incident details
- `GET /api/incidents/{id}/posts` - Get incident posts

### Posts
- `GET /api/posts/{id}` - Get post details
- `GET /api/posts/{id}/diff` - Get mutation diff
- `POST /api/posts/{id}/vote` - Vote on credibility
- `GET /api/posts/{id}/comments` - Get comments
- `POST /api/posts/{id}/comments` - Add comment

### Analysis
- `POST /api/analyze` - Analyze content

### Agent Activity
- `GET /api/agent-activity` - Get agent logs

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="file:./dev.db"
```

### Frontend
No environment variables required for development.

## Production Deployment

### Backend
1. Set up production database (PostgreSQL recommended)
2. Update DATABASE_URL in .env
3. Run migrations: `prisma migrate deploy`
4. Use production ASGI server (e.g., Gunicorn with Uvicorn workers)

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)
3. Update API base URL in production

## Features in Detail

### Mutation Tracking
- **Verified** (<10% mutation): Green indicator
- **Modified** (10-40% mutation): Yellow indicator
- **Fabricated** (>40% mutation): Red indicator

### Community Credibility
- Voting system for each post
- Credibility percentage calculation
- Low credibility flagging (<20%)
- Community discussion threads

### Real-time Updates
- Polling-based updates (React Query)
- Auto-refresh every 3 seconds
- Optimistic UI updates

## Contributing

This is a demonstration project showcasing AI-powered misinformation detection capabilities.

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please refer to the SETUP_GUIDE.md or create an issue in the repository.

---

**Built with ❤️ to fight misinformation and protect digital truth**
