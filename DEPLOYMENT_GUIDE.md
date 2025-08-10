# Fullstack Application Deployment Guide

This guide will help you deploy your medical management system (fdesk) to production.

## Architecture Overview

- **Frontend**: Next.js 15.4.6 (Deploy to Vercel)
- **Backend**: NestJS (Deploy to Railway/Render/Heroku)
- **Database**: MySQL (Use cloud database service)

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: For frontend deployment
3. **Railway/Render/Heroku Account**: For backend deployment
4. **Database Service**: PlanetScale, Railway, or similar for MySQL

## Step 1: Database Setup

### Option A: PlanetScale (Recommended)
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Note down: `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`

### Option B: Railway Database
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add MySQL database service
4. Get connection details from the service

## Step 2: Backend Deployment

### Option A: Railway (Recommended)

1. **Sign up/Login to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

3. **Configure Environment Variables**
   Add these variables in Railway dashboard:
   ```
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   DB_DATABASE=your-db-name
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   PORT=3001
   ```

4. **Deploy**
   - Railway will automatically detect it's a Node.js app
   - It will run `npm install` and `npm run build`
   - The app will be available at: `https://your-app-name.railway.app`

### Option B: Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set root directory to `backend`

3. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Node

4. **Add Environment Variables**
   Same as Railway above

5. **Deploy**
   - Render will build and deploy your app
   - Available at: `https://your-app-name.onrender.com`

### Option C: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Add Environment Variables**
   ```bash
   heroku config:set DB_HOST=your-db-host
   heroku config:set DB_USERNAME=your-db-username
   heroku config:set DB_PASSWORD=your-db-password
   heroku config:set DB_DATABASE=your-db-name
   heroku config:set JWT_SECRET=your-super-secret-jwt-key-here
   heroku config:set JWT_EXPIRES_IN=24h
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## Step 3: Frontend Deployment (Vercel)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`

3. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

5. **Deploy**
   - Vercel will automatically deploy your Next.js app
   - Available at: `https://your-app-name.vercel.app`

## Step 4: Update Frontend API Configuration

After deploying the backend, you need to update the frontend to use the production API URL.

1. **Create API Configuration**
   Create `frontend/src/lib/api.ts`:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
   
   export const api = {
     baseURL: API_BASE_URL,
     endpoints: {
       auth: `${API_BASE_URL}/auth`,
       users: `${API_BASE_URL}/users`,
       doctors: `${API_BASE_URL}/doctors`,
       patients: `${API_BASE_URL}/patients`,
       appointments: `${API_BASE_URL}/appointments`,
       queue: `${API_BASE_URL}/queue`,
     }
   };
   ```

2. **Update CORS in Backend**
   Add your frontend URL to CORS origins:
   ```
   CORS_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
   ```

## Step 5: Database Migration

1. **Access your deployed backend**
   - Go to: `https://your-backend-url.com/api`
   - This will show Swagger documentation

2. **Test API endpoints**
   - Try creating a user
   - Test authentication
   - Verify database connections

## Step 6: Final Configuration

1. **Update Frontend Environment**
   - Go to Vercel dashboard
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Redeploy the frontend

2. **Test the Application**
   - Visit your frontend URL
   - Test login functionality
   - Verify all features work

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure backend CORS includes your frontend URL
   - Check environment variables are set correctly

2. **Database Connection Issues**
   - Verify database credentials
   - Check if database is accessible from your deployment platform

3. **Build Failures**
   - Check build logs in deployment platform
   - Ensure all dependencies are in package.json

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names

## Security Considerations

1. **JWT Secret**: Use a strong, random secret
2. **Database**: Use strong passwords
3. **HTTPS**: All production URLs should use HTTPS
4. **Environment Variables**: Never commit secrets to Git

## Monitoring

1. **Backend Logs**: Check deployment platform logs
2. **Frontend Analytics**: Enable Vercel analytics
3. **Database Monitoring**: Use your database provider's monitoring tools

## Cost Optimization

1. **Railway**: Free tier available
2. **Vercel**: Free tier available
3. **PlanetScale**: Free tier available
4. **Render**: Free tier available

Your application should now be fully deployed and accessible online! 