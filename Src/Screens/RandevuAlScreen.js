import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Platform, Modal, ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createRandevu, checkAvailability, getRandevularByDate } from '../services/randevuService';

export default function RandevuAlScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [tarih, setTarih] = useState(new Date());
  const [saat, setSaat] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [saatSecModal, setSaatSecModal] = useState(false);

  const [availableHours] = useState([
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ]);
  const [disabledHours, setDisabledHours] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.aciklama) {
      setAciklama(route.params.aciklama);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchSaatler = async () => {
      const tarihStr = tarih.toISOString().split('T')[0];
      const randevular = await getRandevularByDate(tarihStr);
      const doluSaatler = randevular.map(r => r.saat.trim());
      setDisabledHours(doluSaatler);
    };
    fetchSaatler();
  }, [tarih]);

  const handleSubmit = async () => {
    if (!tarih || !saat || !aciklama || !email || !telefon) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const tarihStr = tarih.toISOString().split('T')[0];
    const uygunMu = await checkAvailability(tarihStr, saat);
    if (!uygunMu) {
      Alert.alert('Uyarı', 'Bu tarih ve saat için zaten bir randevu var. Lütfen başka bir zaman seçin.');
      return;
    }

    const yeniRandevu = {
      kullaniciId: 1,
      tarih: tarihStr,
      saat,
      aciklama,
      email,
      telefon,
      durum: 'Bekliyor',
    };

    try {
      const response = await createRandevu(yeniRandevu);
      if (response && (response.id || response.success)) {
        Alert.alert('Başarılı', 'Randevunuz başarıyla oluşturuldu!');
        navigation.goBack();
      } else {
        Alert.alert('Hata', 'Sunucudan beklenen yanıt alınamadı.');
      }
    } catch (error) {
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

      <TouchableOpacity
        onPress={() => setSaatSecModal(true)}
        activeOpacity={0.8}
        style={styles.selectBox}
      >
        <Text style={{ color: saat ? '#000' : '#888' }}>
          {saat || 'Saat Seçiniz'}
        </Text>
      </TouchableOpacity>


      <Modal
        visible={saatSecModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Bir saat seç</Text>

            <ScrollView>
              {availableHours.map((hour) => {
                const dolu = disabledHours.includes(hour.trim());

                return (
                  <TouchableOpacity
                    key={hour}
                    onPress={() => {
                      if (!dolu) {
                        setSaat(hour);
                        setSaatSecModal(false);
                      }
                    }}
                    style={[
                      styles.saatItem,
                      dolu
                        ? { backgroundColor: '#e0e0e0', borderWidth: 1, borderColor: '#aaa' }
                        : { backgroundColor: '#6A0DAD' },
                    ]}
                    disabled={dolu}
                  >
                    <Text style={{ color: dolu ? '#666' : '#fff', fontWeight: 'bold' }}>
                      {hour}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>


            <TouchableOpacity onPress={() => setSaatSecModal(false)}>
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#6A0DAD' }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF', padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  button: { backgroundColor: '#6A0DAD', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  saatItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectBox: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },

});
