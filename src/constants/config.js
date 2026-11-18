// BSM447 Mobil Uygulama Geliştirme - Dönem Ödevi Sabitleri
// Öğrenci No: G221210065
// Konu: K13 - Deprem İzleyici (Kandilli Rasathanesi)
// Varyant: c - Derinliği <= 10 km
// Ek Kural: 6 - 10'ar 10'ar gösterme

export const STUDENT_INFO = {
  studentNo: 'G221210065',
  topicCode: 'K13',
  topicTitle: 'Deprem İzleyici',
  variant: 'c · Derinliği ≤ 10 km',
  extraRule: "6 · 10'ar 10'ar gösterme",
};

export const API_ENDPOINTS = {
  // Ana API: Kandilli Rasathanesi canlı deprem verisi
  KANDILLI_LIVE: 'https://api.orhanaydogdu.com.tr/deprem/kandilli/live',
  // Yedek API: USGS (Ana API çalışmazsa kullanılacak)
  USGS_FALLBACK:
    'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=35.8&maxlatitude=42.2&minlongitude=25.6&maxlongitude=44.9&minmagnitude=2.5&starttime=2025-01-01&orderby=time&limit=50',
};

export const COLORS = {
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  primary: '#2563EB',
  border: '#E2E8F0',
  // Konuya özel beklenti: Büyüklüğe (mag) göre renkler
  magLow: '#16A34A', // < 3 Yeşil
  magMedium: '#EA580C', // 3 - 3.9 Turuncu
  magHigh: '#DC2626', // >= 4 Kırmızı
};
