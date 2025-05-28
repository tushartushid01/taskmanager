import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleAddTask = async (task) => {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (id, updatedTask) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const updatedTaskData = await response.json();
    setTasks(tasks.map(task => task.id === id ? updatedTaskData : task));
    setEditingTask(null);
  };

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm 
        onTaskAdded={handleAddTask} 
        onTaskUpdated={handleUpdateTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDeleteTask}
        onEdit={setEditingTask}
      />
    </div>
  );
}

export default App;