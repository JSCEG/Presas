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

    attachEventListeners() {
        // Este método se puede usar para event listeners globales si es necesario
        // Por ahora, los event listeners se agregan en cada método create*
    }

    createMobileElements() {
        // Crear botón de menú hamburguesa
        this.createMenuButton();

        // Crear botón de búsqueda
        this.createSearchButton();

        // Crear botones de acción flotantes
        this.createActionButtons();

        // Crear botón de capas (bottom-left)
        this.createLayersButton();

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

        // Botón de exportar (único botón arriba a la derecha)
        const exportBtn = document.createElement('button');
        exportBtn.className = 'mobile-action-btn primary';
        exportBtn.innerHTML = '<i class="bi bi-download"></i>';
        exportBtn.setAttribute('aria-label', 'Exportar mapa');
        exportBtn.addEventListener('click', () => this.exportMap());

        container.appendChild(exportBtn);
        document.body.appendChild(container);
    }

    createLayersButton() {
        // Botón de capas en bottom-left (estilo Google Maps)
        const btn = document.createElement('button');
        btn.className = 'mobile-layers-btn';
        btn.innerHTML = `
            <i class="bi bi-layers"></i>
            <span>Capas</span>
        `;
        btn.setAttribute('aria-label', 'Capas del mapa');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            // Expandir bottom sheet y cambiar al tab de capas
            this.expandBottomSheet();
            this.switchBottomSheetTab('layers');
        });
    }

    createLocationButton() {
        const btn = document.createElement('button');
        btn.className = 'mobile-location-btn';
        btn.innerHTML = '<i class="bi bi-crosshair"></i>';
        btn.setAttribute('aria-label', 'Mi ubicación');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => this.centerOnLocation());
    }

    createLayersButton() {
        // Botón de capas en bottom-left (estilo Google Maps)
        const btn = document.createElement('button');
        btn.className = 'mobile-layers-btn';
        btn.innerHTML = `
            <i class="bi bi-layers"></i>
            <span>Capas</span>
        `;
        btn.setAttribute('aria-label', 'Capas del mapa');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            // Expandir bottom sheet y cambiar al tab de capas
            this.expandBottomSheet();
            this.switchBottomSheetTab('layers');
        });
    }

    createBottomSheet() {
        const sheet = document.createElement('div');
        sheet.className = 'mobile-bottom-sheet collapsed';
        sheet.innerHTML = `
            <div class="bottom-sheet-handle"></div>
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
            <div class="bottom-sheet-tabs">
                <button class="bottom-sheet-tab active" data-tab="controls">Controles</button>
                <button class="bottom-sheet-tab" data-tab="layers">Capas</button>
                <button class="bottom-sheet-tab" data-tab="info">Información</button>
                <button class="bottom-sheet-tab" data-tab="about">Acerca de</button>
            </div>
            <div class="bottom-sheet-content">
                <!-- Tab: Controles -->
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
                        <div class="bottom-sheet-control-group" id="mobile-search-group" style="display: none;">
                            <label for="mobile-permit-search">Buscar permiso</label>
                            <input type="text" id="mobile-permit-search" class="control" placeholder="Número de permiso o razón social">
                        </div>
                    </div>
                </div>
                
                <!-- Tab: Capas -->
                <div class="bottom-sheet-tab-content" data-content="layers" style="display: none;">
                    <div id="mobile-layers-container">
                        <p style="color: #666; padding: 1rem;">Selecciona un mapa para ver las capas disponibles.</p>
                    </div>
                </div>
                
                <!-- Tab: Información -->
                <div class="bottom-sheet-tab-content" data-content="info" style="display: none;">
                    <div id="mobile-map-info">
                        <div id="mobile-map-description" style="padding: 1rem;">
                            <h4 id="mobile-map-description-title" style="margin: 0 0 0.5rem 0; color: var(--color-gobmx-verde);"></h4>
                            <p id="mobile-map-description-content" style="margin: 0; color: #666; line-height: 1.6;"></p>
                        </div>
                        <div id="mobile-analysis-data" style="padding: 1rem; border-top: 1px solid #eee; display: none;">
                            <h4 style="margin: 0 0 1rem 0; color: var(--color-gobmx-verde);">Datos de Análisis</h4>
                            <div id="mobile-analysis-content"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Tab: Acerca de -->
                <div class="bottom-sheet-tab-content" data-content="about" style="display: none;">
                    <div style="padding: 1.5rem; text-align: center;">
                        <div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <img src="img/logo_sener.png" alt="SENER" style="height: 60px;">
                            <img src="img/snien.png" alt="SNIEn" style="height: 50px;">
                        </div>
                        <h3 style="margin: 0 0 0.5rem 0; color: var(--color-gobmx-verde); font-size: 1.1rem;">Mapas Dinámicos de Presas</h3>
                        <p style="margin: 0 0 1rem 0; color: #666; font-size: 0.9rem;">Subsecretaría de Planeación y Transición Energética</p>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                            <p style="margin: 0; font-size: 0.85rem; color: #666;">
                                <strong>Fuente de datos:</strong><br>
                                Hoja de cálculo institucional publicada (Google Sheets)
                            </p>
                        </div>
                        <div id="mobile-last-updated" style="margin-top: 1rem; padding: 0.75rem; background: #e8f5e9; border-radius: 8px;">
                            <p style="margin: 0; font-size: 0.85rem; color: #2e7d32;">
                                <i class="bi bi-clock"></i> <strong>Última actualización:</strong> <span id="mobile-update-time">--</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(sheet);
        this.bottomSheet = sheet;

        // Sincronizar con los selectores principales
        this.syncBottomSheetControls();

        // Sincronizar información del mapa
        this.syncMapInfo();

        // Sincronizar capas
        this.syncLayers();
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
        const closeBtn = this.bottomSheet.querySelector('.bottom-sheet-close-btn');

        // Event listener para el botón de cerrar
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.collapseBottomSheet();
            });
        }

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
        // Expandir el Bottom Sheet si está colapsado
        if (!this.isBottomSheetExpanded) {
            this.expandBottomSheet();
        }

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

    syncMapInfo() {
        // Sincronizar información del mapa desde el desktop
        const observer = new MutationObserver(() => {
            const desktopTitle = document.getElementById('map-description-title');
            const desktopContent = document.getElementById('map-description-content');
            const mobileTitle = document.getElementById('mobile-map-description-title');
            const mobileContent = document.getElementById('mobile-map-description-content');

            if (desktopTitle && mobileTitle) {
                mobileTitle.textContent = desktopTitle.textContent;
            }
            if (desktopContent && mobileContent) {
                mobileContent.textContent = desktopContent.textContent;
            }
        });

        const mapDescription = document.getElementById('map-description');
        if (mapDescription) {
            observer.observe(mapDescription, { childList: true, subtree: true, characterData: true });
        }

        // Sincronizar última actualización
        const lastUpdated = document.getElementById('last-updated');
        const mobileUpdateTime = document.getElementById('mobile-update-time');
        if (lastUpdated && mobileUpdateTime) {
            const updateObserver = new MutationObserver(() => {
                mobileUpdateTime.textContent = lastUpdated.textContent;
            });
            updateObserver.observe(lastUpdated, { childList: true, characterData: true, subtree: true });
            mobileUpdateTime.textContent = lastUpdated.textContent;
        }
    }

    syncLayers() {
        // Sincronizar control de capas de Leaflet con el bottom sheet
        const checkLayers = () => {
            if (!window.map) {
                setTimeout(checkLayers, 500);
                return;
            }

            const layersContainer = document.getElementById('mobile-layers-container');
            if (!layersContainer) return;

            // Observar cambios en el control de capas de Leaflet
            const layersControl = document.querySelector('.leaflet-control-layers');
            if (layersControl) {
                const updateMobileLayers = () => {
                    const baseLayers = layersControl.querySelectorAll('.leaflet-control-layers-base label');
                    const overlays = layersControl.querySelectorAll('.leaflet-control-layers-overlays label');

                    let html = '';

                    if (baseLayers.length > 0) {
                        html += '<div style="margin-bottom: 1.5rem;"><h4 style="margin: 0 0 0.75rem 0; padding: 0 1rem; color: var(--color-gobmx-verde); font-size: 0.9rem;">Mapas Base</h4>';
                        baseLayers.forEach(label => {
                            const input = label.querySelector('input');
                            const text = label.querySelector('span').textContent.trim();
                            const checked = input.checked ? 'checked' : '';
                            html += `
                                <label style="display: flex; align-items: center; padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;" 
                                       onmouseover="this.style.background='#f5f5f5'" 
                                       onmouseout="this.style.background='transparent'">
                                    <input type="radio" name="mobile-base-layer" value="${text}" ${checked} 
                                           style="margin-right: 0.75rem; width: 18px; height: 18px; cursor: pointer;"
                                           onchange="document.querySelectorAll('.leaflet-control-layers-base input')[Array.from(document.querySelectorAll('.leaflet-control-layers-base label span')).findIndex(s => s.textContent.trim() === '${text}')].click()">
                                    <span style="flex: 1; font-size: 0.9rem; color: #333;">${text}</span>
                                </label>
                            `;
                        });
                        html += '</div>';
                    }

                    if (overlays.length > 0) {
                        html += '<div><h4 style="margin: 0 0 0.75rem 0; padding: 0 1rem; color: var(--color-gobmx-verde); font-size: 0.9rem;">Capas Adicionales</h4>';
                        overlays.forEach(label => {
                            const input = label.querySelector('input');
                            const text = label.querySelector('span').textContent.trim();
                            const checked = input.checked ? 'checked' : '';
                            html += `
                                <label style="display: flex; align-items: center; padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s;"
                                       onmouseover="this.style.background='#f5f5f5'" 
                                       onmouseout="this.style.background='transparent'">
                                    <input type="checkbox" ${checked} 
                                           style="margin-right: 0.75rem; width: 18px; height: 18px; cursor: pointer;"
                                           onchange="document.querySelectorAll('.leaflet-control-layers-overlays input')[Array.from(document.querySelectorAll('.leaflet-control-layers-overlays label span')).findIndex(s => s.textContent.trim() === '${text}')].click()">
                                    <span style="flex: 1; font-size: 0.9rem; color: #333;">${text}</span>
                                </label>
                            `;
                        });
                        html += '</div>';
                    }

                    if (html === '') {
                        html = '<p style="color: #666; padding: 1rem;">No hay capas disponibles.</p>';
                    }

                    layersContainer.innerHTML = html;
                };

                // Actualizar inicialmente
                updateMobileLayers();

                // Observar cambios
                const observer = new MutationObserver(updateMobileLayers);
                observer.observe(layersControl, { childList: true, subtree: true, attributes: true });
            }
        };

        checkLayers();
    }

    removeMobileElements() {
        document.querySelectorAll('.mobile-menu-btn, .mobile-search-btn, .mobile-action-buttons, .mobile-layers-btn, .mobile-location-btn, .mobile-bottom-sheet, .mobile-side-drawer, .mobile-drawer-overlay, .mobile-search-modal, .mobile-map-legend').forEach(el => {
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
