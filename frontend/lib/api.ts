import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: (username: string, password: string) =>
    api.post("/register", { username, password }),

  login: (username: string, password: string) =>
    api.post("/login", { username, password }),
};

export const taskAPI = {
  getTasks: () => api.get("/tasks"),

  createTask: (task: { title: string; description?: string; priority?: string }) =>
    api.post("/tasks", task),

  updateTask: (taskId: number, updates: any) =>
    api.put(`/tasks/${taskId}`, updates),

  deleteTask: (taskId: number) =>
    api.delete(`/tasks/${taskId}`),
};

export default api;
