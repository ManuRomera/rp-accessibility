import { SETTINGS } from "../core/constants.js";
import { getSetting } from "../core/settings.js";
import { Compat } from "../core/compat.js";

const FILTER_FLAG = "__rpAccessibilityFilter";

export class CanvasFilterService {
  static _activeFilters = new Map();

  static init() {
    Hooks.on("rpAccessibilityStateChanged", () => this.apply());
    Hooks.on("rpAccessibilityCanvasFilterChanged", () => this.apply());
  }

  static apply() {
    const enabled = getSetting(SETTINGS.ENABLED);
    if (!enabled) {
      this.remove();
      return;
    }

    const FilterClass = Compat.getColorMatrixFilterClass();
    if (!FilterClass) return;

    const targets = Compat.getCanvasFilterTargets();
    if (!targets || targets.length === 0) return;

    const brightness = getSetting(SETTINGS.CANVAS_BRIGHTNESS);
    const contrast = getSetting(SETTINGS.CANVAS_CONTRAST);
    const saturation = getSetting(SETTINGS.CANVAS_SATURATION);
    const amberMode = getSetting(SETTINGS.AMBER_MODE);
    const amberIntensity = getSetting(SETTINGS.AMBER_INTENSITY);

    for (const target of targets) {
      let filter = this._activeFilters.get(target);

      if (!filter) {
        filter = new FilterClass();
        filter[FILTER_FLAG] = true;
        this._activeFilters.set(target, filter);

        const existing = target.filters || [];
        target.filters = [...existing.filter(f => !f[FILTER_FLAG]), filter];
      }

      // Reset matrix to identity
      filter.reset();

      // Apply brightness, contrast, saturation
      filter.brightness(brightness, false);
      filter.contrast(contrast, false);
      filter.saturate(saturation, false);

      // Apply Amber matrix tint if enabled
      if (amberMode && amberIntensity > 0) {
        this._applyAmberMatrix(filter, amberIntensity);
      }
    }
  }

  static remove() {
    const targets = Compat.getCanvasFilterTargets();
    for (const target of targets) {
      if (target.filters) {
        target.filters = target.filters.filter(f => !f[FILTER_FLAG]);
      }
    }
    this._activeFilters.clear();
  }

  /**
   * Interpola e inyecta la matriz del filtro ámbar en la matriz de la GPU.
   */
  static _applyAmberMatrix(filter, intensity) {
    const amberMatrix = [
      1.0, 0.0, 0.0, 0.0, 0.0,
      0.0, 0.85, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.45, 0.0, 0.0,
      0.0, 0.0, 0.0, 1.0, 0.0
    ];

    const currentMatrix = filter.matrix;
    const lerp = (a, b, t) => a + (b - a) * t;

    for (let i = 0; i < currentMatrix.length; i++) {
      currentMatrix[i] = lerp(currentMatrix[i], amberMatrix[i], intensity);
    }
  }
}
