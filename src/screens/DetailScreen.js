import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/config';

export default function DetailScreen({ route }) {
  // Seçilen deprem kaydı navigasyon parametresiyle (route.params) alınır
  const { earthquake } = route.params || {};

  if (!earthquake) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Deprem kaydı bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{earthquake.title}</Text>
        <Text style={styles.row}>Büyüklük (mag): {earthquake.mag}</Text>
        <Text style={styles.row}>Derinlik (depth): {earthquake.depth} km</Text>
        <Text style={styles.row}>Tarih / Saat: {earthquake.date_time}</Text>
        <Text style={styles.row}>
          En Yakın Şehir:{' '}
          {earthquake.location_properties?.closestCity?.name || 'Belirtilmemiş'}
        </Text>
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
  card: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  row: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
