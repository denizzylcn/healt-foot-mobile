import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import services from '../assets/data/services.json';

export default function ServicesScreen() {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tüm Hizmetlerimiz</Text>
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={styles.card}
          onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
        >
          <Text style={styles.cardText}>{service.title}</Text>
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
    fontSize: 21,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    color: '#4b2a78',
    fontWeight: 'bold',
  },
});
