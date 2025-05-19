// src/services/randevuService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const createRandevu = async (randevuData) => {
  try {
    console.log('API isteği gönderiliyor:', randevuData); // DEBUG için eklendi
    const response = await axios.post(`${API_BASE_URL}/randevu/create`, randevuData);
    console.log('API cevabı alındı:', response.data); // DEBUG için eklendi
    return response.data;
  } catch (error) {
    console.error('Randevu oluşturma hatası:', error.response?.data || error.message);
    throw error;
  }
};
