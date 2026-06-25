import axios from 'axios';
import mockData from '../mockData.json';

const API_BASE_URL = 'https://forge-qualifier-production.up.railway.app/api';

export const apiService = {
  async getBoard() {
    try {
      const response = await axios.get(`${API_BASE_URL}/board`);
      return response.data;
    } catch (error) {
      console.warn("Backend unreachable. Switching to mock data mode.");
      return mockData;
    }
  },

  async updateCard(cardId, updates) {
    try {
      const response = await axios.patch(`${API_BASE_URL}/cards/${cardId}`, updates);
      return response.data;
    } catch (error) {
      console.error("Failed to update card on server, but UI was updated optimistically.");
      throw error;
    }
  }
};
