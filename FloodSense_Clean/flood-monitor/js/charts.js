/**
 * js/charts.js — Chart.js chart definitions
 * Data sources: CHIRPS rainfall (UCSB-CHG/CHIRPS/DAILY), Sentinel-1 SAR flood stats
 */

const GRID = 'rgba(0,0,0,0.05)';
const TICKS = { color: '#a0aec0', font: { family: 'Inter', size: 10 } };

function initCharts() {

  // 1. 7-day Rainfall bar
  new Chart(document.getElementById('rainfallChart'), {
    type: 'bar',
    data: {
      labels: ['Jun 26','27','28','29','30','Jul 1','Jul 2'],
      datasets: [{
        data: [42, 95, 130, 167, 145, 172, 187],
        backgroundColor: 'rgba(221,107,32,0.6)',
        borderColor: '#dd6b20',
        borderWidth: 1,
        borderRadius: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: GRID }, ticks: TICKS },
        y: { grid: { color: GRID }, ticks: { ...TICKS, callback: v => v + 'mm' } },
      },
    },
  });

  // 2. 7-day Flood Extent line
  new Chart(document.getElementById('floodChart'), {
    type: 'line',
    data: {
      labels: ['Jun 26','27','28','29','30','Jul 1','Jul 2'],
      datasets: [{
        data: [820, 1100, 1540, 1920, 2210, 2540, 2847],
        borderColor: '#3182ce',
        backgroundColor: 'rgba(49,130,206,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: GRID }, ticks: TICKS },
        y: { grid: { color: GRID }, ticks: { ...TICKS, callback: v => v + '' } },
      },
    },
  });

  // 3. Risk Distribution doughnut
  new Chart(document.getElementById('riskChart'), {
    type: 'doughnut',
    data: {
      labels: ['High Risk', 'Moderate', 'Low Risk'],
      datasets: [{
        data: [38, 29, 33],
        backgroundColor: ['#e53e3e', '#dd6b20', '#38a169'],
        borderWidth: 0,
        hoverOffset: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11, family: 'Inter' }, color: '#718096', boxWidth: 10 } } },
    },
  });

  // 4. 30-day CHIRPS line
  const days = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date('2024-06-02');
    d.setDate(d.getDate() + i);
    days.push(`${d.getMonth()+1}/${d.getDate()}`);
  }
  new Chart(document.getElementById('rainfallLong'), {
    type: 'line',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Observed',
          data: [18,22,35,28,40,15,55,72,90,85,110,130,95,88,120,145,160,140,155,180,165,172,185,170,160,175,187,192,180,187],
          borderColor: '#dd6b20',
          backgroundColor: 'rgba(221,107,32,0.07)',
          fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2,
        },
        {
          label: 'Historical Avg',
          data: Array(30).fill(85),
          borderColor: '#cbd5e0',
          borderDash: [4,4], pointRadius: 0, borderWidth: 1.5, fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { size: 11, family: 'Inter' }, color: '#718096', boxWidth: 10 } } },
      scales: {
        x: { grid: { color: GRID }, ticks: { ...TICKS, maxTicksLimit: 8 } },
        y: { grid: { color: GRID }, ticks: TICKS },
      },
    },
  });

  // 5. Monthly anomaly bar
  new Chart(document.getElementById('anomalyChart'), {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
      datasets: [{
        label: 'Anomaly %',
        data: [-5, 8, 12, -3, 22, 48, 68],
        backgroundColor: [-5,8,12,-3,22,48,68].map(v => v > 0 ? 'rgba(229,62,62,0.6)' : 'rgba(56,161,105,0.5)'),
        borderColor:     [-5,8,12,-3,22,48,68].map(v => v > 0 ? '#e53e3e' : '#38a169'),
        borderWidth: 1, borderRadius: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: GRID }, ticks: TICKS },
        y: { grid: { color: GRID }, ticks: { ...TICKS, callback: v => v + '%' } },
      },
    },
  });

  // 6. Elevation histogram
  new Chart(document.getElementById('elevChart'), {
    type: 'bar',
    data: {
      labels: ['0–10m','10–25m','25–50m','50–100m','100–250m','>250m'],
      datasets: [{
        data: [8.2, 22.1, 31.4, 20.5, 12.3, 5.5],
        backgroundColor: ['#e53e3e','#dd6b20','#d69e2e','#3182ce','#319795','#38a169'],
        borderWidth: 0, borderRadius: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: GRID }, ticks: TICKS },
        y: { grid: { color: GRID }, ticks: { ...TICKS, callback: v => v + '%' } },
      },
    },
  });
}
