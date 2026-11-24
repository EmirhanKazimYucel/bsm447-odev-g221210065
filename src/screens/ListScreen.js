import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, STUDENT_INFO } from '../constants/config';

// Navigasyon testi için örnek deprem kaydı (3. günde canlı Kandilli API verisiyle değiştirilecek)
const SAMPLE_EARTHQUAKE = {
  earthquake_id: 'sample-k13-1',
  title: 'KUSADASI KORFEZI (EGE DENIZI)',
  mag: 3.4,
  depth: 7.2,
  date_time: '2026-11-24 12:30:00',
  geojson: {
    coordinates: [27.1452, 37.8621],
  },
  location_properties: {
    closestCity: {
      name: 'Aydın',
    },
  },
};

export default function ListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          {STUDENT_INFO.topicCode} · {STUDENT_INFO.topicTitle}
        </Text>
        <Text style={styles.bannerSub}>
          Varyant: {STUDENT_INFO.variant} | Ek Kural: {STUDENT_INFO.extraRule}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{SAMPLE_EARTHQUAKE.title}</Text>
        <Text style={styles.cardMeta}>
          Büyüklük: {SAMPLE_EARTHQUAKE.mag} | Derinlik: {SAMPLE_EARTHQUAKE.depth} km
        </Text>
        <Text style={styles.cardDate}>{SAMPLE_EARTHQUAKE.date_time}</Text>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={() =>
            navigation.navigate('Detay', { earthquake: SAMPLE_EARTHQUAKE })
          }
        >
          <Text style={styles.detailButtonText}>
            Detay Ekranına Git (route.params testi)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  banner: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  bannerSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  detailButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
