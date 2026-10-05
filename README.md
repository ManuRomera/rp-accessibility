# 👁️ RP Accessibility — Módulo de Accesibilidad Visual para Foundry VTT

<p align="center">
  <a href="https://github.com/ManuRomera/rp-accessibility/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/ManuRomera/rp-accessibility?include_prereleases&style=for-the-badge&color=3a6ea5&label=release"></a>
  <a href="https://foundryvtt.com"><img alt="Foundry VTT V11 – V13" src="https://img.shields.io/badge/Foundry%20VTT-V11%20%E2%80%93%20V13-57d8c8?style=for-the-badge"></a>
  <a href="https://github.com/ManuRomera/rp-accessibility/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/ManuRomera/rp-accessibility/total?style=for-the-badge&color=ff7a1f"></a>
  <img alt="System" src="https://img.shields.io/badge/system-agnostic-2b3245?style=for-the-badge">
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-2b3245?style=for-the-badge"></a>
</p>

**`rp-accessibility`** es un módulo de accesibilidad de **última generación** para **Foundry VTT** (v11, v12 y v13), diseñado específicamente para resolver los desafíos visuales que enfrentan usuarios con baja visión, fotofobia y **Retinosis Pigmentaria (RP)**.

Transforma la interfaz de Foundry VTT y los mapas de batalla en un entorno seguro, mate, libre de reflejos y con contrastes adaptados de nivel profesional, **sin alterar la información de las fichas ni tapar las escenas del juego**.

> [!IMPORTANT]
> 🚧 **WIP / TRABAJO EN PROGRESO (WORK IN PROGRESS)** 🚧
> Este módulo se encuentra actualmente en **desarrollo activo continuo**. Estamos trabajando en mejoras de contraste para múltiples sistemas de juego (D&D 5e, Call of Cthulhu 7e, etc.), optimización del orden de capas (`z-index` de ventanas de tirada) y refinamiento visual para baja visión y Retinosis Pigmentaria.

---

## 🔗 URL de Instalación por Manifiesto (Manifest URL)

Para instalarlo directamente en tu servidor o cliente de Foundry VTT, copia y pega la siguiente URL en la casilla **URL del Manifiesto** (*Manifest URL*):

```text
https://raw.githubusercontent.com/ManuRomera/rp-accessibility/main/module.json
```


---

## 🌟 Características Principales

### 📷 1. Filtro Fotográfico ND8 de Densidad Neutra (Anti-Glare)
- Aplica un filtro óptico de **Densidad Neutra (ND8)** sobre el canvas del juego (`#board`), reduciendo el exceso de fotones y deslumbramiento de luces blancas sin modificar la nitidez ni distorsionar los detalles tácticos del mapa.
- Ideal para evitar la fatiga ocular y molestias por sensibilidad a la luz (fotofobia).

### 🎛️ 2. Control HUD Flotante en Pantalla (`👁️ Filtro ND`)
- Añade un widget táctil/clicable directo en pantalla (`top: 12px; left: 280px`).
- Permite **deslizar la intensidad de brillo en tiempo real (30% al 100%)** y seleccionar preajustes rápidos:
  - `Normal (90%)`
  - `ND Suave (75%)`
  - `ND Oscuro (50%)`
- Incluye una **Capa Maestra de Oscurecimiento Global** que amortigua cualquier ventana emergente de terceros deslumbrante.

### 🖤 3. Tema Mate Oscuro Profundo (Estándar WCAG AAA)
- Elimina texturas de pergamino, luces reflectantes y fondos claros nativos de Foundry y sistemas de juego.
- Ofrece raciones de contraste superiores a **15:1** en textos, títulos y botones.
- **Navegación de Escenas y Menús Contextuales:** La barra superior de escenas y los menús desplegables se muestran en fondo mate oscuro (`#211e18`) con letras doradas hiperlegibles (`#ffd166`).

### 📜 4. Sanitización Inteligente de Fichas y Diarios
- **Diarios Oscuros:** Anula fondos claros pergamino en `.journal-entry-page`, `.journal-page-content` y editores ProseMirror sin ocultar las ilustraciones o mapas incrustados.
- **Campos e Inputs oscurecidos:** Desinfecta campos de texto (`input`), selectores (`select`), cajas de atributos (`CAC`, `GRA`, `PRE`, `ROB`) y listas de habilidades, transformándolos en campos mates oscuros con texto claro.
- **Protección Anticongelamiento:** Proceso limpio de 1 sola pasada por renderizado, garantizando **60 FPS constantes sin lag ni congelaciones**.

### 🖼️ 5. Inversor Inteligente de Documentos Escaneados
- Analiza páginas escaneadas mediante muestreo canvas offscreen de 48x48 píxeles.
- Si detecta un documento en papel blanco escaneado, **invierte el fondo a oscuro manteniendo intactos los retratos, mapas, tokens e ilustraciones**.

---

## 📥 Guía de Instalación Paso a Paso

### Opción A: Instalación desde el Manifiesto (Recomendado)
1. Abre Foundry VTT y ve a la pestaña **Instalar Módulo** (*Install Module*).
2. En la parte inferior, pega la URL del Manifiesto:
   `https://raw.githubusercontent.com/mromera/rp-accessibility/main/module.json`
3. Haz clic en **Instalar** (*Install*).
4. Inicia tu Mundo (World), ve a **Ajustes de Juego (⚙️) ➔ Gestionar Módulos** y activa **RP Accessibility**.

### Opción B: Instalación Manual por Carpeta o ZIP
1. Descarga el archivo `rp-accessibility.zip` de la sección [Releases de GitHub](https://github.com/mromera/rp-accessibility/releases).
2. Descomprime la carpeta en el directorio de módulos de tu Foundry VTT:
   - **macOS:** `~/Library/Application Support/FoundryVTT/Data/modules/`
   - **Windows:** `%LocalAppData%\FoundryVTT\Data\modules\`
   - **Linux:** `~/.local/share/FoundryVTT/Data/modules/`
3. Reinicia Foundry VTT y activa el módulo en tu Mundo.

---

## 🎹 Atajos de Teclado (Personalizables)

| Atajo | Función |
| :--- | :--- |
| **`Alt + A`** | Activar / Desactivar Accesibilidad Global |
| **`Alt + C`** | Abrir Ficha de Personaje Propia |
| **`Alt + X`** | Recentrar Ventana Activa |
| **`Alt + Z`** | Volver a la Última Ventana Focalizada |
| **`Alt + F`** | Activar / Desactivar Filtro Ámbar en Canvas |
| **`Alt + P`** | Alternar Perfil Visual (*RP Dark*, *High Contrast*, *Amber*) |

---

## 🎨 Perfiles de Accesibilidad Incluidos

- **RP Dark (Predeterminado):** Superficie mate anti-reflejos `#181612` con texto en crema cálido `#f5e6c8` y acentos dorados `#ffd166`.
- **High Contrast:** Negro puro `#000000` con texto blanco brillante `#ffffff` y resaltados cian y amarillo neón.
- **Amber Warm:** Tono ámbar/cálido inspirado en pantallas retro monocromas para mitigar el cansancio por luz azul.

---

## 🛠️ Arquitectura y Compatibilidad

- **Sistemas de Juego Probados:** D&D 5e, Pathfinder 2e, Daggerheart, IMSERSO, CoC 7e, Alien RPG y sistemas agnósticos.
- **Versiones de Foundry VTT:** v11, v12 y v13 (Compatibilidad verificada).
- **Client-Side Pure:** No altera la base de datos del mundo ni afecta la vista de otros jugadores en la mesa.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
Desarrollado con ❤️ para hacer el rol en mesa virtual más inclusivo y accesible para todos.

---

<p align="center">
  <a href="https://github.com/ManuRomera">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ManuRomera/ManuRomera/main/brand/MR_09_Monograma_Marfil_Transparente.png">
      <img src="https://raw.githubusercontent.com/ManuRomera/ManuRomera/main/brand/MR_10_Monograma_Negro_Transparente.png" alt="MR · Manu Romera" height="56">
    </picture>
  </a><br>
  <sub>Hecho por <a href="https://github.com/ManuRomera"><b>Manu Romera</b></a> · Digital RPG Design</sub>
</p>
