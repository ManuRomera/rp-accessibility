export class Compat {
  /**
   * Obtiene la clase ColorMatrixFilter según la versión del runtime de PIXI.
   */
  static getColorMatrixFilterClass() {
    return globalThis.PIXI?.ColorMatrixFilter
        ?? globalThis.PIXI?.filters?.ColorMatrixFilter
        ?? null;
  }

  /**
   * Obtiene los contenedores objetivo del Canvas sobre los que aplicar el filtro GPU.
   * Evita 'interface' para no oscurecer herramientas ni UI del canvas.
   */
  static getCanvasFilterTargets() {
    if (typeof canvas === "undefined" || !canvas.ready) return [];

    const targets = [];
    if (canvas.primary) targets.push(canvas.primary);
    if (canvas.effects) targets.push(canvas.effects);

    if (targets.length === 0 && canvas.stage) {
      targets.push(canvas.stage);
    }

    return targets;
  }

  /**
   * Obtiene el elemento HTML contenedor de una aplicación (v11/v12/v13).
   */
  static getApplicationElement(app) {
    if (!app) return null;
    if (app.element instanceof HTMLElement) return app.element;
    if (app.element && app.element[0] instanceof HTMLElement) return app.element[0];
    if (typeof app._element?.get === "function") return app._element.get(0);
    return null;
  }
}
