import React from "react";

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks?.map((task) => (
          <div key={task.id} style={{ marginBottom: "1rem" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => onEdit(task)} className="edit">Edit</button>
            <button onClick={() => onDelete(task.id)} className="delete">Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
