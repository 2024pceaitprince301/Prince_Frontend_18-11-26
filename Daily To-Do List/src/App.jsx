import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])   // each task: { text, done }
  const [input, setInput] = useState('')

  const addTask = () => {
    const text = input.trim()

    // Ignore empty input
    if (text === '') return

    setTasks([...tasks, { text: text, done: false }])
    setInput('')
  }

  // Clicking the text toggles completed / not completed
  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    )
    setTasks(updated)
  }

  // Delete removes the task from the array
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  // Pressing Enter in the text box also adds the task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  const remaining = tasks.filter((task) => !task.done).length

  return (
    <div className="card">
      <h2>My To-Do List</h2>

      <div className="input-row">
        <input
          type="text"
          placeholder="Enter a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              className={task.done ? 'task-text done' : 'task-text'}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <p className="status">
        {tasks.length === 0
          ? 'No tasks yet. Add one above!'
          : `${remaining} of ${tasks.length} tasks remaining`}
      </p>
    </div>
  )
}

export default App