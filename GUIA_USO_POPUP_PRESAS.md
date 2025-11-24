# Guía de Uso - Popup de Presas con Radio Dinámico

## 📍 Vista General del Popup Compacto

El nuevo popup de presas ha sido optimizado para ocupar menos espacio y proporcionar una experiencia más fluida e intuitiva.

### Características Principales:

#### 🎯 **Tamaño Compacto**
- Ancho: 200-240px (antes: 240-300px)
- Altura ajustada automáticamente
- Diseño limpio y minimalista

#### 🎨 **Elementos Visuales**
```
┌─────────────────────────────────┐
│  💧 Nombre de la Presa         │ ← Encabezado con ícono
├─────────────────────────────────┤
│  🎯 [Radio: 10 km ▼]           │ ← Selector de radio
│                                 │
│  [🔍 Analizar Recursos]        │ ← Botón de acción
└─────────────────────────────────┘
```

---

## 🎮 Cómo Usar el Radio Dinámico

### Paso 1: Abrir el Popup
Haz clic en cualquier marcador de presa en el mapa.

### Paso 2: Seleccionar Radio de Análisis
1. Haz clic en el selector desplegable
2. Opciones disponibles:
   - **5 km** - Análisis muy local
   - **10 km** - Análisis local (predeterminado) ⭐
   - **15 km** - Análisis de área cercana
   - **20 km** - Análisis regional
   - **30 km** - Análisis regional amplio
   - **50 km** - Análisis de gran alcance

### Paso 3: Vista Previa del Radio
Al seleccionar un radio, **automáticamente** verás:
- ✅ Un círculo verde semitransparente en el mapa
- ✅ El mapa se ajusta para mostrar el círculo completo
- ✅ Borde discontinuo para mejor visualización

### Paso 4: Analizar Recursos
Haz clic en el botón **"🔍 Analizar Recursos"** para ejecutar el análisis con el radio seleccionado.

---

## 🎨 Efectos Visuales Interactivos

### 🖱️ Hover Effects

#### Selector de Radio:
- **Hover**: Borde verde + Elevación sutil + Fondo gris claro
- **Focus**: Borde verde + Sombra difusa
- **Active**: Regresa a posición normal

#### Botón de Análisis:
- **Hover**: Gradiente más oscuro + Elevación + Scale (1.02x)
- **Active**: Regresa a posición normal + Sombra reducida

#### Popup Completo:
- **Hover**: Sombra más pronunciada (efecto de profundidad)

### 🎬 Animaciones

#### Apertura del Popup:
- Fade-in: Opacidad 0 → 1
- TranslateY: -8px → 0px
- Scale: 0.95 → 1.0
- Duración: 0.25 segundos

---

## 🎯 Características del Círculo de Previsualización

### Propiedades Visuales:
- **Color**: Verde (#4CAF50)
- **Relleno**: 10% de opacidad
- **Borde**: Línea discontinua (dash array)
- **Peso**: 2px

### Comportamiento:
- ✅ Aparece al cambiar el selector
- ✅ Se actualiza en tiempo real
- ✅ Se elimina al cerrar el popup
- ✅ Se elimina al ejecutar el análisis
- ✅ El mapa se ajusta automáticamente

---

## 💡 Tips y Trucos

### ⚡ Atajos y Consejos:

1. **Cambio Rápido de Radio**
   - Usa las teclas de flecha ↑↓ cuando el selector esté enfocado
   - Enter para seleccionar

2. **Vista Previa sin Analizar**
   - Cambia entre radios para ver diferentes coberturas
   - No necesitas ejecutar el análisis para ver el círculo

3. **Cerrar Rápidamente**
   - Haz clic fuera del popup
   - Presiona ESC
   - El círculo se limpia automáticamente

4. **Mejor Radio para Cada Caso**
   - **5-10 km**: Análisis de impacto inmediato
   - **15-20 km**: Estudios de cuenca hidrográfica
   - **30-50 km**: Análisis regional o de ecosistema

---

## 🔧 Solución de Problemas

### El círculo no aparece:
- ✅ Asegúrate de que el mapa esté completamente cargado
- ✅ Verifica que no haya popups múltiples abiertos
- ✅ Cierra y vuelve a abrir el popup

### El popup se ve muy grande:
- ✅ Verifica que `presas-popup.css` esté cargado
- ✅ Limpia la caché del navegador (Ctrl + Shift + R)

### El análisis no se ejecuta:
- ✅ Espera a que se carguen las capas de datos
- ✅ Verifica la consola del navegador (F12)
- ✅ Asegúrate de tener conexión a internet

---

## 🎨 Paleta de Colores Usada

| Elemento | Color | Uso |
|----------|-------|-----|
| Encabezado | `#601623` → `#8B1E3F` | Gradiente guinda institucional |
| Ícono Radio | `#601623` | Ícono bullseye |
| Botón Analizar | `#4CAF50` → `#2E7D32` | Gradiente verde |
| Círculo Preview | `#4CAF50` | Verde semitransparente |
| Texto | `#333` | Gris oscuro |
| Bordes | `#ddd` | Gris claro |

---

## 📱 Responsividad

El popup está optimizado para:
- ✅ **Desktop**: Experiencia completa
- ✅ **Tablet**: Popup adaptado
- ✅ **Mobile**: Tamaño mínimo garantizado (200px)

---

## 🚀 Próximas Mejoras Sugeridas

1. **Mostrar número de recursos** en tiempo real en el selector
2. **Historial** de radios más usados
3. **Comparación** entre diferentes radios
4. **Exportar** el análisis a PDF
5. **Compartir** enlace directo al análisis
6. **Modo oscuro** para el popup
7. **Teclado shortcuts** avanzados

---

## 📞 Soporte

Para reportar bugs o sugerir mejoras:
- Crea un issue en el repositorio
- Contacta al equipo de desarrollo
- Revisa la documentación en `CAMBIOS_POPUP_PRESAS.md`

---

**Versión**: 2.0  
**Última actualización**: 2025  
**Desarrollado por**: Equipo SNIEn - SENER México
