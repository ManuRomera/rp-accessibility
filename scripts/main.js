import { registerSettings, getSetting, setSetting } from "./core/settings.js";
import { MODULE_ID, SETTINGS } from "./core/constants.js";
import { ThemeService } from "./services/theme-service.js";
import { ApplicationFocusService } from "./services/application-focus-service.js";
import { KeybindingService } from "./services/keybinding-service.js";
import { CanvasFilterService } from "./services/canvas-filter-service.js";
import { SmartImageService } from "./services/smart-image-service.js";
import { SheetSanitizerService } from "./services/sheet-sanitizer-service.js";
import { HudControlService } from "./services/hud-control-service.js";

Hooks.once("init", () => {
  registerSettings();
  KeybindingService.register();
  CanvasFilterService.init();
  console.log("RP Accessibility | Module initialized successfully.");
});

Hooks.once("ready", async () => {
  // Ensure module is enabled automatically if not explicitly set
  try {
    const isEnabled = getSetting(SETTINGS.ENABLED);
    if (!isEnabled) {
      await setSetting(SETTINGS.ENABLED, true);
    }
  } catch (err) {
    console.warn("RP Accessibility | Initializing setting force-enable:", err);
  }

  ThemeService.init();
  ApplicationFocusService.init();
  SmartImageService.init();
  SheetSanitizerService.init();
  HudControlService.init();
  CanvasFilterService.apply();
  console.log("RP Accessibility | All services ready & active.");
});

Hooks.on("canvasReady", () => {
  CanvasFilterService.apply();
  HudControlService.applyScreenFilter();
});

Hooks.on("renderApplication", (app) => {
  ApplicationFocusService.onRender(app);
});
