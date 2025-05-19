import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../Screens/AuthScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import ServicesScreen from '../Screens/ServicesScreen';
import ServiceDetailScreen from '../Screens/ServiceDetailScreen';
import RandevuAlScreen from '../Screens/RandevuAlScreen';
import RandevularimScreen from '../Screens/RandevularimScreen';
import YorumlarScreen from '../Screens/YorumlarScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* Girişten sonra yönlendirilecek ana ekran */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Randevu" component={RandevuAlScreen} options={{ headerShown: true, title: 'Randevu Al' }} />
        <Stack.Screen name="Randevularim" component={RandevularimScreen} />
        <Stack.Screen name="Yorumlar" component={YorumlarScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
