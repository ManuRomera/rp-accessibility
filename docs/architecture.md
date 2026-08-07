# Arquitectura — rp-accessibility

## 1. Visión general

`rp-accessibility` es un módulo estrictamente client-side para Foundry VTT (v11, v12 y v13) diseñado para mejorar la accesibilidad visual de jugadores con baja visión y Retinitis Pigmentosa.

El módulo no modifica documentos del juego, no altera permanentemente fichas, no requiere módulos externos ni realiza peticiones a servidores de terceros. Todo cambio visual es reversible en tiempo real sin recargar la página.

---

## 2. Estructura por Capas

```
┌──────────────────────────────────────────────────────────┐
│                   Foundry DOM / Window                   │
├──────────────────┬──────────────────────┬────────────────┤
│  ThemeService    │ ApplicationFocus     │ SmartImage     │
│  (CSS Mate/AAA)  │ Service (Centrado)   │ Service        │
└──────────────────┴──────────────────────┴────────────────┘
┌──────────────────────────────────────────────────────────┐
│                  Foundry Canvas / PIXI                   │
├──────────────────────────────────────────────────────────┤
│                  CanvasFilterService                     │
│               (ColorMatrix GPU Filtering)                │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│                   Foundry Core API                       │
├──────────────────┬──────────────────────┬────────────────┤
│ KeybindingService│ game.settings        │ Hooks / Compat │
└──────────────────┴──────────────────────┴────────────────┘
```

---

## 3. Servicios Principales y Contratos

1. **`ThemeService`**: Gestiona la inyección de clases CSS globales en `document.body` y aplica variables con ratios de contraste WCAG AAA (≥ 7:1) sin romper hojas de personajes personalizadas.
2. **`ApplicationFocusService`**: Gestiona el auto-centrado de ventanas `popOut` de Foundry (evitando re-renders continuos) y aplica un resaltado de alto contraste a la ventana activa (`.rp-active-window`) para usuarios con visión en túnel.
3. **`CanvasFilterService`**: Aplica un filtro de GPU mediante `PIXI.ColorMatrixFilter` sobre el mapa/escena para ajustar brillo, contraste, saturación y modo ámbar sin sobreescribir otros filtros existentes de Foundry ni ejecutar `canvas.draw()`.
4. **`KeybindingService`**: Registra atajos de teclado nativos en `game.keybindings` para activar/desactivar el módulo, centrar la ventana activa, enfocar la ficha del personaje propio y alternar perfiles sin ratón.
5. **`SmartImageService`**: Analiza imágenes y fondos mediante muestreo offscreen canvas de 48x48. Detecta automáticamente documentos claros o escaneados e invierte su esquema de color sin alterar retratos, tokens, mapas ni ilustraciones.
6. **`Compat`**: Capa de abstracción para neutralizar diferencias de API entre Foundry v11, v12 y v13 (ubicación de `ColorMatrixFilter`, métodos de DOM de `Application`, etc.).

---

## 4. Reversibilidad

Al desactivar el módulo (`game.settings.set("rp-accessibility", "enabled", false)`):
- Se eliminan las clases CSS del `body`.
- Se remueve la clase `.rp-active-window` y los observadores de ventanas.
- Se eliminan únicamente los filtros de PIXI insertados por el módulo en el Canvas.
- Se restauran los fondos y las clases de imágenes invertidas, liberando URLs de blobs offscreen.
