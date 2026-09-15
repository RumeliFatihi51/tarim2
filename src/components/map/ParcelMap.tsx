import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Parcel, FullAnalysisPayload } from '../../types';
import { Layers, ZoomIn, ZoomOut, Compass, Sparkles, Check, X } from 'lucide-react';

interface ParcelMapProps {
  parcels: Parcel[];
  selectedParcel: Parcel | null;
  onSelectParcel: (parcel: Parcel) => void;
  isDrawingMode: boolean;
  onFinishDrawing: (coords: [number, number][]) => void;
  onCancelDrawing: () => void;
  analysisPayload?: FullAnalysisPayload | null;
}

export const ParcelMap: React.FC<ParcelMapProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  isDrawingMode,
  onFinishDrawing,
  onCancelDrawing,
  analysisPayload,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<L.Polygon[]>([]);
  const drawPolygonRef = useRef<L.Polygon | null>(null);
  const drawMarkersRef = useRef<L.CircleMarker[]>([]);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [baseLayerType, setBaseLayerType] = useState<'satellite' | 'streets'>('satellite');
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Menemen / Gediz Havzası default center
    const defaultCenter: [number, number] = [38.642, 27.119];

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    const satTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Esri World Imagery',
    });

    satTiles.addTo(map);
    tileLayerRef.current = satTiles;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Layer Switch
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let maxZoom = 19;
    if (baseLayerType === 'streets') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      maxZoom = 19;
    }

    const newLayer = L.tileLayer(url, { maxZoom }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  }, [baseLayerType]);

  // Render Parcels Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing parcel polygons
    polygonLayersRef.current.forEach((l) => l.remove());
    polygonLayersRef.current = [];

    parcels.forEach((parcel) => {
      if (!parcel.polygon || parcel.polygon.length < 3) return;

      const isSelected = selectedParcel?.id === parcel.id;
      const isHealthy = parcel.status === 'healthy';
      const isHighRisk = parcel.status === 'high-risk';

      const color = isSelected
        ? '#10b981' // emerald
        : isHealthy
        ? '#059669'
        : isHighRisk
        ? '#f43f5e'
        : '#f59e0b';

      const polygon = L.polygon(parcel.polygon as L.LatLngExpression[], {
        color,
        weight: isSelected ? 3 : 2,
        fillColor: color,
        fillOpacity: isSelected ? 0.45 : 0.25,
      }).addTo(map);

      polygon.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 11px; padding: 2px 4px; font-weight: 700;">
          ${parcel.name}<br/>
          <span style="color: #64748b; font-size: 10px;">${parcel.crop} • ${parcel.areaHa} ha</span>
        </div>`,
        { sticky: true, className: 'terrasat-leaflet-tooltip' }
      );

      polygon.on('click', () => {
        onSelectParcel(parcel);
      });

      polygonLayersRef.current.push(polygon);
    });

    // Fly to selected parcel if exists
    if (selectedParcel?.polygon && selectedParcel.polygon.length >= 3) {
      const bounds = L.latLngBounds(selectedParcel.polygon as L.LatLngExpression[]);
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 16, duration: 1 });
    }
  }, [parcels, selectedParcel, onSelectParcel]);

  // Handle Drawing Mode Click
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (!isDrawingMode) {
      // Clear drawing state
      if (drawPolygonRef.current) {
        drawPolygonRef.current.remove();
        drawPolygonRef.current = null;
      }
      drawMarkersRef.current.forEach((m) => m.remove());
      drawMarkersRef.current = [];
      setDrawnPoints([]);
      map.getContainer().style.cursor = '';
      return;
    }

    map.getContainer().style.cursor = 'crosshair';

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const newPt: [number, number] = [e.latlng.lat, e.latlng.lng];
      setDrawnPoints((prev) => {
        const next = [...prev, newPt];
        // Redraw polygon
        if (drawPolygonRef.current) {
          drawPolygonRef.current.remove();
        }
        if (next.length >= 3) {
          drawPolygonRef.current = L.polygon(next, {
            color: '#f59e0b',
            weight: 2,
            dashArray: '5, 5',
            fillColor: '#f59e0b',
            fillOpacity: 0.3,
          }).addTo(map);
        }

        // Add marker at vertex
        const marker = L.circleMarker(newPt, {
          radius: 5,
          color: '#ffffff',
          fillColor: '#f59e0b',
          fillOpacity: 1,
          weight: 2,
        }).addTo(map);
        drawMarkersRef.current.push(marker);

        return next;
      });
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [isDrawingMode]);

  const handleCompleteDrawing = () => {
    if (drawnPoints.length >= 3) {
      onFinishDrawing(drawnPoints);
    }
  };

  return (
    <div className="relative w-full h-full select-none">
      {/* Map DOM target */}
      <div ref={mapContainerRef} className="w-full h-full bg-[#070b16] z-0" />

      {/* Top Map Tools / Layers Switcher */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Layer Switcher */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 shadow-xl flex items-center gap-1 text-xs">
          <button
            onClick={() => setBaseLayerType('satellite')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              baseLayerType === 'satellite'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Uydu (Esri)
          </button>
          <button
            onClick={() => setBaseLayerType('streets')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              baseLayerType === 'streets'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Harita (OSM)
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl overflow-hidden shadow-xl flex flex-col text-slate-200">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-2 hover:bg-slate-800 transition border-b border-slate-800"
            title="Yakınlaş"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-2 hover:bg-slate-800 transition"
            title="Uzaklaş"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drawing Toolbar Overlay */}
      {isDrawingMode && (
        <div className="absolute top-4 left-4 z-20 bg-slate-900/95 backdrop-blur-md border border-amber-500/60 rounded-2xl p-3 shadow-2xl flex items-center gap-3 text-slate-100">
          <div className="text-xs">
            <span className="font-bold text-amber-400 block">Özel Poligon Çizimi</span>
            <span className="text-slate-400">
              Haritada sınırlara tıklayın ({drawnPoints.length} nokta eklendi)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompleteDrawing}
              disabled={drawnPoints.length < 3}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition disabled:opacity-40"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Tamamla</span>
            </button>
            <button
              onClick={onCancelDrawing}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
            >
              <X className="w-3.5 h-3.5" />
              <span>İptal</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10 hidden md:flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-300 shadow-xl">
        <span className="font-bold text-slate-400 uppercase text-[10px]">Durum:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Sağlıklı</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Orta Vigor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>Yüksek Risk</span>
        </div>
        <span className="text-slate-500">|</span>
        <span className="text-[10px] text-slate-400 font-mono">10m Sentinel-2 BOA</span>
      </div>
    </div>
  );
};
