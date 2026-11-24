import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/config';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyCard}>
        <Text style={styles.title}>Kaydedilen Depremler</Text>
        <Text style={styles.info}>
          Henüz kaydedilmiş bir deprem bulunmuyor. Detay ekranından kaydettiğiniz
          depremler uygulama kapatılıp açılsa bile burada görünecektir.
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
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
