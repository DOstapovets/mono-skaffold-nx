import { useState } from 'react';
import { todoService } from '../services';

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Todo title cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const newTodo = await todoService.createTodo({ title });
      setTitle('');
      if (onTodoAdded) onTodoAdded(newTodo);
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="todo-form">
      <h3>Add New Todo</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={submitting}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
