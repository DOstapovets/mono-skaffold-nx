import { useState, useEffect } from 'react';
import { dataService } from '../services';

function ServerStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        setLoading(true);
        const data = await dataService.getHealthStatus();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError('Unable to connect to server');
        setStatus(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkServerStatus();
    
    // Poll server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="server-status loading">Checking server status...</div>;
  
  if (error) {
    return (
      <div className="server-status error">
        <span className="status-indicator offline"></span>
        {error}
      </div>
    );
  }

  return (
    <div className="server-status">
      <span className="status-indicator online"></span>
      Server is online
      <div className="status-details">
        <p>Uptime: {Math.floor(status.uptime / 60)} minutes</p>
        <p>Last checked: {new Date(status.timestamp).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default ServerStatus;