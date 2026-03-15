/**
 * js/map.js — Leaflet map for flood zone visualisation
 * Datasets: Sentinel-1 SAR (COPERNICUS/S1_GRD), SRTM DEM (USGS/SRTMGL1_003)
 */

const AOI_CENTERS = {
  assam:      [26.2, 92.9],
  kerala:     [10.8, 76.3],
  bihar:      [25.1, 85.3],
  bangladesh: [23.7, 90.4],
};

const FLOOD_ZONES = {
  assam: [
    { latlng: [26.05, 92.2],  r: 35000, color: '#e53e3e', name: 'Lower Brahmaputra', fri: 0.82 },
    { latlng: [26.58, 93.36], r: 28000, color: '#e53e3e', name: 'Kaziranga Buffer',  fri: 0.78 },
    { latlng: [27.48, 94.9],  r: 20000, color: '#dd6b20', name: 'Dibrugarh District',fri: 0.61 },
    { latlng: [26.75, 94.2],  r: 15000, color: '#dd6b20', name: 'Jorhat Plains',     fri: 0.54 },
    { latlng: [27.80, 95.3],  r: 12000, color: '#38a169', name: 'Upper Assam Hills', fri: 0.28 },
  ],
  kerala: [
    { latlng: [9.9, 76.2],  r: 30000, color: '#e53e3e', name: 'Kuttanad Backwaters', fri: 0.79 },
    { latlng: [10.5, 76.5], r: 22000, color: '#dd6b20', name: 'Thrissur Plains',      fri: 0.55 },
  ],
  bihar: [
    { latlng: [25.6, 86.1], r: 32000, color: '#e53e3e', name: 'Kosi River Basin',  fri: 0.85 },
    { latlng: [26.1, 84.8], r: 25000, color: '#dd6b20', name: 'Gandak Floodplain', fri: 0.60 },
  ],
  bangladesh: [
    { latlng: [23.5, 90.2], r: 40000, color: '#e53e3e', name: 'Padma Delta',    fri: 0.88 },
    { latlng: [24.2, 91.0], r: 28000, color: '#e53e3e', name: 'Meghna Estuary', fri: 0.76 },
  ],
};

let mainMap = null;

function initMainMap() {
  mainMap = L.map('map', { attributionControl: false })
    .setView(AOI_CENTERS.assam, 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(mainMap);

  drawZones(mainMap, 'assam');
}

function drawZones(map, key) {
  const zones = FLOOD_ZONES[key] || FLOOD_ZONES.assam;
  zones.forEach(z => {
    L.circle(z.latlng, {
      radius:      z.r,
      color:       z.color,
      fillColor:   z.color,
      fillOpacity: 0.2,
      weight:      2,
    })
    .addTo(map)
    .bindPopup(`<b>${z.name}</b><br>FRI Score: <b>${z.fri}</b>`);
  });
}

function updateAOI() {
  const key = document.getElementById('aoi-select').value;
  const center = AOI_CENTERS[key] || AOI_CENTERS.assam;
  if (!mainMap) return;
  mainMap.eachLayer(l => { if (l instanceof L.Circle) mainMap.removeLayer(l); });
  mainMap.setView(center, 8);
  drawZones(mainMap, key);
}

function toggleLayer(btn) {
  btn.closest('.layer-btns').querySelectorAll('.layer-btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
