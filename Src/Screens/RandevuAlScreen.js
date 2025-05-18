import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const RandevuAlScreen = () => {
  const [adSoyad, setAdSoyad] = useState('');
  const [telefon, setTelefon] = useState('');
  const [tarih, setTarih] = useState('');
  const [saat, setSaat] = useState('');
  const [hizmet, setHizmet] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!adSoyad || !telefon || !tarih || !saat || !hizmet) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/randevular`, {
        adSoyad,
        telefon,
        tarih,
        saat,
        hizmet,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Başarılı', 'Randevunuz başarıyla alındı!');
        navigation.goBack();
      } else {
        Alert.alert('Hata', 'Randevu oluşturulamadı.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Sunucu hatası oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Randevu Al</Text>

      <TextInput placeholder="Ad Soyad" value={adSoyad} onChangeText={setAdSoyad} style={styles.input} />
      <TextInput placeholder="Telefon" value={telefon} onChangeText={setTelefon} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Tarih (GG/AA/YYYY)" value={tarih} onChangeText={setTarih} style={styles.input} />
      <TextInput placeholder="Saat (HH:MM)" value={saat} onChangeText={setSaat} style={styles.input} />
      <TextInput placeholder="Hizmet" value={hizmet} onChangeText={setHizmet} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Randevu Al</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RandevuAlScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F0FF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
