# ⚡ Quick Deployment Checklist

Fast deployment guide for Task Web App - Follow these steps in order!

---

## 🎯 Backend Deployment (Render) - 5 minutes

### 1️⃣ Go to Render
Visit: https://dashboard.render.com

### 2️⃣ Create New Web Service
- Click "New +" → "Web Service"
- Connect GitHub: `samreensami/hack2-phase2`

### 3️⃣ Configure:
```
Name: task-app-backend
Runtime: Python 3
Build Command: pip install -r backend/requirements.txt
Start Command: cd backend && uvicorn api:app --host 0.0.0.0 --port $PORT
```

### 4️⃣ Environment Variables:
```env
SECRET_KEY=your-random-32-char-string-here
PYTHON_VERSION=3.12.0
```
*(Add DATABASE_URL later for Neon DB)*

### 5️⃣ Deploy & Copy URL
Wait 3-5 minutes → Copy your backend URL:
```
https://task-app-backend-xxx.onrender.com
```

---

## 🎨 Frontend Deployment (Vercel) - 3 minutes

### 1️⃣ Go to Vercel
Visit: https://vercel.com/new

### 2️⃣ Import Project
- Select: `samreensami/hack2-phase2`
- Root Directory: `frontend`
- Framework: Next.js (auto-detected)

### 3️⃣ Environment Variable:
```env
NEXT_PUBLIC_API_URL=https://task-app-backend-xxx.onrender.com
```
*(Use YOUR backend URL from Render)*

### 4️⃣ Deploy & Copy URL
Wait 2-3 minutes → Copy your frontend URL:
```
https://your-app-name.vercel.app
```

---

## 🔗 Final Step: Update Backend CORS

### Go back to Render Dashboard
- Select your backend service
- Add environment variable:
```env
FRONTEND_URL=https://your-app-name.vercel.app
```
- Save → Backend will redeploy automatically

---

## ✅ Test Your Live App!

Open your Vercel URL: `https://your-app-name.vercel.app`

**Check:**
- [ ] Vanilla cream background (#FDF5E6)
- [ ] Olive green navbar (#556B2F)
- [ ] Orange login button (#FF8C00)
- [ ] Register a user
- [ ] Login successfully
- [ ] Create a task
- [ ] Update task status
- [ ] Delete task

---

## 🎉 You're Done!

**Live URLs:**
- **Frontend**: https://your-app-name.vercel.app
- **Backend API**: https://task-app-backend-xxx.onrender.com

**Repository**: https://github.com/samreensami/hack2-phase2.git

---

## 📝 Next Steps (Optional)

### Add Neon Database:
1. Create free database at https://neon.tech
2. Copy PostgreSQL connection string
3. Add to Render: `DATABASE_URL=postgresql://...`

### Custom Domain:
- **Vercel**: Settings → Domains → Add your domain
- **Render**: Settings → Custom Domain

---

**Total Time: ~10 minutes** ⚡
