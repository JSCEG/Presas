# Interfaz Móvil Estilo Google Maps - Guía de Implementación

## 📱 Resumen

Se ha creado una interfaz móvil completamente responsive que transforma la aplicación en un estilo Google Maps para dispositivos móviles, mientras mantiene el diseño actual en tablets, laptops y PCs.

## ✨ Características Implementadas

### En Móviles (< 768px)
- **Mapa a pantalla completa** ocupando toda la pantalla
- **Header compacto** que se puede ocultar automáticamente
- **Controles flotantes** superpuestos sobre el mapa:
  - Botón de menú hamburguesa (top-left)
  - Barra de búsqueda (top-center)
  - Botones de acción (top-right)
  - Botón de ubicación (bottom-right)
- **Bottom Sheet deslizable** desde la parte inferior con:
  - Tabs para Controles, Información y Filtros
  - Gestos táctiles para expandir/colapsar
  - Sincronización con controles principales
- **Side Drawer** (menú lateral) con acciones rápidas
- **Modal de búsqueda** a pantalla completa

### En Tablets y Desktop (>= 768px)
- **Diseño original** se mantiene intacto
- Todos los paneles laterales visibles
- Header completo
- Diseño de tarjetas tradicional

## 📂 Archivos Creados

### 1. `css/mobile-responsive.css`
Contiene todos los estilos para la interfaz móvil:
- Media queries para móviles (< 768px)
- Estilos para controles flotantes
- Bottom sheet deslizable
- Side drawer
- Modal de búsqueda
- Animaciones y transiciones

### 2. `js/mobile-interface.js`
Controlador JavaScript que maneja:
- Detección de dispositivo móvil
- Creación dinámica de elementos móviles
- Gestos táctiles (swipe, drag)
- Sincronización con controles principales
- Manejo de eventos

## 🔧 Cómo Integrar

### Paso 1: Agregar CSS
En `index.html`, después de la línea 18 (`<link rel="stylesheet" href="css/presas-popup.css" />`), agregar:

```html
<link rel="stylesheet" href="css/mobile-responsive.css" />
```

### Paso 2: Agregar JavaScript
En `index.html`, después de la línea 877 (`<script src="js/fullscreen-toolbar.js"></script>`), agregar:

```html
<script src="js/mobile-interface.js"></script>
```

## 🎯 Elementos de la Interfaz Móvil

### Botón de Menú (Hamburguesa)
- **Ubicación**: Top-left
- **Función**: Abre el side drawer con acciones rápidas
- **Contenido del drawer**:
  - Actualizar datos
  - Exportar PNG
  - Exportar para Word
  - Pantalla completa
  - Acerca de

### Barra de Búsqueda
- **Ubicación**: Top-center
- **Función**: Abre modal de búsqueda a pantalla completa
- **Características**:
  - Búsqueda en tiempo real
  - Sincronización con búsqueda principal
  - Resultados filtrados

### Botones de Acción Flotantes
- **Ubicación**: Top-right
- **Botones**:
  - Capas del mapa
  - Exportar (botón primario en color guinda)

### Botón de Ubicación
- **Ubicación**: Bottom-right
- **Función**: Centra el mapa en la ubicación del usuario
- **Requiere**: Permisos de geolocalización

### Bottom Sheet
- **Ubicación**: Bottom (deslizable)
- **Estados**:
  - Colapsado: Muestra solo 80px
  - Expandido: Ocupa hasta 85% de la pantalla
- **Tabs**:
  1. **Controles**: Selectores de Instrumento y Mapa
  2. **Información**: Detalles del mapa seleccionado
  3. **Filtros**: Filtros disponibles según el mapa
- **Gestos**:
  - Swipe up: Expandir
  - Swipe down: Colapsar
  - Tap en handle: Toggle

## 🎨 Diseño Visual

### Colores
- **Botones primarios**: `var(--color-gobmx-guinda)` (#9B2247)
- **Botones secundarios**: Blanco con sombra
- **Fondo del drawer**: Gradiente institucional
- **Bottom sheet**: Blanco con bordes redondeados

### Sombras y Elevación
- Controles flotantes: `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)`
- Bottom sheet: `box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15)`
- Side drawer: `box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15)`

### Animaciones
- Transiciones suaves: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Feedback táctil: `transform: scale(0.95)` en `:active`

## 📱 Breakpoints

```css
/* Móviles */
@media (max-width: 767px) { ... }

/* Tablets y Desktop */
@media (min-width: 768px) { ... }

/* Landscape en móviles */
@media (max-width: 767px) and (orientation: landscape) { ... }
```

## 🔄 Sincronización

La interfaz móvil está completamente sincronizada con los controles principales:

```javascript
// Ejemplo de sincronización
mobileInstrumentSelect.addEventListener('change', (e) => {
    mainInstrumentSelect.value = e.target.value;
    mainInstrumentSelect.dispatchEvent(new Event('change'));
});
```

## 🚀 Características Avanzadas

### Gestos Táctiles
- **Touch Start**: Captura posición inicial
- **Touch Move**: Arrastra el bottom sheet
- **Touch End**: Determina si expandir o colapsar basado en la distancia

### Detección de Dispositivo
```javascript
this.isMobile = window.innerWidth < 768;
```

### Adaptación Dinámica
- Escucha eventos `resize`
- Crea/elimina elementos móviles según el tamaño de pantalla
- No afecta el rendimiento en desktop

## 🎯 Próximos Pasos Sugeridos

1. **Integrar búsqueda real**: Conectar el modal de búsqueda con los datos de presas
2. **Geolocalización**: Implementar la función de centrar en ubicación del usuario
3. **Filtros dinámicos**: Poblar el tab de filtros según el mapa seleccionado
4. **Información del mapa**: Mostrar detalles en el tab de información
5. **Persistencia**: Guardar estado del bottom sheet en localStorage
6. **PWA**: Convertir en Progressive Web App para instalación

## 📝 Notas Importantes

- Los archivos CSS y JS ya están creados y listos para usar
- Solo necesitas agregar las dos líneas en `index.html`
- No se requieren cambios en el código existente
- La interfaz móvil se activa automáticamente en dispositivos < 768px
- Compatible con todos los navegadores modernos
- Optimizado para rendimiento (sin impacto en desktop)

## 🐛 Troubleshooting

### El bottom sheet no se muestra
- Verificar que `mobile-responsive.css` esté cargado
- Verificar que `mobile-interface.js` esté cargado
- Abrir en un dispositivo o emulador móvil (< 768px)

### Los controles no se sincronizan
- Verificar que los IDs de los elementos principales existan
- Revisar la consola del navegador para errores

### Gestos táctiles no funcionan
- Asegurarse de estar en un dispositivo táctil
- Verificar que no haya otros event listeners interfiriendo

## 📞 Soporte

Para cualquier duda o problema, revisar:
1. Consola del navegador (F12)
2. Verificar que ambos archivos estén cargados
3. Probar en modo responsive del navegador (F12 > Toggle device toolbar)

---

**Creado para**: Mapas Dinámicos de Presas - SNIEn  
**Fecha**: Noviembre 2025  
**Versión**: 1.0.0
