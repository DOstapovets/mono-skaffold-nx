import { useState, useEffect } from 'react';
import { todoService } from '../services';

function TodoList({ refreshTrigger, onTodoToggle, onTodoDelete }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getAllTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch todos');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [refreshTrigger]);

  const handleToggle = async (id) => {
    try {
      const updatedTodo = await todoService.toggleTodoStatus(id);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      if (onTodoToggle) onTodoToggle(updatedTodo);
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      if (onTodoDelete) onTodoDelete(id);
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="empty-list">No todos yet. Add one above!</div>;
  }

  return (
    <div className="todo-list">
      <h3>My Todos</h3>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <span className="todo-title">{todo.title}</span>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
