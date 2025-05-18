// components/BottomNavBar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}>Ana Sayfa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Services')}>
        <Text style={styles.navText}>Hizmetler</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Randevu')}>
        <Text style={styles.navText}>Randevu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Randevularim')}>
        <Text style={styles.navText}>Randevularım</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
