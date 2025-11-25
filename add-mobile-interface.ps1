# Script para agregar las referencias de la interfaz móvil al index.html

$indexPath = "index.html"

# Leer el contenido del archivo
$content = Get-Content $indexPath -Raw

# 1. Agregar CSS móvil después de presas-popup.css
$cssPattern = '(<link rel="stylesheet" href="css/presas-popup.css" />)'
$cssReplacement = '$1' + "`r`n" + '    <link rel="stylesheet" href="css/mobile-responsive.css" />'
$content = $content -replace $cssPattern, $cssReplacement

# 2. Agregar JS móvil después de fullscreen-toolbar.js
$jsPattern = '(<script src="js/fullscreen-toolbar.js"></script>)'
$jsReplacement = '$1' + "`r`n" + '    <script src="js/mobile-interface.js"></script>'
$content = $content -replace $jsPattern, $jsReplacement

# Guardar el archivo modificado
$content | Set-Content $indexPath -NoNewline

Write-Host "✅ Archivos agregados exitosamente al index.html" -ForegroundColor Green
Write-Host ""
Write-Host "Cambios realizados:" -ForegroundColor Cyan
Write-Host "  1. Agregado: css/mobile-responsive.css" -ForegroundColor Yellow
Write-Host "  2. Agregado: js/mobile-interface.js" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para probar la interfaz móvil:" -ForegroundColor Cyan
Write-Host "  1. Abre index.html en un navegador" -ForegroundColor White
Write-Host "  2. Presiona F12 para abrir DevTools" -ForegroundColor White
Write-Host "  3. Activa el modo responsive (Ctrl+Shift+M)" -ForegroundColor White
Write-Host "  4. Selecciona un dispositivo móvil o ajusta el ancho < 768px" -ForegroundColor White
