import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import { yorumEkle } from '../services/yorumService';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('5');

  const navigation = useNavigation();

  // 🍔 Hamburger menu
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={{ fontSize: 24, color: '#fff', marginLeft: 16 }}>☰</Text>
      </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: '#6A0DAD' },
      headerTintColor: '#fff',
    });
  }, [navigation]);

  const openMap = () => {
    Linking.openURL(
      'https://www.google.com/maps/search/?api=1&query=sardağ+plaza,+Yeni,+Muammer+Çorbacıoğlu+Sk.+no:35+D:4+kat+23,+Elazığ'
    );
  };

  const handleSubmit = async () => {
    const numericRating = parseInt(rating);
    if (!name || !content || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları eksiksiz ve doğru doldurun (puan 1-5 arası).');
      return;
    }

    try {
      await yorumEkle({ name, content, rating: numericRating });
      Alert.alert('Teşekkürler', 'Yorumunuz başarıyla gönderildi. Onay sonrası yayınlanacaktır.');
      setName('');
      setContent('');
      setRating('5');
    } catch (error) {
      console.error('Yorum gönderme hatası:', error);
      Alert.alert('Hata', 'Yorum gönderilirken bir sorun oluştu.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={require('../assets/images/anasayfa.jpg')} style={styles.backgroundImage} />

        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
          <Text style={styles.headerText}>Elazığ Ayak Bakım Merkezi</Text>
        </View>

        <Text style={styles.subText}>
          Sağlığınızı ve estetik beklentilerinizi karşılamak için buradayız.
        </Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>👩‍⚕️ Uzman Destek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>😊 Güler Yüzlü Hizmet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>📞 Danışmanlık</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>Hakkımızda</Text>
          <Text style={styles.aboutText}>
            Elazığ Ayak Bakım Merkezi olarak, deneyimli ekibimizle ayak ve el bakımında güvenilir hizmetler sunuyoruz. Müşteri memnuniyetini esas alıyor, modern tekniklerle sağlıklı ve estetik çözümler sağlıyoruz.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Başlıca Hizmetlerimiz</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceScroll}>
          <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#8B5CF6' }]}>
            <Text style={styles.serviceText}>Medikal Bakım</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#F43F5E' }]}>
            <Text style={styles.serviceText}>Nasır Temizliği</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.serviceText}>Tırnak Batması</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#FB923C' }]}>
            <Text style={styles.serviceText}>Tırnak Mantar Tedavisi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.serviceButton, { backgroundColor: '#A855F7' }]}>
            <Text style={styles.serviceText}>Topuk Çatlağı Bakımı</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Yorum Formu */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Yorum Yap</Text>
          <TextInput
            placeholder="Ad Soyad"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Yorumunuz"
            value={content}
            onChangeText={setContent}
            style={[styles.input, { height: 100 }]}
            multiline
          />
          <View style={styles.ratingPickerContainer}>
            <Text style={styles.label}>Puan:</Text>
            <Picker
              selectedValue={rating}
              onValueChange={(itemValue) => setRating(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="5 - Mükemmel" value="5" />
              <Picker.Item label="4 - İyi" value="4" />
              <Picker.Item label="3 - Orta" value="3" />
              <Picker.Item label="2 - Kötü" value="2" />
              <Picker.Item label="1 - Berbat" value="1" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerTitle}>Ayak Bakım Elazığ</Text>
          <Text style={styles.footerText}>📍 Sarıdağ Plaza, Yeni Mah. Muammer Çorbacıoğlu Sk. No:35 D:4</Text>
          <Text style={styles.footerText}>📞 +90 535 494 14 31</Text>
          <Text style={styles.footerLink} onPress={openMap}>📍 Haritada Görüntüle</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F0FF' },
  backgroundImage: { width: '100%', height: 200, resizeMode: 'cover' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 16 },
  logo: { width: 60, height: 60, resizeMode: 'contain', marginVertical: 10 },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#6A0DAD' },
  subText: { textAlign: 'center', color: '#6A0DAD', marginVertical: 6, paddingHorizontal: 16 },
  cardContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 12, elevation: 3 },
  cardText: { color: '#6A0DAD', fontWeight: 'bold' },
  aboutBox: { backgroundColor: '#8B5CF6', margin: 16, padding: 16, borderRadius: 12 },
  aboutTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
  aboutText: { color: '#fff', fontSize: 14 },
  sectionTitle: { marginLeft: 16, marginVertical: 10, fontSize: 16, fontWeight: 'bold', color: '#6A0DAD' },
  serviceScroll: { paddingLeft: 10 },
  serviceButton: { padding: 12, borderRadius: 10, marginHorizontal: 6, marginBottom: 16 },
  serviceText: { color: '#fff', fontWeight: 'bold' },
  form: { padding: 20, backgroundColor: '#fff', marginTop: 20, borderTopWidth: 1, borderColor: '#ddd' },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#4b2a78' },
  input: { backgroundColor: '#F0EFFF', padding: 12, borderRadius: 8, marginBottom: 10, borderColor: '#ccc', borderWidth: 1 },
  ratingPickerContainer: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 6, color: '#4b2a78' },
  picker: { backgroundColor: '#fff', borderRadius: 8 },
  button: { backgroundColor: '#6A0DAD', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footerBox: { backgroundColor: '#E9D8FD', padding: 16, marginTop: 10 },
  footerTitle: { fontWeight: 'bold', color: '#6A0DAD', fontSize: 16, marginBottom: 6 },
  footerText: { color: '#4B5563' },
  footerLink: { color: '#8B5CF6', textDecorationLine: 'underline', marginTop: 6 },
});
