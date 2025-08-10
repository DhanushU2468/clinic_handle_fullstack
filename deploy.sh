#!/bin/bash

echo "🚀 Fullstack Application Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/yourrepo.git"
    exit 1
fi

echo "✅ Git repository configured"

# Build both applications
echo "🔨 Building applications..."

echo "Building backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi
cd ..

echo "Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "✅ Both applications built successfully"

# Commit changes
echo "📝 Committing changes..."
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway/Render/Heroku"
echo "2. Deploy frontend to Vercel"
echo "3. Set up database (PlanetScale recommended)"
echo "4. Configure environment variables"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" 