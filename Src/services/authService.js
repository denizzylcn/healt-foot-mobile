import axios from 'axios';
import BASE_URL from '../config/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/Register`, userData);
    return response.data;
  } catch (error) {
    console.error("Kayıt hatası:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/Login`, userData);
    return response.data;
  } catch (error) {
    console.error("Giriş hatası:", error.response?.data || error.message);
    throw error;
  }
};
