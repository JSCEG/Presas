# 🔧 Test de Debugging del Radio Dinámico

## 🎯 Test Inmediato en Consola

### 1. Abre la consola (F12)

### 2. Ejecuta estos comandos UNO POR UNO:

```javascript
// Test 1: Ver valor actual de currentSearchRadius
currentSearchRadius
// Debe mostrar: 10000 (si está en default)

// Test 2: Cambiar manualmente
currentSearchRadius = 25000
console.log('Radio cambiado a:', currentSearchRadius)

// Test 3: Ejecutar análisis manual (usa coordenadas de Chicoasén)
window.analyzePresaClick('TestManual', 17.247, -93.088, 25)
```

### 3. Revisa la consola y busca:

```
📥 Parámetros recibidos: {presaNombre: "TestManual", lat: 17.247, lng: -93.088, radius: 25, tipo: "number"}
🎯 Análisis iniciado: TestManual, Radio seleccionado: 25 km (25000 metros)
✅ currentSearchRadius actualizado a: 25000 metros
⚠️ CRÍTICO - currentSearchRadius en análisis: 25000 metros (25 km)
📊 analysisStats.radioKm configurado a: 25 km
```

---

## 🐛 Si SIGUE diciendo 10 km

### Escenario A: El parámetro NO llega
```
Si ves:
📥 Parámetros recibidos: {radius: undefined}

PROBLEMA: El selector del popup no está pasando el valor
```

### Escenario B: El parámetro llega pero no se usa
```
Si ves:
📥 Parámetros recibidos: {radius: "20"}
🎯 Radio seleccionado: 20 km
⚠️ CRÍTICO - currentSearchRadius en análisis: 10000 metros

PROBLEMA: Algo está restableciendo currentSearchRadius entre 
la línea 4777 (donde se actualiza) y la línea 3875 (donde se usa)
```

---

## 🔍 Test del Selector en el Popup

Con el popup ABIERTO, ejecuta en consola:

```javascript
// Ver si el selector existe
const selector = document.querySelector('[id^="radio-select-"]')
console.log('Selector encontrado:', selector)

// Ver su valor actual
if (selector) {
    console.log('Valor del selector:', selector.value)
}

// Cambiar el valor manualmente
if (selector) {
    selector.value = "30"
    console.log('Valor cambiado a:', selector.value)
}

// Simular el clic en el botón
const boton = selector.closest('div').querySelector('button')
if (boton) {
    boton.click()
    console.log('Botón clickeado')
}
```

---

## 📋 Información para Reportar

Después de hacer las pruebas, copia y pega TODO lo que aparezca en la consola desde:

1. **Abrir popup**
2. **Cambiar radio a 20 km**
3. **Hacer clic en "Analizar Recursos"**

Especialmente busca estas líneas:

- `📥 Parámetros recibidos:`
- `🎯 Análisis iniciado:`
- `✅ currentSearchRadius actualizado a:`
- `⚠️ CRÍTICO - currentSearchRadius en análisis:`
- `📊 analysisStats.radioKm configurado a:`

---

## 🚨 Posibles Causas

### Causa 1: Template String mal escapado
El nombre de la presa tiene caracteres especiales que rompen el JavaScript

### Causa 2: ID duplicado
Hay múltiples selectores con el mismo ID

### Causa 3: Evento no se dispara
El onclick no se ejecuta correctamente

### Causa 4: Variable global no se actualiza
Hay un scope issue con `currentSearchRadius`

---

## ✅ Confirmación de Éxito

Cuando funcione correctamente verás:

```
📥 Parámetros recibidos: {presaNombre: "Chicoasén", lat: 17.247, lng: -93.088, radius: "20", tipo: "string"}
🎯 Análisis iniciado: Chicoasén, Radio seleccionado: 20 km (20000 metros)
✅ currentSearchRadius actualizado a: 20000 metros
🚀 Ejecutando análisis con currentSearchRadius = 20000 metros
🔍 INICIO analyzePresaResources - currentSearchRadius = 20000 metros (20 km)
⚠️ CRÍTICO - currentSearchRadius en análisis: 20000 metros (20 km)
📊 analysisStats.radioKm configurado a: 20 km
🔄 Procesando capa: localidades_indigenas, usando radius: 20000 metros (20 km)
📊 Resumen del Análisis:
   • Radio: 20 km  ← ✅ CORRECTO
```

---

**IMPORTANTE**: Limpia caché antes de probar (Ctrl + Shift + R)
