import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import services from '../assets/data/services.json';
import imageMap from '../config/imageMapper';

export default function ServiceDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { serviceId } = route.params;

  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Hizmet bulunamadı</Text>
      </View>
    );
  }

  const imageKey = service.coverImage.split('/').pop();
  const imageSource = imageMap[imageKey];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.description}>{service.description}</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Randevu')}
          >
            <Text style={{ color: '#4b2a78', fontWeight: 'bold' }}>
              Ücretsiz Randevu
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={imageSource} style={styles.image} />
      </View>

      <View style={styles.details}>
        {service.details.map((detail, i) => (
          <View key={i} style={styles.detailBlock}>
            <Text style={styles.detailTitle}>{detail.title}</Text>
            {detail.text.split('\n').map((line, j) =>
              line.trim().startsWith('-') ||
              line.trim().startsWith('•') ||
              line.trim().startsWith('🔸') ||
              line.trim().startsWith('🔹') ? (
                <Text key={j} style={styles.bullet}>• {line.replace(/^[-•🔸🔹]\s?/, '')}</Text>
              ) : (
                <Text key={j} style={styles.paragraph}>{line}</Text>
              )
            )}
          </View>
        ))}
      </View>

      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Merak Edilenler</Text>
        {service.faq.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>❓ {item.question}</Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  hero: {
    flexDirection: 'row',
    backgroundColor: '#4b2a78',
    padding: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroText: {
    flex: 1,
    minWidth: 300,
    paddingRight: 10,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: { color: '#fff' },
  ctaButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  details: { padding: 20, backgroundColor: '#fff' },
  detailBlock: { marginBottom: 20 },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2a78',
    marginBottom: 8,
  },
  paragraph: { marginBottom: 6, color: '#333' },
  bullet: { marginLeft: 10, color: '#333' },
  faqSection: { padding: 20, backgroundColor: '#f4f1fb' },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2a78',
    marginBottom: 10,
  },
  faqItem: { marginBottom: 12 },
  faqQuestion: {
    fontWeight: '600',
    color: '#4b2a78',
    marginBottom: 4,
  },
  faqAnswer: { color: '#333' },
});
