function TaskItem({ task, onDelete, onEdit }) {
    return (
      <div className="border p-4 rounded shadow-sm">
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <div className="mt-2 space-x-2">
          <button 
            onClick={() => onEdit(task)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;