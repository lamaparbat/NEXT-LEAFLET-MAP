"use client";

import React, { useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { LumbiniToButwalPaths } from "@/lib/constants";

export default function PolyLineMarker() {
    const map = useMap();

    useEffect(() => {
        map.fitBounds([LumbiniToButwalPaths], { padding: [50, 50] })
    }, []);

    return <Polyline positions={LumbiniToButwalPaths} weight={5} color="#288dff" />;
}
