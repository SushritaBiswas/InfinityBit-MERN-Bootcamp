import React, { useState } from "react";
import { useTodoContext } from "../context/Context";

function Tasks() {
  const { tasks, addTask, toggleComplete, deleteTask } = useTodoContext(); 
  const [input, setInput] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask({ text: input, completed: false, id: Date.now() });
      setInput("");
    }
  };

  return (
    <div className="page">
      <h2>All Tasks</h2>
      <form onSubmit={handleAddTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? <p>No tasks yet!</p> : (
        <ul>
          {tasks.map((task, i) => (
            <li key={task.id}>
              <span
                onClick={() => toggleComplete(task.id)}
                style={{ textDecoration: task.completed ? "line-through" : "none" }}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
