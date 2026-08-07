import { SETTINGS } from "../core/constants.js";
import { getSetting } from "../core/settings.js";
import { Compat } from "../core/compat.js";

export class SheetSanitizerService {
  static init() {
    const handleRender = (app, html) => {
      this.sanitize(app, html);
      setTimeout(() => this.sanitize(app, html), 50);
      setTimeout(() => this.sanitize(app, html), 150);
      setTimeout(() => this.sanitize(app, html), 350);
      setTimeout(() => this.sanitize(app, html), 700);
    };

    Hooks.on("renderApplication", handleRender);
    Hooks.on("renderActorSheet", handleRender);
    Hooks.on("renderItemSheet", handleRender);
    Hooks.on("renderJournalSheet", handleRender);
    Hooks.on("renderJournalPageSheet", handleRender);
    Hooks.on("renderDialog", handleRender);
    Hooks.on("renderContextMenu", handleRender);

    setInterval(() => {
      if (getSetting(SETTINGS.ENABLED)) {
        document.querySelectorAll(".window-app.sheet, .sheet.actor, .sheet.item").forEach(win => {
          this.sanitizeWin(win);
        });
      }
    }, 500);
  }

  static sanitize(app, html) {
    if (!getSetting(SETTINGS.ENABLED)) return;

    const rawEl = Compat.getApplicationElement(app) || (html && html[0]);
    if (!rawEl || !(rawEl instanceof HTMLElement)) return;

    const sheetWin = rawEl.closest(".window-app.sheet, .window-app") || rawEl;
    this.sanitizeWin(sheetWin);
  }

  static sanitizeWin(sheetWin) {
    if (!sheetWin || !(sheetWin instanceof HTMLElement)) return;
    if (!sheetWin.classList.contains("sheet") && !sheetWin.classList.contains("window-app")) return;

    sheetWin.classList.add("rp-sheet-sanitized");

    let headStyle = document.head.querySelector("#rp-head-override-style");
    if (!headStyle) {
      headStyle = document.createElement("style");
      headStyle.id = "rp-head-override-style";
      document.head.appendChild(headStyle);
    } else {
      document.head.appendChild(headStyle);
    }

    headStyle.textContent = `
      .window-app.sheet {
        --dnd5e-color-parchment: #211e18 !important;
        --dnd5e-color-parchment-50: #211e18 !important;
        --dnd5e-color-card-background: #211e18 !important;
        --dnd5e-color-background: #181612 !important;
        --dnd5e-color-text-dark: #f5e6c8 !important;
        --dnd5e-color-text-light: #f5e6c8 !important;
        --dnd5e-color-gold: #ffd166 !important;
        --dnd5e-color-header-background: #181612 !important;
        --dnd5e-shadow-card: none !important;
      }

      .window-app.sheet,
      .window-app.sheet .window-content,
      .window-app.sheet form,
      .window-app.sheet .tab.details,
      .window-app.sheet [data-tab="details"] {
        background-color: #181612 !important;
        background-image: none !important;
        background: #181612 !important;
      }

      /* LAYOUT SCROLLING FIX FOR DETAILS TAB */
      .window-app.sheet .sheet-body,
      .window-app.sheet .middle,
      .window-app.sheet [data-tab="details"],
      .window-app.sheet .tab.details {
        overflow-y: auto !important;
        padding-bottom: 50px !important;
      }

      /* TOP 6 STAT SHIELDS */
      .window-app.sheet .ability,
      .window-app.sheet .ability-scores,
      .window-app.sheet [data-ability] {
        background-color: #211e18 !important;
        background-image: none !important;
        background: #211e18 !important;
        border: 1px solid #4a4235 !important;
      }

      .window-app.sheet .ability *,
      .window-app.sheet [data-ability] * {
        color: #ffd166 !important;
        text-shadow: none !important;
      }

      /* CARDS, SAVING THROWS & TOOLS CONTAINERS */
      .window-app.sheet fieldset,
      .window-app.sheet .card,
      .window-app.sheet [class*="card"],
      .window-app.sheet [class*="saving"],
      .window-app.sheet [class*="tool"],
      .window-app.sheet [class*="skill"],
      .window-app.sheet dnd5e-card,
      .window-app.sheet dnd5e-skills,
      .window-app.sheet dnd5e-saving-throws,
      .window-app.sheet dnd5e-tools {
        background-color: #211e18 !important;
        background-image: none !important;
        background: #211e18 !important;
        border-image-source: none !important;
        border-image-slice: 0 !important;
        border-image: none !important;
        mask: none !important;
        -webkit-mask: none !important;
        -webkit-mask-image: none !important;
        filter: none !important;
        border: 1px solid #4a4235 !important;
        color: #f5e6c8 !important;
        box-shadow: none !important;
      }

      .window-app.sheet fieldset::before,
      .window-app.sheet fieldset::after,
      .window-app.sheet .card::before,
      .window-app.sheet .card::after {
        display: none !important;
        content: none !important;
        background-image: none !important;
        background: transparent !important;
      }
    `;

    // Process all container elements inside sheet only
    const allContainers = sheetWin.querySelectorAll("div, section, article, fieldset, ol, ul, dnd5e-card, dnd5e-skills, dnd5e-saving-throws, dnd5e-tools, [class*='card'], [class*='skill'], [class*='saving'], [class*='tool']");
    allContainers.forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      if (node.tagName === "IMG" || node.classList.contains("profile") || node.classList.contains("portrait")) return;

      node.style.setProperty("--dnd5e-color-parchment", "#211e18", "important");
      node.style.setProperty("--dnd5e-color-card-background", "#211e18", "important");
      node.style.setProperty("background", "#211e18", "important");
      node.style.setProperty("background-color", "#211e18", "important");
      node.style.setProperty("background-image", "none", "important");
      node.style.setProperty("border-image", "none", "important");
      node.style.setProperty("border-image-source", "none", "important");
      node.style.setProperty("mask", "none", "important");
      node.style.setProperty("-webkit-mask", "none", "important");
      node.style.setProperty("-webkit-mask-image", "none", "important");
      node.style.setProperty("border-color", "#4a4235", "important");
      node.style.setProperty("color", "#f5e6c8", "important");
    });
  }
}
