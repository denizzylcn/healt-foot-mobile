import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const createRandevu = async (randevuData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/randevular`, randevuData);
    return response.data;
  } catch (error) {
    console.error('Randevu oluşturma hatası:', error);
    throw error;
  }
};
