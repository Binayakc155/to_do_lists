"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage on tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = { id: Date.now(), text: newTask.trim(), completed: false };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditedText(task.text);
  };

  const saveEdit = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editedText.trim() } : task
    ));
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Input to Add New Task */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Add a new task that you wanst"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="flex-1 overflow-auto space-y-3">
        {tasks.length === 0 && <p className="text-center text-yellow-400">No tasks yet.</p>}

        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`p-3 rounded-lg flex justify-between items-center item-red ${
              task.completed ? "bg-green-100 line-through text-green-900" : "bg-purple-700"
            }`}
          >
            {editingId === task.id ? (
              <div className="flex flex-1 gap-2">
                <input
                  className="flex-1 border text-3xl rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  onClick={() => saveEdit(task.id)}
                  className="bg-green-500 text-red px-3 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span
                  className="flex-1 cursor-pointer forced-color-adjust-auto"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-green-500 hover:text-green-600"
                  >
                    
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌ 
                  </button>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
