"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

type Props = {
  lat: string;
  lng: string;
  onChange: (lat: string, lng: string) => void;
};

export default function LocationPicker({ lat, lng, onChange }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialLng = lng ? Number(lng) : -118.2437;
    const initialLat = lat ? Number(lat) : 34.0522;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialLng, initialLat],
      zoom: 11,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on("click", (e) => {
      const newLng = e.lngLat.lng.toFixed(6);
      const newLat = e.lngLat.lat.toFixed(6);

      onChange(newLat, newLng);

      if (markerRef.current) {
        markerRef.current.setLngLat([Number(newLng), Number(newLat)]);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([Number(newLng), Number(newLat)])
          .addTo(map);
      }
    });

    if (lat && lng) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([Number(lng), Number(lat)])
        .addTo(map);
    }

    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, onChange]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: 320, borderRadius: 12 }} />;
}