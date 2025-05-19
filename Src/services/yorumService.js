import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const yorumEkle = async (yorum) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Comments`, yorum);
    return response.data;
  } catch (error) {
    console.error('Yorum ekleme hatası:', error.response?.data || error.message);
    throw error;
  }
};

export const getYorumlar = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Comments`);
    return response.data;
  } catch (error) {
    console.error('Yorumları alma hatası:', error);
    throw error;
  }
};
