# 🚀 Deploy to Hugging Face Spaces

This backend is ready to deploy on Hugging Face Spaces using Docker.

## 📋 Quick Deployment Steps

### Step 1: Create New Space

1. Go to https://huggingface.co/spaces
2. Click **"Create new Space"**
3. Fill in details:
   - **Space name**: `task-web-backend` (or your choice)
   - **License**: Apache 2.0
   - **Select SDK**: **Docker**
   - **Hardware**: CPU (Basic) - Free
4. Click **"Create Space"**

### Step 2: Push Code to Space

#### Option A: Using Git (Recommended)

```bash
# Clone your space
git clone https://huggingface.co/spaces/YOUR_USERNAME/task-web-backend
cd task-web-backend

# Copy files from this repo
cp ../hack2_phase1/Dockerfile .
cp ../hack2_phase1/.dockerignore .
cp -r ../hack2_phase1/backend .

# Commit and push
git add .
git commit -m "Initial backend deployment"
git push
```

#### Option B: Using Web Interface

1. In your Space, click **"Files"** tab
2. Click **"Add file"** → **"Upload files"**
3. Upload:
   - `Dockerfile`
   - `backend/` folder (entire directory)
4. Commit changes

### Step 3: Configure Environment Variables

In your Space settings, add these environment variables:

```env
SECRET_KEY=your-super-secret-key-change-in-production-min-32-chars
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Wait for Build

- Hugging Face will automatically build your Docker image
- Build takes 2-5 minutes
- Check "Logs" tab for progress

### Step 5: Get Your URL

Once deployed, your backend will be available at:
```
https://YOUR_USERNAME-task-web-backend.hf.space
```

## 🔧 Dockerfile Details

Our Dockerfile:
- Uses Python 3.12 slim image
- Installs dependencies from `backend/requirements.txt`
- Exposes port 7860 (Hugging Face default)
- Starts FastAPI with Uvicorn
- Includes health checks

## ✅ Verification

Test your deployed backend:
```bash
curl https://YOUR_USERNAME-task-web-backend.hf.space
```

Expected response:
```json
{"message":"Task Web App API","status":"running"}
```

## 🎨 Frontend Integration

Update your Vercel frontend environment variable:
```env
NEXT_PUBLIC_API_URL=https://YOUR_USERNAME-task-web-backend.hf.space
```

## 📝 Notes

- **Free tier**: Spaces on free tier may sleep after inactivity
- **Wake up**: First request after sleep takes 10-20 seconds
- **Upgrade**: Consider upgrading to persistent hardware for production

## 🔗 Resources

- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces)
- [Docker Spaces Guide](https://huggingface.co/docs/hub/spaces-sdks-docker)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

## 🐛 Troubleshooting

**Build fails?**
- Check Dockerfile syntax
- Verify `backend/requirements.txt` exists
- Check logs in Space settings

**API not responding?**
- Ensure port 7860 is used
- Check environment variables are set
- Review application logs

**CORS errors?**
- Add your frontend URL to `FRONTEND_URL` env variable
- Backend automatically allows Vercel domains

---

**Ready to deploy!** Follow the steps above and share your Hugging Face Space URL! 🎉
