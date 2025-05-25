// src/services/randevuService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const createRandevu = async (randevuData) => {
  try {
    console.log('API isteği gönderiliyor:', randevuData);
    const response = await axios.post(`${API_BASE_URL}/randevu/create`, randevuData);
    console.log('API cevabı alındı:', response.data);
    return response.data;
  } catch (error) {
    console.error('Randevu oluşturma hatası:', error.response?.data || error.message);
    throw error;
  }
};

export const checkAvailability = async (tarih, saat) => {
  try {
    const tarihStr = typeof tarih === 'string'
      ? tarih
      : new Date(tarih).toISOString().split('T')[0];

    const response = await axios.get(`${API_BASE_URL}/randevu/checkavailable`, {
      params: {
        tarih: tarihStr,
        saat
      }
    });

    return response.data; // true = uygun
  } catch (error) {
    console.error("Uygunluk kontrol hatası:", error.response?.data || error.message);
    return false; // hata varsa zaten uygun değil gibi davran
  }
};


export const getRandevularByDate = async (tarih) => {
  try {
    const tarihStr = typeof tarih === 'string'
      ? tarih
      : new Date(tarih).toISOString().split('T')[0]; // 🔥 "2025-05-30"

    const response = await axios.get(`${API_BASE_URL}/randevu/bydate`, {
      params: { tarih: tarihStr },
    });

    return response.data;
  } catch (error) {
    console.error("Tarihe göre randevular getirilirken hata:", error.response?.data || error.message);
    return [];
  }
};

