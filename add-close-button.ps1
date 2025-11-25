# Script para agregar botón de cerrar al Bottom Sheet

$jsFile = "js/mobile-interface.js"
$content = Get-Content $jsFile -Raw

# 1. Agregar botón X en el header
$oldHeader = @'
            <div class="bottom-sheet-header">
                <h3 class="bottom-sheet-title">Controles del Mapa</h3>
                <p class="bottom-sheet-subtitle">Desliza para ver más opciones</p>
            </div>
'@

$newHeader = @'
            <div class="bottom-sheet-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 class="bottom-sheet-title">Controles del Mapa</h3>
                        <p class="bottom-sheet-subtitle">Desliza para ver más opciones</p>
                    </div>
                    <button class="bottom-sheet-close-btn" style="background: none; border: none; font-size: 24px; color: #666; cursor: pointer; padding: 0.5rem;">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
'@

$content = $content -replace [regex]::Escape($oldHeader), $newHeader

# 2. Agregar event listener para el botón
$oldSetup = @'
        const handle = this.bottomSheet.querySelector('.bottom-sheet-handle');
        const header = this.bottomSheet.querySelector('.bottom-sheet-header');

        [handle, header].forEach(element => {
'@

$newSetup = @'
        const handle = this.bottomSheet.querySelector('.bottom-sheet-handle');
        const header = this.bottomSheet.querySelector('.bottom-sheet-header');
        const closeBtn = this.bottomSheet.querySelector('.bottom-sheet-close-btn');

        // Event listener para el botón de cerrar
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.collapseBottomSheet();
            });
        }

        [handle, header].forEach(element => {
'@

$content = $content -replace [regex]::Escape($oldSetup), $newSetup

# Guardar
$content | Set-Content $jsFile -NoNewline

Write-Host "✅ Botón de cerrar agregado exitosamente" -ForegroundColor Green
Write-Host "Ahora haz Ctrl+Shift+R en el navegador" -ForegroundColor Cyan
