import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  function decrease() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  function increase() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>React Counter</h1>
      <div>
        <h5>Current count is</h5>
        <h1 className="current-count">{count}</h1>
        <button onClick={decrease}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
}

export default App;
