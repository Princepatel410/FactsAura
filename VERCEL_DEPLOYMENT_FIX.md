# Vercel Deployment Fix Guide

## Problem: 404 NOT_FOUND Error

When deploying a React SPA (Single Page Application) with client-side routing to Vercel, you may encounter 404 errors when navigating to routes directly or refreshing the page.

## Solution Applied

### 1. Created `vercel.json` Configuration

Location: `frontend/vercel.json`

This file tells Vercel to rewrite all routes to `index.html`, allowing React Router to handle the routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Created `_redirects` File

Location: `frontend/public/_redirects`

This is a backup solution that works with Netlify and other platforms:

```
/*    /index.html   200
```

## Deployment Steps

### Step 1: Commit Changes

```bash
cd FactZAura
git add frontend/vercel.json frontend/public/_redirects
git commit -m "Fix: Add Vercel routing configuration"
git push
```

### Step 2: Redeploy on Vercel

Option A: **Automatic** (if connected to Git)
- Vercel will automatically redeploy when you push

Option B: **Manual**
```bash
cd frontend
vercel --prod
```

### Step 3: Verify Deployment

Test these URLs (replace with your domain):
- ✅ `https://factsaura.vercel.app/` (Home)
- ✅ `https://factsaura.vercel.app/analyze` (Analyze)
- ✅ `https://factsaura.vercel.app/activity` (Activity)
- ✅ `https://factsaura.vercel.app/auth` (Auth)
- ✅ `https://factsaura.vercel.app/incident/1` (Incident)

## Additional Configuration

### Environment Variables

If your frontend needs to connect to a backend API, add environment variables in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_API_URL` = `https://your-backend-api.com`

### Update API Base URL

If you have a deployed backend, update the API configuration:

**File**: `frontend/src/lib/api.ts`

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

## Common Issues & Solutions

### Issue 1: Still Getting 404

**Solution**: Clear Vercel cache and redeploy
```bash
vercel --prod --force
```

### Issue 2: Assets Not Loading

**Solution**: Check that `vercel.json` is in the correct location (`frontend/vercel.json`)

### Issue 3: API Calls Failing

**Possible Causes**:
1. CORS not configured on backend
2. Wrong API URL
3. Backend not deployed

**Solution**: 
- Check browser console for errors
- Verify backend CORS settings
- Test API endpoint directly

### Issue 4: Build Fails

**Check**:
- All dependencies installed: `npm install`
- No TypeScript errors: `npm run build`
- Node version compatibility

## Backend Deployment

If you haven't deployed the backend yet, here are quick options:

### Option 1: Railway
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select backend folder
4. Add PostgreSQL database
5. Set environment variables
6. Deploy

### Option 2: Render
1. Go to render.com
2. New → Web Service
3. Connect repository
4. Build command: `pip install -r requirements.txt && prisma generate`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add PostgreSQL database
7. Deploy

### Option 3: Heroku
```bash
cd backend
heroku create factzaura-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## Testing Checklist

After deployment, test:

- [ ] Home page loads
- [ ] Navigation works
- [ ] Direct URL access works (e.g., `/analyze`)
- [ ] Page refresh doesn't cause 404
- [ ] All routes accessible
- [ ] API calls work (if backend deployed)
- [ ] Images and assets load
- [ ] Responsive design works
- [ ] No console errors

## Vercel Project Settings

Recommended settings in Vercel dashboard:

### Build & Development Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Root Directory
- Set to `frontend` if deploying from monorepo

## Performance Optimization

After fixing the 404 issue, consider:

1. **Enable Vercel Analytics**
   - Go to Analytics tab in Vercel dashboard

2. **Add Custom Domain**
   - Go to Settings → Domains

3. **Enable Edge Functions** (if needed)
   - For server-side rendering or API routes

4. **Configure Caching**
   - Already configured in `vercel.json` for assets

## Monitoring

### Check Deployment Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click on latest deployment
4. View "Building" and "Runtime" logs

### Check Function Logs
- Go to Functions tab to see any serverless function logs

## Rollback (If Needed)

If something goes wrong:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments
4. Find previous working deployment
5. Click "..." → "Promote to Production"

## Support

If issues persist:

1. Check Vercel Status: https://www.vercel-status.com/
2. Vercel Documentation: https://vercel.com/docs
3. Check browser console for errors
4. Review Vercel deployment logs

---

## Quick Fix Summary

**Files Added**:
- ✅ `frontend/vercel.json` - Routing configuration
- ✅ `frontend/public/_redirects` - Backup redirect rules

**Action Required**:
1. Commit and push changes
2. Wait for automatic redeploy (or trigger manual deploy)
3. Test all routes
4. Verify no 404 errors

**Expected Result**: All routes should work correctly, including direct URL access and page refreshes.
