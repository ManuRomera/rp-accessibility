# Registro de Cambios — rp-accessibility

## [1.0.3] - 2026-10-05

- Añadido el botón «Créditos» en los ajustes del paquete (Manu Romera · Digital RPG Design). No cambia el juego.

## [0.1.0] - 2026-08-07

### Añadido
- Arquitectura modular client-side desacoplada compatible con Foundry VTT v11, v12 y v13.
- `ThemeService`: Tema global mate anti-deslumbramiento con contraste WCAG AAA (≥ 15:1) y perfiles `rp-dark`, `rp-high-contrast` y `rp-amber`.
- `ApplicationFocusService`: Auto-centrado inteligente de ventanas emergentes (evitando bucles de re-renderizado) y resaltado neón de ventana activa (`.rp-active-window`) para visión en túnel.
- `CanvasFilterService`: Filtrado por GPU mediante `PIXI.ColorMatrixFilter` para brillo, contraste, saturación y modo ámbar sin sobreescribir otros filtros ni llamar a `canvas.draw()`.
- `KeybindingService`: Atajos de teclado nativos configurables mediante `game.keybindings`.
- `SmartImageService` & `image-analysis.js`: Algoritmo de clasificación y muestreo offscreen 48x48 para invertir páginas escaneadas/blancas preservando retratos, ilustraciones y mapas.
- `Compat`: Capa de compatibilidad genérica para APIs de Foundry v11/v12/v13.
- Tests unitarios Node.js para color e inversión de imágenes.
