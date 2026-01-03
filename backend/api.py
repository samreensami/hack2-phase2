from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
import uvicorn

app = FastAPI(title="Task Web App API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3005"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# In-memory storage (replace with database in production)
users_db = {}
tasks_db = {}
task_id_counter = 1

# Models
class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    created_at: str
    user_id: str

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(datetime.UTC) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Routes
@app.get("/")
def root():
    return {"message": "Task Web App API", "status": "running"}

@app.post("/register")
def register(user: UserRegister):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = get_password_hash(user.password)
    users_db[user.username] = {
        "username": user.username,
        "hashed_password": hashed_password,
    }
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    if user.username not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    db_user = users_db[user.username]
    if not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/tasks", response_model=List[Task])
def get_tasks(current_user: str = Depends(get_current_user)):
    user_tasks = [task for task in tasks_db.values() if task["user_id"] == current_user]
    return user_tasks

@app.post("/tasks", response_model=Task)
def create_task(task: TaskCreate, current_user: str = Depends(get_current_user)):
    global task_id_counter

    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "description": task.description,
        "status": "pending",
        "priority": task.priority,
        "created_at": datetime.now().isoformat(),
        "user_id": current_user,
    }

    tasks_db[task_id_counter] = new_task
    task_id_counter += 1

    return new_task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, current_user: str = Depends(get_current_user)):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")

    task = tasks_db[task_id]
    if task["user_id"] != current_user:
        raise HTTPException(status_code=403, detail="Not authorized")

    if task_update.title is not None:
        task["title"] = task_update.title
    if task_update.description is not None:
        task["description"] = task_update.description
    if task_update.status is not None:
        task["status"] = task_update.status
    if task_update.priority is not None:
        task["priority"] = task_update.priority

    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, current_user: str = Depends(get_current_user)):
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")

    task = tasks_db[task_id]
    if task["user_id"] != current_user:
        raise HTTPException(status_code=403, detail="Not authorized")

    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}

if __name__ == "__main__":
    print("Starting Task Web App API on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
