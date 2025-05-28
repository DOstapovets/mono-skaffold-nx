import { useState } from 'react';
import { TodoList, TodoForm, ServerStatus, DataDisplay } from './components';
import './App.css';

function App() {
  const [refreshTodos, setRefreshTodos] = useState(false);

  const handleTodoAdded = () => {
    // Trigger a refresh of the todo list
    setRefreshTodos(prev => !prev);
  };

  return (
    <div className="app-container">
      <header>
        <h1>TODO</h1>
      </header>

      <main>
        <div className="app-section">
          <h2>Todo</h2>
          <div className="todo-management">
            <TodoForm onTodoAdded={handleTodoAdded} />
            <TodoList refreshTrigger={refreshTodos} />
          </div>
        </div>

        <div className="app-section">
          <DataDisplay />
        </div>
      </main>

      <footer>
        <p>Connected to Express backend</p>
        <ServerStatus />
      </footer>
    </div>
  );
}

export default App;

