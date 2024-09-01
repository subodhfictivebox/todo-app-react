import React, { useState, useEffect } from "react";
import "./App.css";

function TaskInput({ addTask }) {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

function TaskItem({ task, removeTask }) {
  return (
    <li>
      {task} <button onClick={removeTask}>Complete</button>
    </li>
  );
}

function TaskList({ tasks, removeTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          removeTask={() => removeTask(index)}
        />
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // // Save tasks to local storage whenever the tasks state changes
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    let data = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
      <footer>
    This application is created by Disha ka Pookie ❤️
</footer>
    </div>
  );
}

export default App;
