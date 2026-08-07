import { MODULE_ID, SETTINGS, DEFAULT_SETTINGS } from "./constants.js";
import { ACCESSIBILITY_PROFILES } from "../profiles/accessibility-profiles.js";

export function registerSettings() {
  game.settings.register(MODULE_ID, SETTINGS.ENABLED, {
    name: "RP_ACCESSIBILITY.SettingsEnabledName",
    hint: "RP_ACCESSIBILITY.SettingsEnabledHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.ENABLED],
    onChange: value => {
      Hooks.callAll("rpAccessibilityStateChanged", { enabled: value });
    }
  });

  game.settings.register(MODULE_ID, SETTINGS.PROFILE, {
    name: "RP_ACCESSIBILITY.SettingsProfileName",
    hint: "RP_ACCESSIBILITY.SettingsProfileHint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      "rp-dark": "RP_ACCESSIBILITY.ProfileRpDark",
      "rp-high-contrast": "RP_ACCESSIBILITY.ProfileHighContrast",
      "rp-amber": "RP_ACCESSIBILITY.ProfileAmber"
    },
    default: DEFAULT_SETTINGS[SETTINGS.PROFILE],
    onChange: value => {
      applyProfileSettings(value);
      Hooks.callAll("rpAccessibilityProfileChanged", { profile: value });
    }
  });

  game.settings.register(MODULE_ID, SETTINGS.DARK_MATTE, {
    name: "RP_ACCESSIBILITY.SettingsDarkMatteName",
    hint: "RP_ACCESSIBILITY.SettingsDarkMatteHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.DARK_MATTE],
    onChange: () => Hooks.callAll("rpAccessibilityThemeChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.AMBER_MODE, {
    name: "RP_ACCESSIBILITY.SettingsAmberModeName",
    hint: "RP_ACCESSIBILITY.SettingsAmberModeHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.AMBER_MODE],
    onChange: () => Hooks.callAll("rpAccessibilityCanvasFilterChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.AMBER_INTENSITY, {
    name: "RP_ACCESSIBILITY.SettingsAmberIntensityName",
    hint: "RP_ACCESSIBILITY.SettingsAmberIntensityHint",
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0.0, max: 1.0, step: 0.05 },
    default: DEFAULT_SETTINGS[SETTINGS.AMBER_INTENSITY],
    onChange: () => Hooks.callAll("rpAccessibilityCanvasFilterChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.CANVAS_BRIGHTNESS, {
    name: "RP_ACCESSIBILITY.SettingsCanvasBrightnessName",
    hint: "RP_ACCESSIBILITY.SettingsCanvasBrightnessHint",
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0.30, max: 1.00, step: 0.05 },
    default: DEFAULT_SETTINGS[SETTINGS.CANVAS_BRIGHTNESS],
    onChange: () => Hooks.callAll("rpAccessibilityCanvasFilterChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.CANVAS_CONTRAST, {
    name: "RP_ACCESSIBILITY.SettingsCanvasContrastName",
    hint: "RP_ACCESSIBILITY.SettingsCanvasContrastHint",
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0.80, max: 2.00, step: 0.05 },
    default: DEFAULT_SETTINGS[SETTINGS.CANVAS_CONTRAST],
    onChange: () => Hooks.callAll("rpAccessibilityCanvasFilterChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.CANVAS_SATURATION, {
    name: "RP_ACCESSIBILITY.SettingsCanvasSaturationName",
    hint: "RP_ACCESSIBILITY.SettingsCanvasSaturationHint",
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0.0, max: 1.0, step: 0.05 },
    default: DEFAULT_SETTINGS[SETTINGS.CANVAS_SATURATION],
    onChange: () => Hooks.callAll("rpAccessibilityCanvasFilterChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.AUTO_CENTER_WINDOWS, {
    name: "RP_ACCESSIBILITY.SettingsAutoCenterName",
    hint: "RP_ACCESSIBILITY.SettingsAutoCenterHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.AUTO_CENTER_WINDOWS]
  });

  game.settings.register(MODULE_ID, SETTINGS.FOCUS_HIGHLIGHT, {
    name: "RP_ACCESSIBILITY.SettingsFocusHighlightName",
    hint: "RP_ACCESSIBILITY.SettingsFocusHighlightHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.FOCUS_HIGHLIGHT]
  });

  game.settings.register(MODULE_ID, SETTINGS.SMART_IMAGE_INVERT, {
    name: "RP_ACCESSIBILITY.SettingsSmartImageInvertName",
    hint: "RP_ACCESSIBILITY.SettingsSmartImageInvertHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.SMART_IMAGE_INVERT],
    onChange: () => Hooks.callAll("rpAccessibilitySmartImageChanged")
  });

  game.settings.register(MODULE_ID, SETTINGS.SMART_BACKGROUND_INVERT, {
    name: "RP_ACCESSIBILITY.SettingsSmartBackgroundInvertName",
    hint: "RP_ACCESSIBILITY.SettingsSmartBackgroundInvertHint",
    scope: "client",
    config: true,
    type: Boolean,
    default: DEFAULT_SETTINGS[SETTINGS.SMART_BACKGROUND_INVERT],
    onChange: () => Hooks.callAll("rpAccessibilitySmartImageChanged")
  });
}

export function getSetting(key) {
  return game.settings.get(MODULE_ID, key);
}

export async function setSetting(key, value) {
  return game.settings.set(MODULE_ID, key, value);
}

async function applyProfileSettings(profileKey) {
  const profile = ACCESSIBILITY_PROFILES[profileKey];
  if (!profile) return;

  for (const [key, val] of Object.entries(profile.settings)) {
    await setSetting(key, val);
  }
}
