/**
 * Mobile Interface Controller
 * Maneja la interfaz estilo Google Maps para dispositivos móviles
 */

class MobileInterface {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.bottomSheet = null;
        this.sideDrawer = null;
        this.searchModal = null;
        this.drawerOverlay = null;
        this.isBottomSheetExpanded = false;
        this.touchStartY = 0;
        this.currentBottomSheetY = 0;

        this.init();
    }

    init() {
        if (!this.isMobile) return;

        this.createMobileElements();
        this.attachEventListeners();
        this.setupTouchHandlers();

        // Escuchar cambios de orientación
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth < 768;

            if (wasMobile !== this.isMobile) {
                if (this.isMobile) {
                    this.createMobileElements();
                } else {
                    this.removeMobileElements();
                }
            }
        });
    }

    createMobileElements() {
        // Crear botón de menú hamburguesa
        this.createMenuButton();

        // Crear botón de búsqueda
        this.createSearchButton();

        // Crear botones de acción flotantes
        this.createActionButtons();

        // Crear botón de ubicación
        this.createLocationButton();

        // Crear bottom sheet
        this.createBottomSheet();

        // Crear side drawer
        this.createSideDrawer();

        // Crear modal de búsqueda
        this.createSearchModal();
    }

    createMenuButton() {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '<i class="bi bi-list"></i>';
        btn.setAttribute('aria-label', 'Abrir menú');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.toggleSideDrawer());
    }

    createSearchButton() {
        const btn = document.createElement('button');
        btn.className = 'mobile-search-btn';
        btn.innerHTML = `
            <i class="bi bi-search"></i>
            <span>Buscar presas...</span>
        `;
        btn.setAttribute('aria-label', 'Buscar');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.openSearchModal());
    }

    createActionButtons() {
        const container = document.createElement('div');
        container.className = 'mobile-action-buttons';

        // Botón de capas
        const layersBtn = document.createElement('button');
        layersBtn.className = 'mobile-action-btn';
        layersBtn.innerHTML = '<i class="bi bi-layers"></i>';
        layersBtn.setAttribute('aria-label', 'Capas del mapa');
        layersBtn.addEventListener('click', () => this.toggleLayers());

        // Botón de exportar
        const exportBtn = document.createElement('button');
        exportBtn.className = 'mobile-action-btn primary';
        exportBtn.innerHTML = '<i class="bi bi-download"></i>';
        exportBtn.setAttribute('aria-label', 'Exportar mapa');
        exportBtn.addEventListener('click', () => this.exportMap());

        container.appendChild(layersBtn);
        container.appendChild(exportBtn);
        document.body.appendChild(container);
    }

    createLocationButton() {
        const btn = document.createElement('button');
        btn.className = 'mobile-location-btn';
        btn.innerHTML = '<i class="bi bi-crosshair"></i>';
        btn.setAttribute('aria-label', 'Mi ubicación');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.centerOnLocation());
    }

    createBottomSheet() {
        const sheet = document.createElement('div');
        sheet.className = 'mobile-bottom-sheet collapsed';
        sheet.innerHTML = `
            <div class="bottom-sheet-handle"></div>
            <div class="bottom-sheet-header">
                <h3 class="bottom-sheet-title">Controles del Mapa</h3>
                <p class="bottom-sheet-subtitle">Desliza para ver más opciones</p>
            </div>
            <div class="bottom-sheet-tabs">
                <button class="bottom-sheet-tab active" data-tab="controls">Controles</button>
                <button class="bottom-sheet-tab" data-tab="info">Información</button>
                <button class="bottom-sheet-tab" data-tab="filters">Filtros</button>
            </div>
            <div class="bottom-sheet-content">
                <div class="bottom-sheet-tab-content" data-content="controls">
                    <div class="bottom-sheet-controls">
                        <div class="bottom-sheet-control-group">
                            <label for="mobile-instrument-select">Instrumento</label>
                            <select id="mobile-instrument-select" class="control">
                                <option value="PRESAS">PRESAS</option>
                            </select>
                        </div>
                        <div class="bottom-sheet-control-group">
                            <label for="mobile-map-select">Mapa</label>
                            <select id="mobile-map-select" class="control" disabled>
                                <option value="">Seleccione un mapa</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="bottom-sheet-tab-content" data-content="info" style="display: none;">
                    <div id="mobile-map-info">
                        <p>Selecciona un mapa para ver su información.</p>
                    </div>
                </div>
                <div class="bottom-sheet-tab-content" data-content="filters" style="display: none;">
                    <div id="mobile-filters">
                        <p>Los filtros aparecerán aquí según el mapa seleccionado.</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(sheet);
        this.bottomSheet = sheet;

        // Sincronizar con los selectores principales
        this.syncBottomSheetControls();
    }

    createSideDrawer() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-drawer-overlay';
        document.body.appendChild(overlay);
        this.drawerOverlay = overlay;

        overlay.addEventListener('click', () => this.closeSideDrawer());

        // Crear drawer
        const drawer = document.createElement('div');
        drawer.className = 'mobile-side-drawer';
        drawer.innerHTML = `
            <div class="mobile-drawer-header">
                <h2 class="mobile-drawer-title">Menú</h2>
                <button class="mobile-drawer-close" aria-label="Cerrar menú">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="mobile-drawer-content">
                <div class="mobile-drawer-section">
                    <h3 class="mobile-drawer-section-title">Acciones</h3>
                    <div class="bottom-sheet-list">
                        <div class="bottom-sheet-list-item" data-action="refresh">
                            <div class="bottom-sheet-list-item-title">
                                <i class="bi bi-arrow-clockwise"></i> Actualizar datos
                            </div>
                            <div class="bottom-sheet-list-item-subtitle">
                                Recargar información desde Google Sheets
                            </div>
                        </div>
                        <div class="bottom-sheet-list-item" data-action="export-png">
                            <div class="bottom-sheet-list-item-title">
                                <i class="bi bi-download"></i> Exportar PNG
                            </div>
                            <div class="bottom-sheet-list-item-subtitle">
                                Descargar mapa como imagen
                            </div>
                        </div>
                        <div class="bottom-sheet-list-item" data-action="export-word">
                            <div class="bottom-sheet-list-item-title">
                                <i class="bi bi-file-word"></i> Exportar para Word
                            </div>
                            <div class="bottom-sheet-list-item-subtitle">
                                Optimizado para documentos
                            </div>
                        </div>
                        <div class="bottom-sheet-list-item" data-action="fullscreen">
                            <div class="bottom-sheet-list-item-title">
                                <i class="bi bi-arrows-fullscreen"></i> Pantalla completa
                            </div>
                            <div class="bottom-sheet-list-item-subtitle">
                                Ver mapa a pantalla completa
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobile-drawer-section">
                    <h3 class="mobile-drawer-section-title">Información</h3>
                    <div class="bottom-sheet-list">
                        <div class="bottom-sheet-list-item" data-action="about">
                            <div class="bottom-sheet-list-item-title">
                                <i class="bi bi-info-circle"></i> Acerca de
                            </div>
                            <div class="bottom-sheet-list-item-subtitle">
                                Información del sistema
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(drawer);
        this.sideDrawer = drawer;

        // Evento para cerrar
        drawer.querySelector('.mobile-drawer-close').addEventListener('click', () => {
            this.closeSideDrawer();
        });

        // Eventos para las acciones
        drawer.querySelectorAll('[data-action]').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleDrawerAction(action);
            });
        });
    }

    createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'mobile-search-modal';
        modal.innerHTML = `
            <div class="mobile-search-header">
                <button class="mobile-search-back" aria-label="Volver">
                    <i class="bi bi-arrow-left"></i>
                </button>
                <input type="text" class="mobile-search-input" placeholder="Buscar presas..." id="mobile-search-input">
            </div>
            <div class="mobile-search-results" id="mobile-search-results">
                <p style="text-align: center; color: #999; padding: 2rem;">
                    Escribe para buscar presas...
                </p>
            </div>
        `;

        document.body.appendChild(modal);
        this.searchModal = modal;

        // Evento para cerrar
        modal.querySelector('.mobile-search-back').addEventListener('click', () => {
            this.closeSearchModal();
        });

        // Evento de búsqueda
        const searchInput = modal.querySelector('#mobile-search-input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    setupTouchHandlers() {
        if (!this.bottomSheet) return;

        const handle = this.bottomSheet.querySelector('.bottom-sheet-handle');
        const header = this.bottomSheet.querySelector('.bottom-sheet-header');

        [handle, header].forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
                this.currentBottomSheetY = this.bottomSheet.getBoundingClientRect().top;
            });

            element.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const deltaY = touchY - this.touchStartY;

                // Solo permitir arrastrar hacia abajo si está expandido
                // o hacia arriba si está colapsado
                if ((this.isBottomSheetExpanded && deltaY > 0) ||
                    (!this.isBottomSheetExpanded && deltaY < 0)) {
                    const newY = this.currentBottomSheetY + deltaY;
                    this.bottomSheet.style.transform = `translateY(${newY}px)`;
                }
            });

            element.addEventListener('touchend', (e) => {
                const touchY = e.changedTouches[0].clientY;
                const deltaY = touchY - this.touchStartY;

                // Si se arrastró más de 50px, cambiar estado
                if (Math.abs(deltaY) > 50) {
                    if (deltaY > 0) {
                        this.collapseBottomSheet();
                    } else {
                        this.expandBottomSheet();
                    }
                } else {
                    // Volver al estado anterior
                    if (this.isBottomSheetExpanded) {
                        this.expandBottomSheet();
                    } else {
                        this.collapseBottomSheet();
                    }
                }

                this.bottomSheet.style.transform = '';
            });
        });

        // Tabs del bottom sheet
        this.bottomSheet.querySelectorAll('.bottom-sheet-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchBottomSheetTab(tabName);
            });
        });
    }

    syncBottomSheetControls() {
        const mainInstrumentSelect = document.getElementById('instrument-select');
        const mainMapSelect = document.getElementById('map-select');
        const mobileInstrumentSelect = document.getElementById('mobile-instrument-select');
        const mobileMapSelect = document.getElementById('mobile-map-select');

        if (!mainInstrumentSelect || !mobileInstrumentSelect) return;

        // Sincronizar instrumento
        mobileInstrumentSelect.addEventListener('change', (e) => {
            mainInstrumentSelect.value = e.target.value;
            mainInstrumentSelect.dispatchEvent(new Event('change'));
        });

        mainInstrumentSelect.addEventListener('change', (e) => {
            mobileInstrumentSelect.value = e.target.value;
        });

        // Sincronizar mapa
        if (mainMapSelect && mobileMapSelect) {
            mobileMapSelect.addEventListener('change', (e) => {
                mainMapSelect.value = e.target.value;
                mainMapSelect.dispatchEvent(new Event('change'));
            });

            mainMapSelect.addEventListener('change', (e) => {
                mobileMapSelect.value = e.target.value;
                mobileMapSelect.innerHTML = mainMapSelect.innerHTML;
                mobileMapSelect.disabled = mainMapSelect.disabled;
            });
        }
    }

    expandBottomSheet() {
        this.bottomSheet.classList.remove('collapsed');
        this.bottomSheet.classList.add('expanded');
        this.isBottomSheetExpanded = true;
    }

    collapseBottomSheet() {
        this.bottomSheet.classList.remove('expanded');
        this.bottomSheet.classList.add('collapsed');
        this.isBottomSheetExpanded = false;
    }

    toggleBottomSheet() {
        if (this.isBottomSheetExpanded) {
            this.collapseBottomSheet();
        } else {
            this.expandBottomSheet();
        }
    }

    switchBottomSheetTab(tabName) {
        // Actualizar tabs activos
        this.bottomSheet.querySelectorAll('.bottom-sheet-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Mostrar contenido correspondiente
        this.bottomSheet.querySelectorAll('.bottom-sheet-tab-content').forEach(content => {
            content.style.display = content.dataset.content === tabName ? 'block' : 'none';
        });
    }

    toggleSideDrawer() {
        this.sideDrawer.classList.toggle('open');
        this.drawerOverlay.classList.toggle('active');
    }

    closeSideDrawer() {
        this.sideDrawer.classList.remove('open');
        this.drawerOverlay.classList.remove('active');
    }

    openSearchModal() {
        this.searchModal.classList.add('active');
        setTimeout(() => {
            this.searchModal.querySelector('#mobile-search-input').focus();
        }, 300);
    }

    closeSearchModal() {
        this.searchModal.classList.remove('active');
        this.searchModal.querySelector('#mobile-search-input').value = '';
        this.searchModal.querySelector('#mobile-search-results').innerHTML = `
            <p style="text-align: center; color: #999; padding: 2rem;">
                Escribe para buscar presas...
            </p>
        `;
    }

    handleSearch(query) {
        const resultsContainer = this.searchModal.querySelector('#mobile-search-results');

        if (query.length < 2) {
            resultsContainer.innerHTML = `
                <p style="text-align: center; color: #999; padding: 2rem;">
                    Escribe al menos 2 caracteres...
                </p>
            `;
            return;
        }

        // Aquí se integraría con la búsqueda existente
        // Por ahora, mostrar mensaje
        resultsContainer.innerHTML = `
            <p style="text-align: center; color: #999; padding: 2rem;">
                Buscando "${query}"...
            </p>
        `;

        // Trigger búsqueda en el sistema principal
        const mainSearchInput = document.getElementById('permit-search');
        if (mainSearchInput) {
            mainSearchInput.value = query;
            mainSearchInput.dispatchEvent(new Event('input'));
        }
    }

    handleDrawerAction(action) {
        this.closeSideDrawer();

        switch (action) {
            case 'refresh':
                document.getElementById('refresh-data')?.click();
                break;
            case 'export-png':
                document.getElementById('export-map-btn')?.click();
                break;
            case 'export-word':
                document.getElementById('export-word-btn')?.click();
                break;
            case 'fullscreen':
                document.getElementById('fullscreen-btn')?.click();
                break;
            case 'about':
                alert('Mapas Dinámicos de Presas\nSubsecretaría de Planeación y Transición Energética - SENER');
                break;
        }
    }

    toggleLayers() {
        // Simular click en el control de capas de Leaflet
        const layersControl = document.querySelector('.leaflet-control-layers-toggle');
        if (layersControl) {
            layersControl.click();
        }
    }

    exportMap() {
        document.getElementById('export-map-btn')?.click();
    }

    centerOnLocation() {
        // Aquí se implementaría la geolocalización
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // Centrar mapa en la ubicación del usuario
                if (window.map) {
                    window.map.setView([position.coords.latitude, position.coords.longitude], 13);
                }
            }, (error) => {
                alert('No se pudo obtener tu ubicación');
            });
        } else {
            alert('Tu navegador no soporta geolocalización');
        }
    }

    removeMobileElements() {
        document.querySelectorAll('.mobile-menu-btn, .mobile-search-btn, .mobile-action-buttons, .mobile-location-btn, .mobile-bottom-sheet, .mobile-side-drawer, .mobile-drawer-overlay, .mobile-search-modal').forEach(el => {
            el.remove();
        });
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobileInterface = new MobileInterface();
    });
} else {
    window.mobileInterface = new MobileInterface();
}
