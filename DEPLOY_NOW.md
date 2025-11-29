# 🚀 Deploy to Vercel NOW - Step by Step

## Method 1: Using the Deployment Script (Easiest)

```bash
# From FactZAura directory
./deploy-vercel.sh
```

Follow the prompts and you're done! ✅

---

## Method 2: Manual Deployment (Recommended for First Time)

### Step 1: Navigate to Frontend Directory

```bash
cd FactZAura/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Test Build Locally

```bash
npm run build
```

If this fails, fix any errors before proceeding.

### Step 4: Deploy to Vercel

```bash
npx vercel --prod
```

### Step 5: Follow Vercel Prompts

You'll be asked:

**1. "Set up and deploy?"**
```
? Set up and deploy "~/path/to/FactZAura/frontend"? [Y/n]
```
→ Press **Y** and Enter

**2. "Which scope?"**
```
? Which scope do you want to deploy to?
```
→ Select your Vercel account (use arrow keys)

**3. "Link to existing project?"**
```
? Link to existing project? [y/N]
```
→ Press **N** (for new project)

**4. "What's your project's name?"**
```
? What's your project's name? (frontend)
```
→ Type: **factzaura** and press Enter

**5. "In which directory is your code located?"**
```
? In which directory is your code located? ./
```
→ Press Enter (accept default)

**6. Vercel will detect Vite and ask to override settings**
```
Auto-detected Project Settings (Vite):
- Build Command: vite build
- Output Directory: dist
- Development Command: vite --port $PORT
? Want to override the settings? [y/N]
```
→ Press **N** (settings are correct)

### Step 6: Wait for Deployment

Vercel will:
- ✅ Upload files
- ✅ Build your project
- ✅ Deploy to production
- ✅ Give you a URL

### Step 7: Get Your URL

You'll see something like:
```
✅  Production: https://factzaura.vercel.app [copied to clipboard]
```

---

## Method 3: Using Vercel Dashboard (No CLI)

### Step 1: Build Locally

```bash
cd FactZAura/frontend
npm install
npm run build
```

### Step 2: Go to Vercel Dashboard

1. Visit: https://vercel.com/new
2. Click "Import Project"

### Step 3: Import from Git

**Option A: Import from GitHub**
1. Click "Import Git Repository"
2. Select your FactZAura repository
3. Click "Import"

**Option B: Import from Local**
1. Click "Deploy from CLI"
2. Follow CLI instructions

### Step 4: Configure Project

- **Project Name**: factzaura
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 5: Deploy

Click "Deploy" and wait ~2 minutes

---

## 🔍 Verify Deployment

After deployment, test these URLs (replace with your actual URL):

```bash
# Home page
https://factzaura.vercel.app/

# Analyze page
https://factzaura.vercel.app/analyze

# Activity page
https://factzaura.vercel.app/activity

# Auth page
https://factzaura.vercel.app/auth

# Incident page (with ID)
https://factzaura.vercel.app/incident/1
```

**Try refreshing each page** - should NOT get 404 errors thanks to `vercel.json`

---

## ✅ Success Checklist

- [ ] Deployment completed without errors
- [ ] Got a live URL
- [ ] Home page loads
- [ ] Can navigate between pages
- [ ] No 404 errors on refresh
- [ ] All routes accessible

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Error**: `npm ERR!` or build errors

**Solution**:
```bash
cd FactZAura/frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: 404 Errors on Routes

**Solution**: Already fixed with `vercel.json`

If still occurring:
```bash
# Verify file exists
cat frontend/vercel.json

# Redeploy
npx vercel --prod --force
```

### Issue: "Command not found: vercel"

**Solution**: Use npx
```bash
npx vercel --prod
```

### Issue: Login Required

**Solution**:
```bash
npx vercel login
```
Enter your email and click the verification link

---

## 📊 Check Deployment Status

### In Terminal:
```bash
npx vercel ls
```

### In Browser:
1. Go to https://vercel.com/dashboard
2. Click on your project
3. View deployment status

---

## 🎯 What Happens During Deployment

1. **Upload**: Files sent to Vercel
2. **Install**: `npm install` runs
3. **Build**: `npm run build` creates production bundle
4. **Deploy**: Files deployed to CDN
5. **Live**: Your app is accessible worldwide

**Time**: Usually 2-3 minutes

---

## 🔄 Redeploy (After Changes)

### Automatic (if connected to Git):
```bash
git add .
git commit -m "Update"
git push
```
Vercel auto-deploys on push

### Manual:
```bash
cd FactZAura/frontend
npx vercel --prod
```

---

## 🌐 Custom Domain (Optional)

After deployment, add a custom domain:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain
5. Update DNS records as instructed

---

## 📱 Mobile Testing

After deployment, test on:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad
- [ ] Different screen sizes

---

## 🚀 Next Steps

1. **Deploy Backend**:
   - See `QUICK_DEPLOY.md` for backend deployment
   - Railway or Render recommended

2. **Update API URL**:
   - Edit `frontend/src/lib/api.ts`
   - Change `API_BASE_URL` to your backend URL
   - Redeploy

3. **Add Analytics** (Optional):
   - Enable Vercel Analytics in dashboard
   - Add Google Analytics

4. **Set up Monitoring**:
   - Enable Vercel Speed Insights
   - Set up error tracking (Sentry)

---

## 💡 Pro Tips

1. **Preview Deployments**: Every git push creates a preview URL
2. **Environment Variables**: Add in Vercel Dashboard → Settings
3. **Rollback**: Can rollback to any previous deployment
4. **Logs**: Check deployment logs for debugging
5. **Cache**: Vercel automatically caches static assets

---

## 🆘 Need Help?

1. Check Vercel logs in dashboard
2. Review browser console (F12)
3. Check `VERCEL_DEPLOYMENT_FIX.md`
4. Vercel Discord: https://vercel.com/discord

---

## 📝 Deployment Checklist

Before deploying:
- [x] `vercel.json` exists ✅
- [x] `_redirects` exists ✅
- [ ] Build works locally
- [ ] No TypeScript errors
- [ ] All dependencies installed

After deploying:
- [ ] Test all routes
- [ ] Check mobile responsiveness
- [ ] Verify no console errors
- [ ] Test on different browsers

---

**Ready to deploy? Run:**

```bash
cd FactZAura/frontend
npx vercel --prod
```

**Or use the script:**

```bash
./deploy-vercel.sh
```

🎉 **Good luck with your deployment!**
