import { COLORS } from '../constants/config';

/**
 * Konu Kartı K13 Özel Beklentisi:
 * Büyüklüğe (mag) göre renk döndürür:
 * < 3   -> Yeşil
 * 3-3.9 -> Turuncu
 * >= 4  -> Kırmızı
 */
export function getMagnitudeColor(mag) {
  const numericMag = Number(mag);
  if (numericMag >= 4) {
    return COLORS.magHigh; // Kırmızı (>= 4)
  }
  if (numericMag >= 3) {
    return COLORS.magMedium; // Turuncu (3 - 3.9)
  }
  return COLORS.magLow; // Yeşil (< 3)
}

/**
 * Konu Kartı K13 Özel Beklentisi:
 * Deprem tarih/saat bilgisini ("YYYY.MM.DD HH:mm:ss" veya "YYYY-MM-DD HH:mm:ss")
 * "12 dk önce", "3 saat önce" biçiminde göreli zamana çevirir.
 */
export function formatRelativeTime(dateTimeStr) {
  if (!dateTimeStr) {
    return 'Bilinmiyor';
  }

  // "2026.11.27 13:10:05" veya "2026-11-27 13:10:05" formatını standart ISO biçimine dönüştür
  const normalized = String(dateTimeStr)
    .trim()
    .replace(/\./g, '-')
    .replace(' ', 'T');

  const parsedDate = new Date(normalized);
  if (isNaN(parsedDate.getTime())) {
    return dateTimeStr;
  }

  const now = new Date();
  const diffMs = now.getTime() - parsedDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) {
    return '1 dk önce';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} dk önce`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} saat önce`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} gün önce`;
}
