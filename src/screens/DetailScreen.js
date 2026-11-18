import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/config';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deprem Detayı</Text>
      <Text style={styles.info}>
        Seçilen depremin derinlik, koordinat ve en yakın şehir bilgileri burada gösterilecek.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
