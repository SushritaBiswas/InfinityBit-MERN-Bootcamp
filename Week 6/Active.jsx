import React from "react";
import { useTodoContext } from "../context/Context";

function Active() {
  const { tasks } = useTodoContext();
  const activeTasks = tasks.filter(task => !task.completed);

  return (
    <div className="page">
      <h2>Active Tasks</h2>
      {activeTasks.length === 0 ? <p>No active tasks!</p> : (
        <ul>
          {activeTasks.map((task, i) => (
            <li key={i}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Active;
