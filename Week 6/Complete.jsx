import React from "react";
import { useTodoContext } from "../context/Context";

function Complete() {
  const { tasks } = useTodoContext();  

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="page">
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks!</p>
      ) : (
        <ul>
          {completedTasks.map((task, i) => (
            <li key={i}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Complete;
