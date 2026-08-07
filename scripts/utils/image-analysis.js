import { getLuminance } from "./color.js";

const ANALYSIS_CACHE = new Map();

/**
 * Analiza una imagen mediante un Offscreen Canvas 48x48 y determina si es un documento escaneado/blanco.
 * @param {HTMLImageElement|string} imageOrUrl
 * @returns {Promise<{ scanned: boolean, luminance: number, whiteRatio: number }>}
 */
export async function analyzeImage(imageOrUrl) {
  const src = typeof imageOrUrl === "string" ? imageOrUrl : imageOrUrl.src;
  if (!src) return { scanned: false, luminance: 0, whiteRatio: 0 };

  if (ANALYSIS_CACHE.has(src)) {
    return ANALYSIS_CACHE.get(src);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Exclusiones de tamaño mínimo
      if (img.naturalWidth < 320 || img.naturalHeight < 240) {
        const res = { scanned: false, luminance: 0, whiteRatio: 0 };
        ANALYSIS_CACHE.set(src, res);
        return resolve(res);
      }

      const canvas = document.createElement("canvas");
      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        const res = { scanned: false, luminance: 0, whiteRatio: 0 };
        ANALYSIS_CACHE.set(src, res);
        return resolve(res);
      }

      ctx.drawImage(img, 0, 0, 48, 48);
      const imgData = ctx.getImageData(0, 0, 48, 48);
      const data = imgData.data;

      let totalLum = 0;
      let whitePixels = 0;
      let lowSatPixels = 0;
      const totalPixels = 48 * 48;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const lum = getLuminance({ r, g, b });
        totalLum += lum;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;

        if (lum > 0.82 && sat < 0.20) {
          whitePixels++;
        }
        if (sat < 0.25) {
          lowSatPixels++;
        }
      }

      const averageLuminance = totalLum / totalPixels;
      const whitePixelRatio = whitePixels / totalPixels;
      const lowSaturationRatio = lowSatPixels / totalPixels;

      const scanned = averageLuminance > 0.72 && whitePixelRatio > 0.55 && lowSaturationRatio > 0.60;
      const result = { scanned, luminance: averageLuminance, whiteRatio: whitePixelRatio };

      ANALYSIS_CACHE.set(src, result);
      resolve(result);
    };

    img.onerror = () => {
      const res = { scanned: false, luminance: 0, whiteRatio: 0 };
      ANALYSIS_CACHE.set(src, res);
      resolve(res);
    };

    img.src = src;
  });
}
