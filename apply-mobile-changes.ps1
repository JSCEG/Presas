# Script para aplicar todos los cambios móviles de forma segura

$cssFile = "css/mobile-responsive.css"
$content = Get-Content $cssFile -Raw

# 1. Ocultar header
$content = $content -replace '(?s)(body \{[^}]+\})', "`$1`r`n`r`n    /* Header oculto completamente en móvil */`r`n    .site-header {`r`n        display: none !important;`r`n    }"

# 2. Agregar estilos del botón de capas al final de la sección móvil (antes del cierre de @media)
$layersButtonStyles = @'

    /* Botón de capas (bottom-left) - Estilo Google Maps */
    .mobile-layers-btn {
        position: fixed;
        bottom: 10rem;
        left: 1rem;
        z-index: 1200;
        background: white;
        border: none;
        border-radius: 24px;
        padding: 0.75rem 1.25rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        font-weight: 600;
        color: #333;
    }

    .mobile-layers-btn:active {
        transform: scale(0.95);
    }

    .mobile-layers-btn i {
        font-size: 18px;
        color: #333;
    }
'@

# Buscar donde insertar (antes de "AJUSTES PARA CONTROLES DE LEAFLET")
$insertPoint = '    /\* ========================================\r\n       AJUSTES PARA CONTROLES DE LEAFLET'
$content = $content -replace [regex]::Escape($insertPoint), "$layersButtonStyles`r`n`r`n$insertPoint"

# Guardar
$content | Set-Content $cssFile -NoNewline

Write-Host "✅ Cambios aplicados exitosamente:" -ForegroundColor Green
Write-Host "  - Header oculto en móvil" -ForegroundColor Yellow
Write-Host "  - Botón de capas agregado (bottom-left)" -ForegroundColor Yellow
