"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import { useMemo, useRef, useState } from "react";
import PolyLineMarker from "@/components/PolyLineMarker";
import RoutingMachine from "@/components/RoutingMachine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Circle, MapContainer, Marker, Popup, Rectangle, TileLayer } from "react-leaflet";

export default function Home() {
  const position: any = [28.3949, 84.1240];
  const rectangle: any = [[51.49, -0.08], [51.5, -0.06]];


  const markerRef: any = useRef();

  const [draggable, setDraggable] = useState(true);
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState(position);


  const handleMarkerEvent: any = useMemo(() => ({
    dragend() {
      const marker: any = markerRef.current;
      if (marker != null) setCurrentMarkerPosition(marker.getLatLng());
    },
  }), []);

  return (
    <MapContainer
      zoom={8}
      touchZoom={true}
      center={position}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker ref={markerRef} draggable={draggable} eventHandlers={handleMarkerEvent} position={currentMarkerPosition}>
        <Popup >
          This is the center point of Nepal.
        </Popup>
      </Marker>
      <Circle center={position} pathOptions={{ fillColor: 'blue' }} radius={100} />
      <Rectangle bounds={rectangle} pathOptions={{ fillColor: 'blue' }} />
      <RoutingMachine currentPos={currentMarkerPosition} />
      <PolyLineMarker />
    </MapContainer>
  );
}
