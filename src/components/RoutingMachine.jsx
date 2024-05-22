"use client";

import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

export default function RoutingMachine({ currentPos }) {
    const map = useMap();
    const [showHistorySummary, setShowHistorySummary] = useState(false);
    const travellerIcon = L.icon({ iconUrl: "/assets/explorer.png", iconSize: [40, 40] });
    const marker = L.marker(currentPos, { icon: travellerIcon }).addTo(map);

    useEffect(() => {
        const routingInstance = L.Routing.control({
            waypoints: [
                L.latLng(currentPos[0], currentPos[1]),
                L.latLng(27.50, 85.00)
            ],
            lineOptions: {
                styles: [
                    { color: '#367bf6', opacity: 1, weight: 5 }
                ]
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false
        }).addTo(map);

        routingInstance.on('routesfound', (d) => {
            const routes = d.routes?.[0]?.coordinates ?? [];

            let index = 0;
            const updateMarkerPosition = () => {
                if (index < routes.length) {
                    const cord = routes[index];
                    marker.setLatLng([cord.lat, cord.lng]);
                    index++;
                    map.panTo([cord.lat, cord.lng], { animate: true, duration: 0.5, easeLinearity: 0.5, noMoveStart: true });
                    requestAnimationFrame(updateMarkerPosition);
                }
            };

            updateMarkerPosition();
        });
    }, []);

    return null;
}
