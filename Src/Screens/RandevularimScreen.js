import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';

export default function RandevularimScreen() {
  const [randevular, setRandevular] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 24, color: '#6A0DAD' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchRandevular();
  }, []);

  const fetchRandevular = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/randevu/list`);
      setRandevular(response.data);
    } catch (error) {
      console.error('Randevular alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.row}>
        <Text style={styles.label}>📅 Tarih:</Text> {item.tarih}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>⏰ Saat:</Text> {item.saat}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>📝 Açıklama:</Text> {item.aciklama}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>📌 Durum:</Text> {item.durum}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6A0DAD" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Randevularım</Text>
      <FlatList
        data={randevular}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Henüz randevunuz bulunmamaktadır.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF', padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  row: { marginBottom: 6, color: '#333' },
  label: { fontWeight: 'bold', color: '#4b2a78' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});
