import { MODULE_ID, SETTINGS } from "../core/constants.js";
import { getSetting, setSetting } from "../core/settings.js";
import { ApplicationFocusService } from "./application-focus-service.js";
import { CanvasFilterService } from "./canvas-filter-service.js";
import { ACCESSIBILITY_PROFILES } from "../profiles/accessibility-profiles.js";

export class KeybindingService {
  static register() {
    if (!game.keybindings) return;

    game.keybindings.register(MODULE_ID, "toggleAccessibility", {
      name: "RP_ACCESSIBILITY.KeyToggleAccessibility",
      editable: [{ key: "KeyA", modifiers: ["Alt"] }],
      onDown: () => {
        const current = getSetting(SETTINGS.ENABLED);
        setSetting(SETTINGS.ENABLED, !current);
        return true;
      }
    });

    game.keybindings.register(MODULE_ID, "openOwnCharacterSheet", {
      name: "RP_ACCESSIBILITY.KeyOpenOwnSheet",
      editable: [{ key: "KeyC", modifiers: ["Alt"] }],
      onDown: () => {
        const actor = game.user?.character;
        if (actor?.sheet) {
          actor.sheet.render(true, { focus: true });
        } else {
          ui.notifications?.warn("No tienes ningún personaje asignado a tu usuario.");
        }
        return true;
      }
    });

    game.keybindings.register(MODULE_ID, "centerActiveApplication", {
      name: "RP_ACCESSIBILITY.KeyCenterActiveApp",
      editable: [{ key: "KeyX", modifiers: ["Alt"] }],
      onDown: () => {
        ApplicationFocusService.focusActive();
        return true;
      }
    });

    game.keybindings.register(MODULE_ID, "focusLastApplication", {
      name: "RP_ACCESSIBILITY.KeyFocusLastApp",
      editable: [{ key: "KeyZ", modifiers: ["Alt"] }],
      onDown: () => {
        ApplicationFocusService.focusLast();
        return true;
      }
    });

    game.keybindings.register(MODULE_ID, "toggleCanvasFilter", {
      name: "RP_ACCESSIBILITY.KeyToggleCanvasFilter",
      editable: [{ key: "KeyF", modifiers: ["Alt"] }],
      onDown: () => {
        const current = getSetting(SETTINGS.AMBER_MODE);
        setSetting(SETTINGS.AMBER_MODE, !current);
        return true;
      }
    });

    game.keybindings.register(MODULE_ID, "cycleAccessibilityProfile", {
      name: "RP_ACCESSIBILITY.KeyCycleProfile",
      editable: [{ key: "KeyP", modifiers: ["Alt"] }],
      onDown: () => {
        const profiles = Object.keys(ACCESSIBILITY_PROFILES);
        const current = getSetting(SETTINGS.PROFILE);
        const currentIndex = profiles.indexOf(current);
        const nextIndex = (currentIndex + 1) % profiles.length;
        setSetting(SETTINGS.PROFILE, profiles[nextIndex]);
        return true;
      }
    });
  }
}
