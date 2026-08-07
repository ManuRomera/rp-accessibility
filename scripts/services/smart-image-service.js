import { SETTINGS } from "../core/constants.js";
import { getSetting } from "../core/settings.js";
import { analyzeImage } from "../utils/image-analysis.js";

export class SmartImageService {
  static _observer = null;

  static init() {
    Hooks.on("rpAccessibilityStateChanged", () => this.update());
    Hooks.on("rpAccessibilitySmartImageChanged", () => this.update());

    this.update();
  }

  static update() {
    const enabled = getSetting(SETTINGS.ENABLED);
    const smartInvert = getSetting(SETTINGS.SMART_IMAGE_INVERT);

    if (!enabled || !smartInvert) {
      this.restore();
      return;
    }

    this.scan(document.body);
    this._startObserver();
  }

  static async scan(root) {
    if (!root) return;

    const images = Array.from(root.querySelectorAll("img"));
    for (const img of images) {
      if (img.hasAttribute("data-rp-no-invert")) continue;
      if (img.hasAttribute("data-rp-force-invert")) {
        img.classList.add("rp-smart-invert");
        continue;
      }

      const { scanned } = await analyzeImage(img);
      if (scanned) {
        img.classList.add("rp-smart-invert");
      } else {
        img.classList.remove("rp-smart-invert");
      }
    }
  }

  static restore() {
    this._stopObserver();
    document.querySelectorAll(".rp-smart-invert").forEach(img => {
      img.classList.remove("rp-smart-invert");
    });
  }

  static _startObserver() {
    if (this._observer) return;

    const scheduleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));

    this._observer = new MutationObserver((mutations) => {
      scheduleCallback(() => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              this.scan(node);
            }
          }
        }
      });
    });

    this._observer.observe(document.body, { childList: true, subtree: true });
  }

  static _stopObserver() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
}
