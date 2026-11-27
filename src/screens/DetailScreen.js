import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/config';
import {
  formatRelativeTime,
  getMagnitudeColor,
} from '../utils/earthquakeHelpers';

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

  const badgeColor = getMagnitudeColor(earthquake.mag);
  const relativeTime = formatRelativeTime(
    earthquake.date_time || earthquake.date
  );

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderTopColor: badgeColor }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{earthquake.title}</Text>
          <View style={[styles.magBadge, { backgroundColor: badgeColor }]}>
            <Text style={styles.magText}>
              {Number(earthquake.mag).toFixed(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.relativeTime}>
          ⏱ {relativeTime} ({earthquake.date_time || earthquake.date})
        </Text>
        <Text style={styles.row}>Derinlik (depth): {earthquake.depth} km</Text>
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
    borderTopWidth: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 12,
  },
  magBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  magText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  relativeTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
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
