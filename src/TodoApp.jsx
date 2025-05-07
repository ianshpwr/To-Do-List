import React, { useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, text: input } : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }
    setInput("");
  };

  const handleDelete = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = id => {
    const task = tasks.find(t => t.id === id);
    setInput(task.text);
    setEditId(id);
  };

  const toggleComplete = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="todo-container" style={{display:"grid",justifyContent:"center",alignItems:"center"}}>
      <h1 className="todo-title" style={{}} >To-Do List</h1>
      <div className="todo-input-group">
        <input
          className="todo-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button className="todo-btn" onClick={handleAddOrEdit}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.completed ? "done" : ""}`}>
            <span className="todo-text" onClick={() => toggleComplete(task.id)}>
              {task.text}
            </span>
            <div className="todo-actions">
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
