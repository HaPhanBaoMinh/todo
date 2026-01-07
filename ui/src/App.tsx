import './App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="container py-4 bg-light min-vh-100 border">
      <h1 className="my-4 text-center text-bold">TO DO</h1>

<form className="mb-3">
  <div className="row justify-content-center g-2">
    <div className="col-10 col-md-8 col-lg-6">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add your task..."
        />
        <button type="submit" className="btn btn-primary">
          +
        </button>
      </div>
    </div>
  </div>
</form>
      <hr />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
}

function TodoItem({ task = "Test", completed = false }) {
  return (
    <div className="row justify-content-center mb-2" >
      <div className="col-10 col-md-8 col-lg-6">
        <div className="d-flex align-items-center item-card p-2 border shadow-sm">
          
          {/* Task text */}
          <span
            className={
              "flex-grow-1 ps-2" +
              (completed
                ? " text-decoration-line-through text-secondary"
                : "")
            }
          >
            {task}
          </span>

          <button className="btn me-2 btn-sm btn-outline-danger">
            Delete
          </button>

		  <button
            className={
              "btn btn-sm " +
              (completed ? "btn-success" : "btn-outline-success")
            }
          >
            Done
          </button>

        </div>
      </div>
    </div>
  );
}


export default App;

