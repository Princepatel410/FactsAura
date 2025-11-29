# Quick Deployment Guide

## 🚀 Deploy in 5 Minutes

### Frontend (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Navigate to frontend
cd FactZAura/frontend

# 3. Deploy
vercel --prod
```

**Or use Vercel Dashboard**:
1. Go to vercel.com
2. Import Git Repository
3. Select `FactZAura` repo
4. Set Root Directory to `frontend`
5. Click Deploy

### Backend (Railway)

1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select `FactZAura` repository
4. Set Root Directory to `backend`
5. Add PostgreSQL database
6. Add environment variable: `DATABASE_URL` (auto-filled by Railway)
7. Deploy

## 📋 Pre-Deployment Checklist

### Frontend
- [x] `vercel.json` created ✅
- [x] `_redirects` created ✅
- [ ] Update API URL if backend deployed
- [ ] Test build locally: `npm run build`

### Backend
- [ ] Update CORS origins for production domain
- [ ] Set up production database
- [ ] Run migrations: `prisma migrate deploy`
- [ ] Seed database: `python seed_database.py`

## 🔧 Configuration Files

### `vercel.json` (Frontend)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `.env` (Backend)
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
CORS_ORIGINS="https://your-frontend.vercel.app"
```

## 🌐 Update API URL

**File**: `frontend/src/lib/api.ts`

```typescript
// Change this after backend deployment
const API_BASE_URL = 'https://your-backend.railway.app';
```

## ✅ Post-Deployment Tests

Test these URLs:
- [ ] Homepage: `/`
- [ ] Analyze: `/analyze`
- [ ] Activity: `/activity`
- [ ] Auth: `/auth`
- [ ] Incident: `/incident/1`

## 🐛 Troubleshooting

### 404 Error
- ✅ Fixed with `vercel.json`
- Redeploy if still occurring

### API Not Working
- Check CORS settings in backend
- Verify API URL in frontend
- Check backend logs

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 📱 Quick Commands

```bash
# Frontend
npm run dev          # Development
npm run build        # Production build
npm run preview      # Preview build

# Backend
uvicorn main:app --reload    # Development
prisma generate              # Generate client
prisma migrate deploy        # Run migrations
python seed_database.py      # Seed data
```

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

---

**Need Help?** Check `VERCEL_DEPLOYMENT_FIX.md` for detailed troubleshooting.
