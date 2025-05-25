import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Uyarı', 'Şifreler uyuşmuyor.');
      return;
    }

    try {
      // ✅ Firebase üzerinden kullanıcıyı kaydet
      await auth().createUserWithEmailAndPassword(email, password);

      // Kullanıcı adı gibi ek bilgiler Firestore'a yazılabilir (isteğe bağlı)
      Alert.alert('Başarılı', 'Kayıt işlemi başarılı!');
      navigation.replace('Login');
    } catch (error) {
      console.error('Kayıt hatası:', error);
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <TextInput
          placeholder="Ad Soyad"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Şifre Tekrar"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F0FF',
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#6A0DAD',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RegisterScreen;
