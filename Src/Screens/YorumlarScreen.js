import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getYorumlar } from '../services/yorumService';
import { useNavigation } from '@react-navigation/native';

export default function YorumlarScreen() {
  const [yorumlar, setYorumlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
         <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 22, color: '#6A0DAD' }}>☰</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  useEffect(() => {
    const fetchYorumlar = async () => {
      try {
        const data = await getYorumlar();
        const onayliYorumlar = data.filter(y => y.name && y.content && y.rating); // istersen durum kontrolü de ekleyebilirim
        setYorumlar(onayliYorumlar);
      } catch (error) {
        console.error('Yorumlar alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYorumlar();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#6A0DAD" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kullanıcı Yorumları</Text>
      {yorumlar.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>👤 {item.name}</Text>
          <Text style={styles.content}>💬 {item.content}</Text>
          <Text style={styles.rating}>⭐ {item.rating} / 5</Text>
        </View>
      ))}
      {yorumlar.length === 0 && <Text style={styles.emptyText}>Henüz onaylı yorum bulunmamaktadır.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#6A0DAD', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 12, elevation: 2 },
  name: { fontWeight: 'bold', color: '#4b2a78' },
  content: { marginVertical: 4, color: '#333' },
  rating: { color: '#6A0DAD' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});
