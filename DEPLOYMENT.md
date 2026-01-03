# 🚀 Deployment Guide - Task Web App

Complete deployment guide for the Task Web App with Orange-Olive-Vanilla theme.

---

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account with repository access: https://github.com/samreensami/hack2-phase2.git
- ✅ Render account (for backend): https://render.com
- ✅ Vercel account (for frontend): https://vercel.com
- ✅ Neon database (optional, for persistent storage): https://neon.tech

---

## 🗄️ Part 1: Backend Deployment on Render

### Step 1: Create Neon Database (Optional)

1. Go to https://neon.tech and create a free account
2. Create a new project
3. Copy your PostgreSQL connection string (DATABASE_URL)
   - Format: `postgresql://user:password@host/database?sslmode=require`

### Step 2: Deploy Backend to Render

1. **Login to Render**: https://dashboard.render.com

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `samreensami/hack2-phase2`
   - **Name**: `task-app-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (we'll use `backend/` in commands)
   - **Runtime**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r backend/requirements.txt
     ```
   - **Start Command**:
     ```bash
     cd backend && uvicorn api:app --host 0.0.0.0 --port $PORT
     ```

3. **Set Environment Variables** (in Render Dashboard):
   ```
   SECRET_KEY=your-super-secret-random-string-here-min-32-chars
   DATABASE_URL=your-neon-database-url-here (optional for now)
   FRONTEND_URL=https://your-app.vercel.app (add after frontend deployment)
   PYTHON_VERSION=3.12.0
   ```

4. **Deploy**: Click "Create Web Service"

5. **Wait** for deployment to complete (3-5 minutes)

6. **Copy Backend URL**: Something like `https://task-app-backend-xxx.onrender.com`

---

## 🎨 Part 2: Frontend Deployment on Vercel

### Step 1: Deploy to Vercel

1. **Login to Vercel**: https://vercel.com/login

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import from GitHub: `samreensami/hack2-phase2`

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://task-app-backend-xxx.onrender.com
   ```
   ⚠️ **Important**: Replace with your actual Render backend URL from Part 1, Step 6

5. **Deploy**: Click "Deploy"

6. **Wait** for deployment (2-3 minutes)

7. **Copy Frontend URL**: Something like `https://your-app-name.vercel.app`

### Step 2: Update Backend CORS

Now that you have the Vercel URL, go back to Render:

1. Go to your backend service on Render
2. Add/Update environment variable:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
3. This will trigger an automatic redeployment
4. Wait for backend to redeploy (~2 minutes)

---

## ✅ Part 3: Verification & Testing

### 1. Test Backend API

Open your backend URL in browser:
```
https://task-app-backend-xxx.onrender.com
```

You should see:
```json
{"message":"Task Web App API","status":"running"}
```

### 2. Test Frontend

Open your Vercel URL:
```
https://your-app-name.vercel.app
```

**Expected Behavior**:
- ✅ **Home Page**: Vanilla background with "Task Web App" title
- ✅ **Olive Green**: Sidebar and navbar in deep olive (#556B2F)
- ✅ **Orange Buttons**: Login/Register buttons in vibrant orange (#FF8C00)
- ✅ **Theme**: Entire site should display Orange-Olive-Vanilla theme

### 3. Test Full Flow

1. **Register**: Create a new account
2. **Login**: Login with your credentials
3. **Dashboard**: Should load with olive navbar and vanilla background
4. **Create Task**: Add a new task
5. **Update Task**: Toggle task status (pending ↔ completed)
6. **Delete Task**: Remove a task

If all steps work, your deployment is **SUCCESSFUL**! 🎉

---

## 🎨 Theme Verification

### Color Codes to Verify:

- **Vanilla Background**: `#FDF5E6` (Pure Cream)
- **Olive Green**: `#556B2F` (Navbar, headings, borders)
- **Orange**: `#FF8C00` (Buttons, highlights, CTAs)

### Visual Checks:

✅ Home page has vanilla background
✅ Navigation bar is olive green
✅ Primary buttons are orange
✅ Login form has orange submit button
✅ Dashboard has olive navbar
✅ Task cards have proper color styling

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend shows "Application failed"
- **Solution**: Check Render logs, ensure `requirements.txt` is correct

**Problem**: CORS errors in browser console
- **Solution**: Verify `FRONTEND_URL` is set correctly in Render environment variables

### Frontend Issues

**Problem**: "Failed to fetch tasks"
- **Solution**: Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- **Solution**: Ensure backend is running and accessible

**Problem**: Login doesn't work
- **Solution**: Check browser console for CORS errors
- **Solution**: Verify backend CORS is configured to allow Vercel domain

### Theme Issues

**Problem**: Colors look different
- **Solution**: Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- **Solution**: Check Tailwind config is deployed correctly

---

## 🔄 Redeployment

### Backend Updates

1. Push changes to GitHub
2. Render will auto-deploy from `main` branch

### Frontend Updates

1. Push changes to GitHub
2. Vercel will auto-deploy from `main` branch

---

## 📝 Environment Variables Summary

### Backend (Render)
```env
SECRET_KEY=random-32-char-string
DATABASE_URL=postgresql://... (optional)
FRONTEND_URL=https://your-app.vercel.app
PYTHON_VERSION=3.12.0
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://task-app-backend.onrender.com
```

---

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] CORS configured correctly
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads with correct theme
- [ ] Can create, update, and delete tasks
- [ ] Orange-Olive-Vanilla theme visible everywhere

---

## 📞 Support

If you encounter issues:
1. Check Render logs (Backend → Logs tab)
2. Check Vercel logs (Deployments → View Function Logs)
3. Check browser console for JavaScript errors
4. Verify all environment variables are set correctly

---

**Deployment Complete!** 🚀

Your Task Web App with the beautiful Orange-Olive-Vanilla theme is now live and accessible worldwide!
