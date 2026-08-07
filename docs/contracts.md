# Contratos de API Interna — rp-accessibility

Este documento define la interfaz pública de los servicios principales de `rp-accessibility`. Ningún servicio debe depender de la implementación interna de otro.

---

## 1. ThemeService

```javascript
/**
 * Inicializa el ThemeService cargando configuraciones y registrando hooks.
 */
ThemeService.init();

/**
 * Aplica el tema CSS según la configuración activa y perfil seleccionado.
 * @param {string} [profileName] - Nombre del perfil opcional (ej: 'rp-dark', 'rp-high-contrast', 'rp-amber').
 */
ThemeService.apply(profileName);

/**
 * Elimina las clases de tema y restaura los estilos globales.
 */
ThemeService.disable();
```

---

## 2. ApplicationFocusService

```javascript
/**
 * Inicializa los listeners de foco y MutationObservers de ventanas.
 */
ApplicationFocusService.init();

/**
 * Centra una aplicación popOut en el viewport si no ha sido centrada previamente.
 * @param {Application} app - Instancia de la aplicación de Foundry.
 * @param {boolean} [force=false] - Si es true, ignora la caché de auto-centrado.
 */
ApplicationFocusService.center(app, force);

/**
 * Establece la aplicación como la ventana activa visualmente (.rp-active-window).
 * @param {Application|HTMLElement} target - Aplicación o elemento HTML de la ventana.
 */
ApplicationFocusService.focus(target);

/**
 * Callback llamado en el Hook `renderApplication`.
 * @param {Application} app
 */
ApplicationFocusService.onRender(app);
```

---

## 3. CanvasFilterService

```javascript
/**
 * Inicializa la estructura del filtro PIXI. ColorMatrix.
 */
CanvasFilterService.init();

/**
 * Aplica los valores de brillo, contraste, saturación y modo ámbar al canvas de PIXI.
 */
CanvasFilterService.apply();

/**
 * Restaura los filtros del canvas a su estado original sin afectar otros módulos.
 */
CanvasFilterService.remove();
```

---

## 4. KeybindingService

```javascript
/**
 * Registra todos los keybindings en game.keybindings.
 */
KeybindingService.register();
```

---

## 5. SmartImageService

```javascript
/**
 * Inicializa MutationObserver y la caché de imágenes invertidas.
 */
SmartImageService.init();

/**
 * Escanea el contenedor HTML indicado buscando elementos <img> o fondos escaneados.
 * @param {HTMLElement} root
 */
SmartImageService.scan(root);

/**
 * Restaura todas las imágenes y fondos invertidos a su estado original.
 */
SmartImageService.restore();
```

---

## 6. Compat (Abstracción de Versión Foundry)

```javascript
/**
 * Obtiene el elemento DOM contenedor de una aplicación (v11/v12/v13).
 * @param {Application} app
 * @returns {HTMLElement|null}
 */
Compat.getApplicationElement(app);

/**
 * Obtiene la clase PIXI.ColorMatrixFilter según la versión del motor PIXI.
 * @returns {Function|null}
 */
Compat.getColorMatrixFilterClass();

/**
 * Devuelve los objetos contenedores del Canvas sobre los que aplicar el filtro.
 * @returns {Array<PIXI.Container>}
 */
Compat.getCanvasFilterTargets();
```
