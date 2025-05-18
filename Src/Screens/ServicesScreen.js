import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import services from '../assets/data/services.json'; // Yolu doğruysa bırak, değilse düzelt

export default function ServicesScreen() {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate('ServiceDetail', { serviceId: id });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tüm Hizmetlerimiz</Text>
      {services.map((service, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(service.id)}
        >
          <Text style={styles.cardText}>▸ {service.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F0FF',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    color: '#6A0DAD',
    fontWeight: '600',
    fontSize: 16,
  },
});
