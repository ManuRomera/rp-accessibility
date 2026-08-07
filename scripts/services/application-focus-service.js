import { SETTINGS } from "../core/constants.js";
import { getSetting } from "../core/settings.js";
import { getAppElement, isExcludedApp } from "../utils/dom.js";

const centeredApps = new WeakSet();
let activeAppRef = null;
let lastAppRef = null;

export class ApplicationFocusService {
  static init() {
    document.addEventListener("pointerdown", this._onDocumentInteraction.bind(this), true);
    document.addEventListener("focusin", this._onDocumentInteraction.bind(this), true);
  }

  static onRender(app) {
    if (!getSetting(SETTINGS.ENABLED)) return;

    // Bring roll dialogs and new windows to top immediately above character sheets
    if (app && typeof app.bringToTop === "function") {
      try {
        app.bringToTop();
      } catch (e) {}
    }

    if (getSetting(SETTINGS.AUTO_CENTER_WINDOWS) && app && !app._rpCentered) {
      this.center(app);
    }

    if (getSetting(SETTINGS.FOCUS_HIGHLIGHT)) {
      this.focus(app);
    }
  }

  static center(app, force = false) {
    if (!app || isExcludedApp(app)) return;
    if (app._rpCentered && !force) return;

    // Only center if position is not manually established
    if (!force && app.position && (app.position.left !== undefined || app.position.top !== undefined)) {
      app._rpCentered = true;
      return;
    }

    const width = app.position?.width || 600;
    const height = app.position?.height || 700;

    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.9;

    const finalWidth = Math.min(width, maxW);
    const finalHeight = Math.min(height, maxH);

    const left = Math.max(8, Math.floor((window.innerWidth - finalWidth) / 2));
    const top = Math.max(8, Math.floor((window.innerHeight - finalHeight) / 2));

    if (typeof app.setPosition === "function") {
      app.setPosition({ left, top, width: finalWidth, height: finalHeight });
    }

    app._rpCentered = true;
    centeredApps.add(app);
  }

  static focus(target) {
    if (!getSetting(SETTINGS.ENABLED) || !getSetting(SETTINGS.FOCUS_HIGHLIGHT)) return;

    let el = null;
    if (target?.element) {
      el = getAppElement(target);
    } else if (target instanceof HTMLElement) {
      el = target.closest(".window-app");
    }

    if (!el) return;

    // Remove active class from all existing windows
    document.querySelectorAll(".rp-active-window").forEach(w => w.classList.remove("rp-active-window"));

    el.classList.add("rp-active-window");

    if (target !== activeAppRef) {
      lastAppRef = activeAppRef;
      activeAppRef = target;
    }
  }

  static focusActive() {
    if (activeAppRef && typeof activeAppRef.bringToTop === "function") {
      activeAppRef.bringToTop();
      this.center(activeAppRef, true);
    }
  }

  static focusLast() {
    if (lastAppRef && typeof lastAppRef.bringToTop === "function") {
      const temp = activeAppRef;
      activeAppRef = lastAppRef;
      lastAppRef = temp;
      activeAppRef.bringToTop();
      this.focus(activeAppRef);
    }
  }

  static _onDocumentInteraction(event) {
    const windowEl = event.target?.closest?.(".window-app");
    if (windowEl) {
      document.querySelectorAll(".rp-active-window").forEach(w => w.classList.remove("rp-active-window"));
      windowEl.classList.add("rp-active-window");
    }
  }
}
