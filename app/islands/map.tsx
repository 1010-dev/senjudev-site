import { useEffect, useRef, useState } from "hono/jsx";

type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  comment: string;
};

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const loadMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const adachiBounds = L.latLngBounds(
        L.latLng(35.7350, 139.7500),
        L.latLng(35.8150, 139.8500)
      );

      const map = L.map(mapContainerRef.current!, {
        center: [35.7750, 139.8000],
        zoom: 13,
        maxBounds: adachiBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 12,
        maxZoom: 18,
      });

      L.tileLayer("https://tile.openfreemap.org/styles/liberty/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 256,
        zoomOffset: 0,
      }).addTo(map);

      const savedMarkers = localStorage.getItem("adachi-map-markers");
      if (savedMarkers) {
        const parsedMarkers: MarkerData[] = JSON.parse(savedMarkers);
        setMarkers(parsedMarkers);
        
        parsedMarkers.forEach((markerData) => {
          addMarkerToMap(L, map, markerData);
        });
      }

      map.on("click", (e: any) => {
        const comment = prompt("コメントを入力してください:");
        if (comment && comment.trim()) {
          const newMarker: MarkerData = {
            id: Date.now().toString(),
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            comment: comment.trim(),
          };
          
          const updatedMarkers = [...markers, newMarker];
          setMarkers(updatedMarkers);
          localStorage.setItem("adachi-map-markers", JSON.stringify(updatedMarkers));
          
          addMarkerToMap(L, map, newMarker);
        }
      });

      mapRef.current = map;
    };

    const addMarkerToMap = (L: any, map: any, markerData: MarkerData) => {
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div class="speech-bubble" data-id="${markerData.id}">
            <div class="bubble-content">${markerData.comment}</div>
            <div class="bubble-tail"></div>
          </div>
        `,
        iconSize: [200, 80],
        iconAnchor: [100, 80],
      });

      const marker = L.marker([markerData.lat, markerData.lng], {
        icon: customIcon,
      }).addTo(map);

      marker.on("click", () => {
        if (confirm(`「${markerData.comment}」を削除しますか？`)) {
          map.removeLayer(marker);
          const currentMarkers = JSON.parse(localStorage.getItem("adachi-map-markers") || "[]");
          const updatedMarkers = currentMarkers.filter((m: MarkerData) => m.id !== markerData.id);
          localStorage.setItem("adachi-map-markers", JSON.stringify(updatedMarkers));
          setMarkers(updatedMarkers);
        }
      });
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          .custom-marker {
            cursor: pointer;
          }
          
          .speech-bubble {
            position: relative;
            background: #ffffff;
            border: 2px solid #4A90E2;
            border-radius: 12px;
            padding: 8px 12px;
            max-width: 200px;
            word-wrap: break-word;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: transform 0.2s;
          }
          
          .speech-bubble:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          
          .bubble-content {
            font-size: 14px;
            color: #333;
            line-height: 1.4;
          }
          
          .bubble-tail {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #4A90E2;
          }
          
          .bubble-tail::before {
            content: "";
            position: absolute;
            bottom: 2px;
            left: -8px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #ffffff;
          }
          
          .leaflet-container {
            height: 600px;
            width: 100%;
            border-radius: 8px;
          }
        `}
      </style>
      <div ref={mapContainerRef} class="leaflet-container" />
    </>
  );
}