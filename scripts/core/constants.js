export const MODULE_ID = "rp-accessibility";

export const SETTINGS = {
  ENABLED: "enabled",
  PROFILE: "profile",
  DARK_MATTE: "darkMatte",
  AMBER_MODE: "amberMode",
  AMBER_INTENSITY: "amberIntensity",
  CANVAS_BRIGHTNESS: "canvasBrightness",
  CANVAS_CONTRAST: "canvasContrast",
  CANVAS_SATURATION: "canvasSaturation",
  AUTO_CENTER_WINDOWS: "autoCenterWindows",
  FOCUS_HIGHLIGHT: "focusHighlight",
  SMART_IMAGE_INVERT: "smartImageInvert",
  SMART_BACKGROUND_INVERT: "smartBackgroundInvert"
};

export const DEFAULT_SETTINGS = {
  [SETTINGS.ENABLED]: true,
  [SETTINGS.PROFILE]: "rp-dark",
  [SETTINGS.DARK_MATTE]: true,
  [SETTINGS.AMBER_MODE]: false,
  [SETTINGS.AMBER_INTENSITY]: 0.30,
  [SETTINGS.CANVAS_BRIGHTNESS]: 0.75,
  [SETTINGS.CANVAS_CONTRAST]: 0.95,
  [SETTINGS.CANVAS_SATURATION]: 0.90,
  [SETTINGS.AUTO_CENTER_WINDOWS]: false,
  [SETTINGS.FOCUS_HIGHLIGHT]: true,
  [SETTINGS.SMART_IMAGE_INVERT]: true,
  [SETTINGS.SMART_BACKGROUND_INVERT]: false
};




export const EXCLUDED_FOCUS_TYPES = [
  "Sidebar",
  "Notifications",
  "Hotbar",
  "SceneControls",
  "PlayerList",
  "Pause",
  "HUD",
  "SceneNavigation"
];
