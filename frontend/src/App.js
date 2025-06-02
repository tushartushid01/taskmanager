import React, { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTask, setFilterTask] = useState([]);

  const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
  };

  const filterdAndSorted = () => {
  let currentTasks = [...tasks];
    if(searchTerm){
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentTasks = currentTasks.filter(
        (task) => 
          task.title.toLowerCase().includes(lowerCaseSearchTerm) || 
          task.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    setFilterTask(currentTasks);
  };

  useEffect(() => {
    filterdAndSorted();
  }, [searchTerm, tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task) => {
    if (task.id) {
      await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    } else {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
    }
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>
      <TaskForm onSave={handleSave} editingTask={editingTask} />
      <div style={{marginTop : 32}}> {/* Using mb-4 for margin, assuming basic CSS or Tailwind */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Basic Tailwind-like classes
            />
        </div>
      <TaskList
        tasks={filterTask}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
