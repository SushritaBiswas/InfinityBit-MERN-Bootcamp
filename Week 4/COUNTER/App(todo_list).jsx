import { useState } from "react";
import "./App.css";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function addTask(event) {
    event.preventDefault();
    if (input.trim() !== "") {
      setTasks(tasks.concat({ text: input, completed: false }));
      setInput("");
    }
  }

  function deleteTask(index) {
    let newTasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
    setTasks(newTasks);
  }

  function toggleComplete(index) {
    let newTasks = tasks.slice();
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  return (
    <div className="todo_container">
      <h1>TO-DO LIST</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={function (event) {
            setInput(event.target.value);
          }}
          placeholder="Enter task..."
          className="todo_input"
        />
        <button type="submit" className="todo_btn">Add</button>
      </form>

      <ul>
        {tasks.length === 0 && <p>No tasks yet!</p>}
        {tasks.map(function (task, index) {
          return (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span onClick={function () { toggleComplete(index); }}>
                {task.completed ? "✅" : "⬜"} {task.text}
              </span>
              <button onClick={function () { deleteTask(index); }}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
