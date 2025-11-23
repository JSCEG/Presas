/**
 * Configuración de mapas para el instrumento PRESAS
 */

const PRESAS_MAPS = [
    {
        name: 'Presas y Sitios Ramsar',
        description: 'Visualización de presas y sitios Ramsar en México',
        sheetUrl: null, // Sin hoja de datos por el momento
        baseMap: 'ninguno', // Mapa base ninguno
        geojsonUrl: 'https://cdn.sassoapps.com/Mapas/Electricidad/presas.geojson',
        geojsonUrlType: 'presas',
        additionalLayers: [
            {
                url: 'https://cdn.sassoapps.com/Gabvy/ramsar.geojson',
                type: 'ramsar'
            },
            {
                url: 'https://cdn.sassoapps.com/Mapas/Electricidad/usumacinta.geojson',
                type: 'usumacinta'
            }
        ],
        center: [23.6345, -102.5528], // Centro de México
        zoom: 5,
        minZoom: 4,
        maxZoom: 18
    }
];

// Hacer disponible globalmente
window.PRESAS_MAPS = PRESAS_MAPS;
