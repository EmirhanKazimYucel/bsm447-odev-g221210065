import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, STUDENT_INFO } from '../constants/config';

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{STUDENT_INFO.topicTitle}</Text>
      <Text style={styles.subtitle}>Varyant: {STUDENT_INFO.variant}</Text>
      <Text style={styles.info}>
        Deprem listesi ve arama ekranı (Kandilli Rasathanesi API)
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
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
