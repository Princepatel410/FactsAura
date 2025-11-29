#!/bin/bash

# FactZAura Vercel Deployment Script
# This script will deploy your frontend to Vercel

echo "🚀 FactZAura Vercel Deployment"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found"
    echo "Please run this script from the FactZAura root directory"
    exit 1
fi

# Navigate to frontend
cd frontend

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔨 Step 2: Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "🌐 Step 3: Deploying to Vercel..."
echo ""
echo "You will be prompted to:"
echo "  1. Login to Vercel (if not already logged in)"
echo "  2. Set up and link this project"
echo "  3. Confirm deployment settings"
echo ""
echo "Press Enter to continue..."
read

# Deploy to Vercel
npx vercel --prod

echo ""
echo "================================"
echo "✅ Deployment Complete!"
echo ""
echo "Your app should now be live at the URL shown above."
echo ""
echo "📝 Next Steps:"
echo "  1. Test all routes on your deployed URL"
echo "  2. If you see 404 errors, the vercel.json fix should handle it"
echo "  3. Deploy your backend (see QUICK_DEPLOY.md)"
echo "  4. Update API URL in src/lib/api.ts if needed"
echo ""
