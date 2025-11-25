# Script para ocultar botón de capas cuando el Bottom Sheet está expandido

$cssFile = "css/mobile-responsive.css"
$content = Get-Content $cssFile -Raw

# Buscar el final de los estilos del botón de capas y agregar la regla para ocultarlo
$pattern = '    \.mobile-layers-btn i \{\r\n        font-size: 18px;\r\n        color: #333;\r\n    \}'

$replacement = @'
    .mobile-layers-btn i {
        font-size: 18px;
        color: #333;
    }

    /* Ocultar botón de capas cuando el bottom sheet está expandido */
    .mobile-bottom-sheet.expanded ~ .mobile-layers-btn {
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
    }
'@

$content = $content -replace [regex]::Escape($pattern), $replacement

# Guardar
$content | Set-Content $cssFile -NoNewline

Write-Host "✅ Regla CSS agregada para ocultar botón de capas cuando Bottom Sheet está expandido" -ForegroundColor Green
Write-Host "Haz Ctrl+Shift+R en el navegador" -ForegroundColor Cyan
