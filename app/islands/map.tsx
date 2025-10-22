import { useEffect, useRef } from "hono/jsx";
import { venues, type VenueData } from "../data/venues";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapContainerRef.current || mapRef.current) return;

    const loadMap = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const adachiBounds = L.latLngBounds(
        L.latLng(35.735, 139.75),
        L.latLng(35.815, 139.85)
      );

      const map = L.map(mapContainerRef.current!, {
        center: [35.747983, 139.8],
        zoom: 15,
        maxBounds: adachiBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 12,
        maxZoom: 18,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize: 256,
        zoomOffset: 0,
      }).addTo(map);

      // 会場データをマップに追加
      venues.forEach((venue) => {
        addVenueToMap(L, map, venue);
      });

      mapRef.current = map;
    };

    const addVenueToMap = (L: any, map: any, venue: VenueData) => {
      const customIcon = L.divIcon({
        className: "venue-marker",
        html: `
          <div class="venue-bubble" data-id="${venue.id}">
            <div class="bubble-content">
              <div class="venue-name">${venue.name}</div>
              <div class="venue-capacity">収容人数: ${venue.capacity}名</div>
            </div>
            <div class="bubble-tail"></div>
          </div>
        `,
        iconSize: [240, 100],
        iconAnchor: [120, 100],
      });

      const marker = L.marker([venue.lat, venue.lng], {
        icon: customIcon,
      }).addTo(map);

      // クリックでポップアップを表示
      const popupContent = `
        <div class="venue-popup">
          <h3>${venue.name}</h3>
          ${
            venue.photos.length > 0
              ? `
            <div class="venue-photos">
              ${venue.photos
                .map(
                  (photo) =>
                    `<img src="${photo}" alt="${venue.name}" class="venue-photo" />`
                )
                .join("")}
            </div>
          `
              : ""
          }
          <p class="venue-description">${venue.description}</p>
          <div class="venue-details">
            <div class="detail-item">
              <strong>住所:</strong> ${venue.address}
            </div>
            <div class="detail-item">
              <strong>アクセス:</strong> ${venue.access}
            </div>
            <div class="detail-item">
              <strong>収容人数:</strong> ${venue.capacity}名
            </div>
            <div class="detail-item">
              <strong>設備:</strong> ${venue.facilities.join(", ")}
            </div>
            <div class="detail-item">
              <strong>開催イベント:</strong> ${venue.events.join(", ")}
            </div>
            ${
              venue.url
                ? `
              <div class="detail-item">
                <strong>Webサイト:</strong> <a href="${venue.url}" target="_blank" rel="noopener noreferrer" class="venue-link">${venue.url}</a>
              </div>
            `
                : ""
            }
            <div class="tags">
              ${venue.tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 400,
        className: "venue-popup-container",
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
          .venue-marker {
            cursor: pointer;
          }

          .venue-bubble {
            position: relative;
            background: #ffffff;
            border: 2px solid #4A90E2;
            border-radius: 12px;
            padding: 12px 16px;
            max-width: 240px;
            word-wrap: break-word;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: transform 0.2s;
          }

          .venue-bubble:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          .bubble-content {
            font-size: 14px;
            color: #333;
            line-height: 1.4;
          }

          .venue-name {
            font-weight: bold;
            margin-bottom: 4px;
            color: #4A90E2;
          }

          .venue-capacity {
            font-size: 12px;
            color: #666;
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

          .venue-info {
            margin-bottom: 16px;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
          }

          .venue-info h3 {
            margin: 0 0 12px 0;
            font-size: 18px;
            color: #333;
          }

          .venue-info p {
            margin: 0;
            font-size: 14px;
            color: #666;
            line-height: 1.5;
          }

          .venue-popup h3 {
            margin: 0 0 8px 0;
            color: #4A90E2;
            font-size: 18px;
          }

          .venue-description {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #666;
          }

          .venue-details {
            font-size: 13px;
          }

          .detail-item {
            margin-bottom: 6px;
            color: #333;
          }

          .detail-item strong {
            color: #555;
          }

          .tags {
            margin-top: 12px;
          }

          .tag {
            display: inline-block;
            background: #e3f2fd;
            color: #1976d2;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 12px;
            margin-right: 4px;
          }

          .leaflet-popup-content-wrapper {
            border-radius: 8px;
          }

          .venue-popup-container .leaflet-popup-content {
            margin: 16px;
          }

          .venue-photos {
            margin: 12px 0;
          }

          .venue-photo {
            width: 100%;
            max-width: 250px;
            height: auto;
            border-radius: 6px;
            margin-bottom: 8px;
          }

          .venue-link {
            color: #1976d2;
            text-decoration: none;
          }

          .venue-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div class="venue-info">
        <h3>足立区・千住エリアの勉強会会場マップ</h3>
        <p>
          senju.devコミュニティで利用されている勉強会会場を表示しています。
          各マーカーをクリックすると詳細情報が表示されます。 全{venues.length}
          会場を掲載中。
        </p>
      </div>

      <div ref={mapContainerRef} class="leaflet-container" />
    </>
  );
}
