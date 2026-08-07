# Matriz de Pruebas — rp-accessibility

## 1. Entornos de Pruebas

| Versión Foundry | Motores / Navegadores | Sistemas de Juego |
| --------------- | -------------------- | ----------------- |
| Foundry VTT v11 | Chrome / Firefox     | Simple World Building, dnd5e, pf2e, coc7 |
| Foundry VTT v12 | Chrome / Firefox     | Simple World Building, dnd5e, pf2e, coc7 |
| Foundry VTT v13 | Chrome / Firefox     | Simple World Building, dnd5e, pf2e |

---

## 2. Casos de Prueba Funcionales

| ID | Área | Descripción | Resultado Esperado |
| -- | ---- | ----------- | ------------------ |
| TC-01 | Theme | Activar tema "rp-dark" | Fondo mate oscuro `#11100E`, texto claro con contraste ≥ 15:1. |
| TC-02 | Theme | Desactivar módulo | Eliminación completa de clases en `body`, restauración de estilos nativos. |
| TC-03 | Focus | Abrir hoja de actor | Centrado de ventana en viewport (sin bucle al modificar HP). |
| TC-04 | Focus | Hacer clic en ventana inactiva | Cambia borde activo (`.rp-active-window`) a la ventana seleccionada. |
| TC-05 | Canvas | Modificar slider de brillo/contraste | Aplica matriz GPU sin llamar a `canvas.draw()` ni borrar otros filtros. |
| TC-06 | Keybindings | Presionar atajo de ficha propia | Abre/enfoca la ficha del usuario asignado sin usar ratón. |
| TC-07 | SmartImage | Cargar imagen de documento escaneado blanco | Detecta >55% blanco y luminancia >0.72; invierte únicamente el documento. |
| TC-08 | SmartImage | Cargar retrato/mapa/token | No invierte la imagen (falsos positivos = 0). |
