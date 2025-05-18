// src/screens/RandevularimScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function RandevularimScreen() {
  const [randevular, setRandevular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandevular();
  }, []);

  const fetchRandevular = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/randevular`);
      setRandevular(response.data);
    } catch (error) {
      console.error('Randevular alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>👤 {item.adSoyad}</Text>
      <Text style={styles.itemText}>📅 {item.tarih} - 🕒 {item.saat}</Text>
      <Text style={styles.itemText}>💆‍♀️ {item.hizmet}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#6A0DAD" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Randevularım</Text>
      <FlatList
        data={randevular}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz randevunuz bulunmamaktadır.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10, elevation: 2 },
  itemText: { color: '#333', marginBottom: 4 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});
