// src/screens/RandevuAlScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createRandevu } from '../services/randevuService';
import DateTimePicker from '@react-native-community/datetimepicker';

const RandevuAlScreen = () => {
  const [tarih, setTarih] = useState(new Date());
  const [saat, setSaat] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log("handleSubmit çağrıldı");

    if (!tarih || !saat || !aciklama || !email || !telefon) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const yeniRandevu = {
      kullaniciId: 1,
      tarih: tarih.toISOString().split('T')[0], // sadece "yyyy-mm-dd"
      saat,
      aciklama,
      email,
      telefon,
      durum: 'Bekliyor',
    };

    try {
      console.log('API isteği gönderiliyor:', yeniRandevu);
      const response = await createRandevu(yeniRandevu);
      console.log('API cevabı:', response);

      if (response && (response.id || response.success)) {
        Alert.alert('Başarılı', 'Randevunuz başarıyla oluşturuldu!');
        navigation.goBack();
      } else {
        Alert.alert('Hata', 'Sunucudan beklenen yanıt alınamadı.');
      }
    } catch (error) {
      console.error('Hata detayları:', error.response?.data || error.message);
      Alert.alert('Hata', 'Randevu oluşturulurken bir hata oluştu.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setTarih(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Randevu Al</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>{tarih.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={tarih}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TextInput
        placeholder="Saat (HH:MM)"
        value={saat}
        onChangeText={setSaat}
        style={styles.input}
      />
      <TextInput
        placeholder="Açıklama"
        value={aciklama}
        onChangeText={setAciklama}
        style={styles.input}
      />
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Telefon"
        value={telefon}
        onChangeText={setTelefon}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Randevu Al</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RandevuAlScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  button: { backgroundColor: '#6A0DAD', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
