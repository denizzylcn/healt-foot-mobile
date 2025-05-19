import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthScreen from '../Screens/AuthScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import ServicesScreen from '../Screens/ServicesScreen';
import ServiceDetailScreen from '../Screens/ServiceDetailScreen';
import RandevuAlScreen from '../Screens/RandevuAlScreen';
import RandevularimScreen from '../Screens/RandevularimScreen';
import YorumlarScreen from '../Screens/YorumlarScreen';


const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6A0DAD' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#6A0DAD',
          drawerLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen name="Ana Sayfa" component={HomeScreen} />
        <Drawer.Screen name="Hizmetlerimiz" component={ServicesScreen} />
        <Drawer.Screen name="Randevu Al" component={RandevuAlScreen} />
        <Drawer.Screen name="Randevularım" component={RandevularimScreen} />
        <Drawer.Screen name="Yorumlar" component={YorumlarScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}