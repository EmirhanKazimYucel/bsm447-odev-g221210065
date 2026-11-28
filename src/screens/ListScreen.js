import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_ENDPOINTS, COLORS, STUDENT_INFO } from '../constants/config';
import {
  formatRelativeTime,
  getMagnitudeColor,
} from '../utils/earthquakeHelpers';

// Ana API (Kandilli) yanıt vermezse yedek USGS verisini aynı veri yapısına dönüştürür
function normalizeUsgsFeatures(features = []) {
  return features.map((item) => {
    const coords = item.geometry?.coordinates || [0, 0, 0];
    const dateObj = item.properties?.time
      ? new Date(item.properties.time)
      : new Date();
    const formattedDate = dateObj
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);

    return {
      earthquake_id: String(item.id || Math.random()),
      title: item.properties?.place || 'Türkiye Çevresi',
      mag: Number(item.properties?.mag || 0),
      depth: Number(coords[2] || 0),
      date_time: formattedDate,
      geojson: {
        coordinates: [coords[0], coords[1]],
      },
      location_properties: {
        closestCity: {
          name: item.properties?.place || 'Belirtilmemiş',
        },
      },
    };
  });
}

export default function ListScreen({ navigation }) {
  const [earthquakes, setEarthquakes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_ENDPOINTS.KANDILLI_LIVE);
      if (!response.ok) {
        throw new Error('Kandilli API yanıt vermedi');
      }

      const json = await response.json();
      const rawList = Array.isArray(json.result) ? json.result : [];

      // Varyant c süzmesi: Yalnızca derinliği 10 km ve altında olanlar (depth <= 10)
      const filteredByDepth = rawList.filter(
        (item) => Number(item.depth) <= 10
      );

      setEarthquakes(filteredByDepth);
    } catch (primaryErr) {
      try {
        // Ana servis çalışmazsa dokümanda belirtilen yedek USGS servisini dene
        const fallbackRes = await fetch(API_ENDPOINTS.USGS_FALLBACK);
        const fallbackJson = await fallbackRes.json();
        const normalized = normalizeUsgsFeatures(fallbackJson.features);
        const filteredByDepth = normalized.filter(
          (item) => Number(item.depth) <= 10
        );
        setEarthquakes(filteredByDepth);
      } catch (fallbackErr) {
        setError('Deprem verileri alınırken bağlantı hatası oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  // Büyük/küçük harfe duyarsız arama süzmesi (title alanına göre)
  const filteredEarthquakes = earthquakes.filter((item) => {
    if (!searchQuery.trim()) {
      return true;
    }
    const queryLower = searchQuery.trim().toLocaleLowerCase('tr-TR');
    const titleLower = String(item.title || '').toLocaleLowerCase('tr-TR');
    return titleLower.includes(queryLower);
  });

  const renderItem = ({ item }) => {
    const badgeColor = getMagnitudeColor(item.mag);
    const relativeTime = formatRelativeTime(item.date_time || item.date);

    return (
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: badgeColor }]}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Detay', { earthquake: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.magBadge, { backgroundColor: badgeColor }]}>
            <Text style={styles.magText}>{Number(item.mag).toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardRelativeTime}>⏱ {relativeTime}</Text>
          <Text style={styles.cardDate}>{item.date_time || item.date}</Text>
          <Text style={styles.cardDepth}>Derinlik: {item.depth} km</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.statusText}>Deprem verileri yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEarthquakes}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          {STUDENT_INFO.topicCode} · {STUDENT_INFO.topicTitle}
        </Text>
        <Text style={styles.bannerSub}>
          Varyant: {STUDENT_INFO.variant} ({filteredEarthquakes.length} kayıt)
        </Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: COLORS.magLow }]}
            />
            <Text style={styles.legendText}>{'< 3 Yeşil'}</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: COLORS.magMedium }]}
            />
            <Text style={styles.legendText}>3–3.9 Turuncu</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: COLORS.magHigh }]}
            />
            <Text style={styles.legendText}>{'≥ 4 Kırmızı'}</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Deprem bölgesi veya şehir ara..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <FlatList
        data={filteredEarthquakes}
        keyExtractor={(item) => String(item.earthquake_id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptySearchContainer}>
            <Text style={styles.emptySearchText}>
              Aramanızla eşleşen deprem kaydı bulunamadı.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusText: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: 15,
    color: COLORS.magHigh,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  banner: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  bannerSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 5,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 10,
  },
  magBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 46,
    alignItems: 'center',
  },
  magText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRelativeTime: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardDepth: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  emptySearchContainer: {
    paddingVertical: 36,
    alignItems: 'center',
  },
  emptySearchText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
