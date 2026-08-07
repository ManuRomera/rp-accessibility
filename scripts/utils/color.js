/**
 * Convierte un código hexadecimal (#RRGGBB o #RGB) a objeto RGB {r, g, b} (0..255).
 */
export function hexToRgb(hex) {
  let cleaned = hex.replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Calcula la luminancia relativa WCAG 2.1 de un color RGB.
 */
export function getLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calcula el ratio de contraste WCAG entre dos colores RGB o Hex.
 */
export function getContrastRatio(colorA, colorB) {
  const rgbA = typeof colorA === "string" ? hexToRgb(colorA) : colorA;
  const rgbB = typeof colorB === "string" ? hexToRgb(colorB) : colorB;
  if (!rgbA || !rgbB) return 1;

  const lumA = getLuminance(rgbA);
  const lumB = getLuminance(rgbB);
  const brighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (brighter + 0.05) / (darker + 0.05);
}
