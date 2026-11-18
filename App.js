import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STUDENT_INFO } from './src/constants/config';
import ListScreen from './src/screens/ListScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {STUDENT_INFO.topicCode} · {STUDENT_INFO.topicTitle}
        </Text>
        <Text style={styles.headerSub}>
          Öğrenci No: {STUDENT_INFO.studentNo} | Ek Kural: {STUDENT_INFO.extraRule}
        </Text>
      </View>
      <ListScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
