# FloodSense — Flood Monitoring & Risk Mapping

**Harshita Dhamija | S24CSEU1263 | AI & Machine Learning**

---

## How to Run

1. Open this folder in VS Code
2. Click **Go Live** at the bottom right
3. Opens at `http://localhost:5500`

---

## Project Structure

```
flood-monitor/
├── index.html       ← Page structure (HTML only)
├── css/
│   └── style.css    ← All styles
├── js/
│   ├── map.js       ← Leaflet map + flood zones
│   ├── charts.js    ← Chart.js (rainfall, flood, risk, DEM)
│   └── main.js      ← Navigation, clock, analysis pipeline
└── README.md
```

---

## Datasets (Google Earth Engine)

| Dataset | GEE ID | Use |
|---|---|---|
| Sentinel-1 SAR | `COPERNICUS/S1_GRD` | Flood detection |
| CHIRPS Rainfall | `UCSB-CHG/CHIRPS/DAILY` | Precipitation |
| SRTM DEM | `USGS/SRTMGL1_003` | Elevation |

---

## Flood Risk Index

```
FRI = (0.4 × Flood Area) + (0.3 × Rainfall) + (0.3 × Elevation)

Low Risk    < 0.4  → Green
Moderate  0.4–0.6  → Orange  
High Risk   > 0.6  → Red
```

---

## Pages

- **Dashboard** — metrics, map, risk zones, charts, event log
- **SAR Analysis** — upload scenes, configure SVM, run pipeline
- **Rainfall** — CHIRPS 30-day chart, anomaly, region stats
- **Elevation** — DEM histogram, vulnerability zones
- **Reports** — active alerts, SAR scene log
