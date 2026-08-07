# Guía de Diseño de Accesibilidad — RP Accessibility

## 1. Contexto de Usuario: Retinitis Pigmentosa y Baja Visión

La Retinitis Pigmentosa (RP) causa la pérdida progresiva de la visión periférica (visión en túnel), mayor sensibilidad al deslumbramiento (fotofobia), adaptación deficiente a la oscuridad/luz y pérdida de sensibilidad al contraste.

### Principios de diseño clave:
1. **Fondo Mate Anti-deslumbramiento**: Reducción drástica del blanco puro (`#FFFFFF`) reemplazándolo por tonos profundos mate como `#11100E` o `#181612`.
2. **Contraste de Texto Elevado (WCAG AAA)**: Mínimo 7:1 para texto normal. Usamos `#F5E6C8` (crema cálido) y `#FFD166` (ámbar vivo) sobre fondos mate.
3. **Visión en Túnel y Resaltado Foveal**: Enfoque de ventanas activas con bordes neón (`#8EE3FF`) y auto-centrado en el centro visual para evitar movimientos bruscos de cabeza u ojos al buscar fichas abiertas.
4. **Respeto a las Ilustraciones del Juego**: Los mapas, fichas de tokens y retratos de personajes no deben sufrir alteración de color o inversión no deseada. Únicamente se deben invertir fondos de hojas de texto escaneadas en blanco.
