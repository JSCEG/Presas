# 🧪 Cómo Probar los Cambios del Popup

## 🚀 Inicio Rápido

### Paso 1: Abrir el Proyecto
```bash
# Navega a la carpeta del proyecto
cd C:\Proyectos\41.-Presas

# Abre index.html en tu navegador
# Opción 1: Doble clic en index.html
# Opción 2: Desde la terminal
start index.html
```

### Paso 2: Esperar a que Cargue
- Verás la pantalla de bienvenida
- Haz clic en "Comenzar a Explorar"
- El mapa de presas se cargará automáticamente

---

## ✅ Checklist de Pruebas

### **Test 1: Visualización del Popup Compacto**
```
1. Haz clic en cualquier marcador de presa (icono de presa 💧)
2. Verifica:
   ✓ El popup es más pequeño (200-240px de ancho)
   ✓ Tiene encabezado guinda con ícono de agua
   ✓ Muestra el selector de radio
   ✓ Muestra el botón "Analizar Recursos"
```

**Resultado Esperado:**
```
┌──────────────────────────┐
│ 💧 Chicoasén            │ ← Encabezado guinda
├──────────────────────────┤
│ 🎯 [Radio: 10 km ▼]    │ ← Selector compacto
│                          │
│ [🔍 Analizar Recursos]  │ ← Botón verde
└──────────────────────────┘
```

---

### **Test 2: Selector de Radio Dinámico**
```
1. Con el popup abierto, haz clic en el selector de radio
2. Cambia entre diferentes opciones:
   - 5 km
   - 10 km
   - 15 km
   - 20 km
   - 30 km
   - 50 km
3. Verifica:
   ✓ El selector responde al clic
   ✓ Muestra todas las opciones
   ✓ Cambia el valor seleccionado
```

**Resultado Esperado:**
- Dropdown se abre correctamente
- Todas las opciones son visibles
- Selección cambia visualmente

---

### **Test 3: Previsualización del Radio**
```
1. Con el popup abierto, selecciona un radio (ej: 15 km)
2. Observa el mapa
3. Verifica:
   ✓ Aparece un círculo verde semitransparente
   ✓ El círculo está centrado en la presa
   ✓ El mapa se ajusta para mostrar el círculo completo
4. Cambia a otro radio (ej: 30 km)
5. Verifica:
   ✓ El círculo anterior desaparece
   ✓ Aparece un nuevo círculo más grande
   ✓ El mapa se ajusta nuevamente
```

**Resultado Esperado:**
```
     Círculo Verde
         ⭕
    /         \
   /    🏞️    \  ← Presa en el centro
  |   (radio)  |
   \           /
    \_________/
```

**Propiedades del Círculo:**
- Color: Verde (#4CAF50)
- Borde: Línea discontinua
- Relleno: 10% opacidad
- Responsive: Se actualiza en tiempo real

---

### **Test 4: Análisis de Recursos**
```
1. Selecciona un radio (ej: 10 km)
2. Haz clic en "Analizar Recursos"
3. Verifica:
   ✓ El popup se cierra
   ✓ El círculo de previsualización desaparece
   ✓ Se ejecuta el análisis de recursos
   ✓ Aparece información de recursos cercanos
```

**Resultado Esperado:**
- Análisis se ejecuta correctamente
- Muestra resultados en la interfaz
- Limpieza automática del círculo de previsualización

---

### **Test 5: Limpieza Automática**
```
Prueba A - Cerrar Popup:
1. Abre un popup de presa
2. Selecciona un radio para ver el círculo
3. Cierra el popup (clic fuera o ESC)
4. Verifica:
   ✓ El círculo desaparece automáticamente

Prueba B - Cambiar de Presa:
1. Abre popup de Presa A
2. Selecciona un radio
3. Abre popup de Presa B
4. Verifica:
   ✓ Círculo de Presa A desaparece
   ✓ Popup de Presa B se abre correctamente
```

**Resultado Esperado:**
- No hay círculos residuales en el mapa
- Memoria limpia después de cada acción

---

### **Test 6: Efectos Visuales**
```
Hover en Selector:
1. Pasa el mouse sobre el selector de radio
2. Verifica:
   ✓ Borde cambia a verde
   ✓ Fondo cambia a gris claro
   ✓ Hay una elevación sutil

Hover en Botón:
1. Pasa el mouse sobre "Analizar Recursos"
2. Verifica:
   ✓ Gradiente se oscurece
   ✓ Botón se eleva
   ✓ Hay un scale de 1.02x

Hover en Popup:
1. Pasa el mouse sobre todo el popup
2. Verifica:
   ✓ Sombra se vuelve más pronunciada
```

**Resultado Esperado:**
- Transiciones suaves (0.2s)
- Efectos visuales consistentes
- Feedback inmediato al usuario

---

### **Test 7: Animaciones**
```
1. Cierra cualquier popup abierto
2. Haz clic en una presa diferente
3. Observa la apertura del popup
4. Verifica:
   ✓ Fade-in suave
   ✓ Translatey desde arriba (-8px)
   ✓ Scale desde 0.95 a 1.0
   ✓ Duración: 0.25 segundos
```

**Resultado Esperado:**
```
Frame 1: [Opacity: 0, Y: -8px, Scale: 0.95]
   ↓
Frame 2: [Opacity: 0.5, Y: -4px, Scale: 0.97]
   ↓
Frame 3: [Opacity: 1, Y: 0px, Scale: 1.0]
```

---

## 🐛 Problemas Comunes y Soluciones

### **Problema 1: El popup se ve grande**
```
Solución:
1. Abre F12 (DevTools)
2. Ve a Network
3. Verifica que presas-popup.css se cargó
4. Si no, limpia caché: Ctrl + Shift + R
```

### **Problema 2: El círculo no aparece**
```
Solución:
1. Abre F12 → Console
2. Busca errores en rojo
3. Verifica que presas-logic.js se cargó
4. Recarga la página: F5
```

### **Problema 3: El selector no cambia**
```
Solución:
1. Verifica que el popup está completamente abierto
2. Intenta hacer clic directamente en el dropdown
3. Si persiste, cierra y vuelve a abrir el popup
```

### **Problema 4: El análisis no funciona**
```
Solución:
1. Verifica conexión a internet
2. Abre F12 → Console
3. Busca mensajes de error
4. Verifica que las capas de datos se hayan cargado
```

---

## 📱 Testing en Diferentes Dispositivos

### **Desktop (1920x1080)**
```
✓ Popup en tamaño completo
✓ Todos los efectos hover funcionan
✓ Animaciones fluidas
```

### **Tablet (768x1024)**
```
✓ Popup adaptado pero funcional
✓ Selector táctil responsivo
✓ Círculo visible
```

### **Mobile (375x667)**
```
✓ Popup en tamaño mínimo (200px)
✓ Botones táctiles de buen tamaño
✓ Scroll si es necesario
```

---

## 🔍 Inspección con DevTools

### **Verificar Estilos CSS:**
```
1. Abre el popup
2. F12 → Elements
3. Inspecciona .presa-popup-compact
4. Verifica:
   - max-width: 240px
   - min-width: 200px
   - border-radius: 6px
```

### **Verificar JavaScript:**
```
1. F12 → Console
2. Escribe: window.updateRadiusPreview
3. Debe retornar: function
4. Escribe: window.analyzePresaClick
5. Debe retornar: function
```

### **Verificar Rendimiento:**
```
1. F12 → Performance
2. Graba 5 segundos abriendo popups
3. Verifica:
   - FPS > 50
   - No hay memory leaks
   - Scripting < 100ms
```

---

## ✅ Criterios de Aceptación

El popup está funcionando correctamente si:

- ✅ **Tamaño**: 200-240px de ancho
- ✅ **Radio Dinámico**: Selector funcional con 6 opciones
- ✅ **Previsualización**: Círculo verde aparece al cambiar radio
- ✅ **Análisis**: Botón ejecuta correctamente
- ✅ **Limpieza**: Círculo se elimina al cerrar
- ✅ **Animaciones**: Entrada suave y fluida
- ✅ **Hover**: Efectos visuales en selector y botón
- ✅ **Responsivo**: Funciona en desktop, tablet y mobile
- ✅ **Performance**: Sin lag ni memory leaks

---

## 📸 Capturas de Pantalla Esperadas

### **Estado Inicial:**
```
Mapa con múltiples marcadores de presas 🏞️🏞️🏞️
Sin popups abiertos
Sin círculos en el mapa
```

### **Popup Abierto (Radio 10km):**
```
Popup compacto visible
Selector muestra "Radio: 10 km"
Botón "Analizar Recursos" visible
SIN círculo en el mapa (aún no seleccionado)
```

### **Popup con Radio Seleccionado (20km):**
```
Popup abierto
Selector muestra "Radio: 20 km"
⭕ Círculo verde de 20km en el mapa
Mapa ajustado para mostrar círculo completo
```

### **Análisis en Progreso:**
```
Popup cerrado
Círculo desaparecido
Resultados de análisis visibles en interfaz
```

---

## 🎯 Resultado Final Esperado

Después de todas las pruebas, deberías tener:

✅ **Popup compacto y funcional**  
✅ **Radio dinámico operativo**  
✅ **Previsualización visual funcionando**  
✅ **Análisis ejecutándose correctamente**  
✅ **Limpieza automática operativa**  
✅ **Efectos visuales suaves**  
✅ **Experiencia de usuario mejorada**

---

## 📞 Soporte

Si encuentras algún problema durante las pruebas:

1. Revisa la consola del navegador (F12)
2. Consulta `CAMBIOS_POPUP_PRESAS.md` para detalles técnicos
3. Lee `GUIA_USO_POPUP_PRESAS.md` para instrucciones de uso
4. Reporta el bug con captura de pantalla

---

**Happy Testing! 🎉**
