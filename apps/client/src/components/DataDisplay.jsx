import { useState, useEffect } from 'react';
import { dataService, todoService } from '../services';

function DataDisplay() {
  const [data, setData] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch app info and todos in parallel
        const [infoData, todosData] = await Promise.all([
          dataService.getData(),
          todoService.getAllTodos()
        ]);
        
        setData(infoData);
        setTodos(todosData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data from server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data || !todos) return <div>No data available</div>;

  // Calculate todo statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="data-display">
      <h2>Todo Statistics</h2>
      
      <div className="stats-container">
        <div className="stat-box">
          <h3>Total</h3>
          <p className="stat-value">{totalTodos}</p>
        </div>
        
        <div className="stat-box">
          <h3>Completed</h3>
          <p className="stat-value">{completedTodos}</p>
        </div>
        
        <div className="stat-box">
          <h3>Pending</h3>
          <p className="stat-value">{pendingTodos}</p>
        </div>
        
        <div className="stat-box">
          <h3>Completion</h3>
          <p className="stat-value">{completionRate}%</p>
        </div>
      </div>
      
      <div className="app-info">
        <p><strong>{data.appInfo.name}</strong> v{data.appInfo.version}</p>
        <p>Last updated: {new Date(data.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default DataDisplay;