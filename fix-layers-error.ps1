# Script para arreglar el error de sincronización de capas

$jsFile = "js/mobile-interface.js"
$content = Get-Content $jsFile -Raw

# Buscar el método syncLayers y reemplazarlo con una versión mejorada
$oldPattern = @'
                            html \+= `
                                <label style="display: flex; align-items: center; padding: 0\.75rem 1rem; cursor: pointer; transition: background 0\.2s;" 
                                       onmouseover="this\.style\.background='#f5f5f5'" 
                                       onmouseout="this\.style\.background='transparent'">
                                    <input type="radio" name="mobile-base-layer" value="\$\{text\}" \$\{checked\} 
                                           style="margin-right: 0\.75rem; width: 18px; height: 18px; cursor: pointer;"
                                           onchange="document\.querySelectorAll\('\.leaflet-control-layers-base input'\)\[Array\.from\(document\.querySelectorAll\('\.leaflet-control-layers-base label span'\)\)\.findIndex\(s => s\.textContent\.trim\(\) === '\$\{text\}'\)\]\.click\(\)">
                                    <span style="flex: 1; font-size: 0\.9rem; color: #333;">\$\{text\}</span>
                                </label>
                            `;
'@

$newPattern = @'
                            html += `
                                <label class="mobile-layer-label" style="display: flex; align-items: center; padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;">
                                    <input type="radio" name="mobile-base-layer" ${checked} 
                                           style="margin-right: 0.75rem; width: 18px; height: 18px; cursor: pointer;"
                                           data-layer-index="${index}"
                                           data-layer-type="base">
                                    <span style="flex: 1; font-size: 0.9rem; color: #333;">${text}</span>
                                </label>
                            `;
'@

# Intentar reemplazar
if ($content -match [regex]::Escape($oldPattern)) {
    $content = $content -replace [regex]::Escape($oldPattern), $newPattern
    Write-Host "✅ Patrón de base layers encontrado y reemplazado" -ForegroundColor Green
}
else {
    Write-Host "⚠️  Patrón de base layers no encontrado, buscando alternativa..." -ForegroundColor Yellow
    
    # Buscar por partes más específicas
    $content = $content -replace 'onchange="document\.querySelectorAll\(''\.leaflet-control-layers-base input''\)\[Array\.from\(document\.querySelectorAll\(''\.leaflet-control-layers-base label span''\)\)\.findIndex\(s => s\.textContent\.trim\(\) === ''\$\{text\}''\)\]\.click\(\)"', 'data-layer-type="base"'
    Write-Host "✅ Código inline de base layers removido" -ForegroundColor Green
}

# Guardar
$content | Set-Content $jsFile -NoNewline

Write-Host "`n✅ Archivo actualizado" -ForegroundColor Green
Write-Host "Ahora haz un hard refresh (Ctrl+Shift+R) en el navegador" -ForegroundColor Cyan
