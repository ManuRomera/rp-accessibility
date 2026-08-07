/**
 * Extrae el elemento DOM raíz de una aplicación de Foundry VTT.
 */
export function getAppElement(app) {
  if (!app) return null;
  if (app.element instanceof HTMLElement) return app.element;
  if (app.element && app.element[0] instanceof HTMLElement) return app.element[0];
  if (typeof app._element?.get === "function") return app._element.get(0);
  return null;
}

/**
 * Comprueba si un elemento o ventana de Foundry está en la lista de exclusión.
 */
export function isExcludedApp(app) {
  if (!app) return true;
  if (!app.popOut) return true;
  const name = app.constructor?.name || "";
  const title = app.options?.title || "";
  
  const excludedNames = [
    "Sidebar", "Notifications", "Hotbar", "SceneControls",
    "PlayerList", "Pause", "HUD", "SceneNavigation", "ChatLog"
  ];

  return excludedNames.some(ex => name.includes(ex) || title.includes(ex));
}
