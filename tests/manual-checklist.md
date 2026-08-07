# Lista de Verificación Manual — RP Accessibility

## 1. Verificación de Invasión y Reversibilidad
- [ ] Activar el módulo desde la configuración de Foundry.
- [ ] Verificar que `document.body` añade la clase `rp-accessibility-enabled`.
- [ ] Desactivar el módulo desde la configuración.
- [ ] Confirmar que no quedan clases `rp-*` ni filtros en la GPU del Canvas.

## 2. Verificación de Auto-centrado y Visión en Túnel
- [ ] Abrir la hoja de personaje (ActorSheet).
- [ ] Comprobar que se posiciona en el centro del viewport con margen de seguridad.
- [ ] Modificar los Puntos de Vida (HP) del personaje y verificar que la ficha **NO** vuelve a saltar al centro (evitando bucles de re-renderizado).
- [ ] Hacer clic en otra ventana y verificar que el borde azul neón (`.rp-active-window`) se desplaza correctamente.

## 3. Verificación del Canvas PIXI
- [ ] Mover el slider de Brillo/Contraste.
- [ ] Verificar que la imagen cambia instantáneamente sin parpadear ni volver a dibujar la escena con `canvas.draw()`.
- [ ] Activar el filtro Ámbar y verificar que la tonalidad cálida se aplica correctamente.

## 4. Navegación por Teclado
- [ ] Presionar `Alt+A` para alternar la activación del módulo.
- [ ] Presionar `Alt+C` para abrir la ficha de personaje propia.
- [ ] Presionar `Alt+X` para recentrar la ventana activa.
- [ ] Presionar `Alt+P` para rotar entre los perfiles *RP Dark*, *High Contrast* y *Amber*.
