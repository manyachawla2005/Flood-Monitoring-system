/**
 * js/main.js — Navigation, clock, analysis simulation
 */

// ── Page navigation ─────────────────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));

  document.getElementById('page-' + id).classList.add('active');
  document.querySelector(`.nav-link[onclick="showPage('${id}')"]`).classList.add('active');
}

// ── UTC Clock ────────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hh}:${mm} UTC`;
}

// ── SAR Upload simulation ────────────────────────────────────────────────────
function simulateUpload(type) {
  const log = document.getElementById('upload-log');
  const steps = type === 'before'
    ? ['› Loading pre-flood SAR scene...', '› Thermal noise removal applied', '› Radiometric calibration complete', '› Terrain correction (SRTM) applied', '› Pre-flood scene ready ✓']
    : ['› Loading post-flood SAR scene...', '› Thermal noise removal applied', '› Radiometric calibration complete', '› Terrain correction (SRTM) applied', '› Post-flood scene ready ✓'];

  log.innerHTML = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i >= steps.length) { clearInterval(iv); return; }
    log.innerHTML += steps[i] + '<br>';
    log.scrollTop = log.scrollHeight;
    i++;
  }, 500);
}

// ── Analysis pipeline simulation ─────────────────────────────────────────────
function runAnalysis() {
  const log    = document.getElementById('analysis-log');
  const bar    = document.getElementById('analysis-bar');
  const status = document.getElementById('analysis-status');

  // Reset results
  ['r-acc','r-px','r-area','r-delta'].forEach(id => {
    document.getElementById(id).textContent = '—';
  });

  bar.classList.add('active');
  status.textContent = 'Running...';
  log.innerHTML = '';

  const steps = [
    '› Connecting to Google Earth Engine...',
    '› Loading Sentinel-1 IW GRD scenes...',
    '› MCDM band selection (ELECTRE method)...',
    '› Training SVM classifier (RBF, C=10)...',
    '› Thresholding backscatter at -18dB...',
    '› Computing pre/post change image...',
    '› Calculating flood area statistics...',
    '› Integrating CHIRPS rainfall layer...',
    '› Extracting low-elevation zones (DEM)...',
    '› Computing Flood Risk Index (FRI)...',
    '› Running accuracy assessment...',
    '› Analysis complete ✓',
  ];

  let i = 0;
  const iv = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(iv);
      bar.classList.remove('active');
      status.textContent = 'Complete';
      document.getElementById('r-acc').textContent   = '94.2%';
      document.getElementById('r-px').textContent    = '2.84M';
      document.getElementById('r-area').textContent  = '2,847';
      document.getElementById('r-delta').textContent = '+12.4%';
      return;
    }
    log.innerHTML += steps[i] + '<br>';
    log.scrollTop  = log.scrollHeight;
    i++;
  }, 400);
}

// ── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  updateClock();
  setInterval(updateClock, 30000);
  initMainMap();
  initCharts();
});
