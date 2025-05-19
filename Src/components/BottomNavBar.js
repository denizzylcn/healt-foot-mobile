// components/BottomNavBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}>🏠 Ana Sayfa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Services')}>
        <Text style={styles.navText}>💅 Hizmetler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Randevu')}>
        <Text style={styles.navText}>	📅 Randevu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Randevularim')}>
        <Text style={styles.navText}>📋 Randevularım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Yorumlar')}>
        <Text>💬 Yorumlar</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5DFF7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  navText: {
    color: '#6A0DAD',
    fontWeight: '600',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#EDE9F7',
  },
});

