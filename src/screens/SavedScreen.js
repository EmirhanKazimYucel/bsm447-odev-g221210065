import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/config';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kaydedilen Depremler</Text>
      <Text style={styles.info}>
        AsyncStorage ile kaydedilen depremler burada listelenecek.
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
