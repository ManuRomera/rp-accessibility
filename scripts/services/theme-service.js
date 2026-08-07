import { SETTINGS } from "../core/constants.js";
import { getSetting } from "../core/settings.js";

export class ThemeService {
  static init() {
    Hooks.on("rpAccessibilityStateChanged", () => this.apply());
    Hooks.on("rpAccessibilityThemeChanged", () => this.apply());
    Hooks.on("rpAccessibilityProfileChanged", () => this.apply());

    this.apply();
  }

  static apply(profileOverride) {
    const enabled = getSetting(SETTINGS.ENABLED);
    const darkMatte = getSetting(SETTINGS.DARK_MATTE);
    const profile = profileOverride || getSetting(SETTINGS.PROFILE);

    const body = document.body;
    if (!body) return;

    if (!enabled || !darkMatte) {
      this.disable();
      return;
    }

    document.documentElement.classList.add("rp-accessibility-enabled");
    body.classList.add("rp-accessibility-enabled");
    
    // Clean existing profiles
    document.documentElement.classList.remove("rp-profile-dark", "rp-profile-high-contrast", "rp-profile-amber");
    body.classList.remove("rp-profile-dark", "rp-profile-high-contrast", "rp-profile-amber");
    
    const profClass = `rp-profile-${profile.replace("rp-", "")}`;
    document.documentElement.classList.add(profClass);
    body.classList.add(profClass);
  }

  static disable() {
    const body = document.body;
    document.documentElement.classList.remove(
      "rp-accessibility-enabled",
      "rp-profile-dark",
      "rp-profile-high-contrast",
      "rp-profile-amber"
    );
    if (body) {
      body.classList.remove(
        "rp-accessibility-enabled",
        "rp-profile-dark",
        "rp-profile-high-contrast",
        "rp-profile-amber"
      );
    }
  }

}
