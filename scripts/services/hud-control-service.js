import { SETTINGS } from "../core/constants.js";
import { getSetting, setSetting } from "../core/settings.js";

export class HudControlService {
  static _hudElement = null;
  static _panelElement = null;
  static _screenOverlayElement = null;

  static init() {
    Hooks.on("ready", () => {
      this._createScreenOverlay();
      this.renderHudButton();
      this.applyScreenFilter();
    });

    Hooks.on("getSceneControlButtons", (controls) => {
      if (!getSetting(SETTINGS.ENABLED)) return;

      const tokenControl = controls.find(c => c.name === "token") || controls[0];
      if (tokenControl && tokenControl.tools) {
        tokenControl.tools.push({
          name: "rp-nd-filter",
          title: "Filtro ND / Brillo Pantalla",
          icon: "fas fa-eye-slash",
          button: true,
          onClick: () => this.togglePanel()
        });
      }
    });

    Hooks.on("rpAccessibilityStateChanged", () => {
      this.renderHudButton();
      this.applyScreenFilter();
    });

    Hooks.on("rpAccessibilityCanvasFilterChanged", () => {
      this.applyScreenFilter();
    });
  }

  static _createScreenOverlay() {
    if (document.getElementById("rp-screen-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "rp-screen-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "90"; // Under dialogs, over canvas
    overlay.style.transition = "background-color 0.2s ease";
    document.body.appendChild(overlay);

    this._screenOverlayElement = overlay;
  }

  static applyScreenFilter() {
    if (!getSetting(SETTINGS.ENABLED)) {
      if (this._screenOverlayElement) {
        this._screenOverlayElement.style.backgroundColor = "transparent";
      }
      return;
    }

    const brightness = getSetting(SETTINGS.CANVAS_BRIGHTNESS) ?? 0.75;
    const board = document.getElementById("board") || document.querySelector("canvas");

    if (board) {
      board.style.setProperty("filter", `brightness(${brightness}) contrast(0.95) saturate(0.90)`, "important");
    }

    if (this._screenOverlayElement) {
      if (brightness < 0.85) {
        const opacity = (0.85 - brightness) * 0.7;
        this._screenOverlayElement.style.backgroundColor = `rgba(0, 0, 0, ${opacity.toFixed(2)})`;
      } else {
        this._screenOverlayElement.style.backgroundColor = "transparent";
      }
    }
  }

  static renderHudButton() {
    const existing = document.getElementById("rp-hud-control-btn");
    if (existing) existing.remove();

    if (!getSetting(SETTINGS.ENABLED)) return;

    const btn = document.createElement("div");
    btn.id = "rp-hud-control-btn";
    btn.className = "rp-hud-btn";
    btn.title = "Ajuste Rápido de Filtro Anti-Deslumbramiento ND (RP Accessibility)";
    btn.innerHTML = `<i class="fas fa-eye-slash"></i> <span>Filtro ND</span>`;

    btn.style.position = "fixed";
    btn.style.top = "12px";
    btn.style.left = "280px";
    btn.style.zIndex = "10000";

    btn.addEventListener("click", () => this.togglePanel());

    document.body.appendChild(btn);
    this._hudElement = btn;
  }

  static togglePanel() {
    const existing = document.getElementById("rp-hud-control-panel");
    if (existing) {
      existing.remove();
      this._panelElement = null;
      return;
    }

    const brightness = getSetting(SETTINGS.CANVAS_BRIGHTNESS) ?? 0.75;

    const panel = document.createElement("div");
    panel.id = "rp-hud-control-panel";
    panel.className = "rp-hud-panel";
    panel.style.position = "fixed";
    panel.style.top = "50px";
    panel.style.left = "280px";
    panel.style.zIndex = "10001";

    panel.innerHTML = `
      <div class="rp-hud-header">
        <span><i class="fas fa-sliders-h"></i> Filtro Anti-Deslumbramiento ND</span>
        <button type="button" class="rp-hud-close" id="rp-hud-close">&times;</button>
      </div>
      <div class="rp-hud-body">
        <label>Brillo General (Filtro ND): <b id="rp-brightness-val">${Math.round(brightness * 100)}%</b></label>
        <input type="range" id="rp-brightness-range" min="0.30" max="1.00" step="0.05" value="${brightness}">
        
        <div class="rp-hud-presets">
          <button type="button" class="rp-preset-btn" data-val="0.90">Normal (90%)</button>
          <button type="button" class="rp-preset-btn" data-val="0.75">ND Suave (75%)</button>
          <button type="button" class="rp-preset-btn" data-val="0.50">ND Oscuro (50%)</button>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
    this._panelElement = panel;

    panel.querySelector("#rp-hud-close").addEventListener("click", () => panel.remove());

    const rangeInput = panel.querySelector("#rp-brightness-range");
    const valDisplay = panel.querySelector("#rp-brightness-val");

    rangeInput.addEventListener("input", async (e) => {
      const val = parseFloat(e.target.value);
      valDisplay.textContent = `${Math.round(val * 100)}%`;
      await setSetting(SETTINGS.CANVAS_BRIGHTNESS, val);
      Hooks.callAll("rpAccessibilityCanvasFilterChanged");
    });

    panel.querySelectorAll(".rp-preset-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const val = parseFloat(e.target.getAttribute("data-val"));
        rangeInput.value = val;
        valDisplay.textContent = `${Math.round(val * 100)}%`;
        await setSetting(SETTINGS.CANVAS_BRIGHTNESS, val);
        Hooks.callAll("rpAccessibilityCanvasFilterChanged");
      });
    });
  }
}
