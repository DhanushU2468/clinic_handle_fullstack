# Quick Deployment Guide

## 🚀 Fast Track Deployment (15 minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)

### Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

### Step 2: Deploy Backend (Railway - 5 minutes)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory to `backend`
6. Add environment variables:
   ```
   DB_HOST=your-db-host
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   DB_DATABASE=your-db-name
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   ```
7. Deploy! Get your backend URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend (Vercel - 5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Set root directory to `frontend`
6. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
7. Deploy! Get your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 4: Update Backend CORS

1. Go back to Railway dashboard
2. Add environment variable:
   ```
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```
3. Redeploy backend

### Step 5: Test Your App

1. Visit your frontend URL
2. Test the application
3. Check backend API at `https://your-backend-url.railway.app/api`

## 🎉 Done!

Your fullstack application is now live!

## Need Database?

For a quick database setup:
1. Go to [planetscale.com](https://planetscale.com)
2. Create free database
3. Get connection details
4. Update Railway environment variables

## Troubleshooting

- **CORS errors**: Check CORS_ORIGINS in backend
- **Build fails**: Check deployment logs
- **API not working**: Verify environment variables

## Next Steps

- Set up custom domain
- Add monitoring
- Configure CI/CD
- Set up backups

See `DEPLOYMENT_GUIDE.md` for detailed instructions. 