import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Add a task to get started!</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;