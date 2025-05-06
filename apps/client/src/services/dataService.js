import api from './api';


const dataService = {
  // Get data from the sample endpoint
  getData: async () => {
    try {
      const response = await api.get('/api/data');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  // Get server health status
  getHealthStatus: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error fetching health status:', error);
      throw error;
    }
  }
};

export default dataService;