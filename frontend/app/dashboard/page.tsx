"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { taskAPI } from "@/lib/api";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    if (!token) {
      router.push("/login");
      return;
    }

    setUsername(user || "User");
    loadTasks();
  }, [router]);

  const loadTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await taskAPI.createTask(newTask);
      setNewTask({ title: "", description: "", priority: "medium" });
      setShowAddForm(false);
      loadTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(taskId);
        loadTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      await taskAPI.updateTask(task.id, { status: newStatus });
      loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "completed" ? "bg-green-600" : "bg-yellow-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vanilla flex items-center justify-center">
        <div className="text-2xl text-olive font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vanilla">
      {/* Navbar */}
      <nav className="bg-olive shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Task Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">Welcome, {username}!</span>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange/90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-olive">Your Tasks</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-orange text-white font-bold rounded-lg shadow-lg hover:bg-orange/90 transition-all duration-200 hover:scale-105"
          >
            {showAddForm ? "Cancel" : "+ Add New Task"}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-olive">
            <h3 className="text-2xl font-bold text-olive mb-4">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-olive font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-olive/30 focus:border-orange focus:outline-none"
                  placeholder="Task title"
                  required
                />
              </div>
              <div>
                <label className="block text-olive font-semibold mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-olive/30 focus:border-orange focus:outline-none"
                  placeholder="Task description (optional)"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-olive font-semibold mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-4 py-2 rounded border-2 border-olive/30 focus:border-orange focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange text-white font-bold rounded-lg hover:bg-orange/90 transition-colors"
              >
                Add Task
              </button>
            </form>
          </div>
        )}

        {/* Tasks Table */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-2xl text-olive/70">No tasks yet. Create your first task!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-olive text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Title</th>
                  <th className="px-6 py-4 text-left font-bold">Description</th>
                  <th className="px-6 py-4 text-center font-bold">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Priority</th>
                  <th className="px-6 py-4 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-b ${index % 2 === 0 ? "bg-vanilla/30" : "bg-white"} hover:bg-vanilla/60 transition-colors`}
                  >
                    <td className="px-6 py-4 font-semibold text-olive">{task.title}</td>
                    <td className="px-6 py-4 text-olive/80">{task.description || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleToggleStatus(task)}
                          className="px-4 py-2 bg-olive text-white rounded hover:bg-olive/90 transition-colors text-sm font-semibold"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
