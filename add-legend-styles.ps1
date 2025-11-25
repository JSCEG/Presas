# Script para agregar estilos de leyenda móvil al CSS

$cssFile = "css/mobile-responsive.css"
$content = Get-Content $cssFile -Raw

# Buscar la línea donde termina el estilo del botón de búsqueda
$searchBtnEnd = '    .mobile-search-btn span {
        color: #999;
        font-size: 14px;
        flex: 1;
        text-align: left;
    }'

# Nuevo contenido a insertar (leyenda horizontal)
$legendStyles = @'

    /* Leyenda horizontal debajo de búsqueda */
    .mobile-map-legend {
        position: fixed;
        top: 4.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1200;
        background: white;
        border-radius: 12px;
        padding: 0.5rem 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        max-width: calc(100% - 2rem);
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        display: none;
    }

    .mobile-map-legend.active {
        display: block;
    }

    .mobile-map-legend::-webkit-scrollbar {
        height: 4px;
    }

    .mobile-map-legend::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }

    .mobile-map-legend::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 2px;
    }

    .mobile-map-legend::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .mobile-legend-content {
        display: flex;
        gap: 1rem;
        align-items: center;
        white-space: nowrap;
    }

    .mobile-legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: #333;
    }

    .mobile-legend-symbol {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
    }
'@

# Insertar después del botón de búsqueda
$content = $content -replace [regex]::Escape($searchBtnEnd), "$searchBtnEnd$legendStyles"

# Guardar
$content | Set-Content $cssFile -NoNewline

Write-Host "✅ Estilos de leyenda móvil agregados exitosamente" -ForegroundColor Green
