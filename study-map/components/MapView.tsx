"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
const DISCORD_URL = "https://discord.gg/QC6H3pDxbz";

type UserStatus = {
  id: string;
  nickname: string;
  place_name: string;
  lat: number;
  lng: number;
  mood: string | null;
  work_today: string | null;
  open_to_social: boolean | null;
  discord_url: string | null;
};

export default function MapView({ users }: { users: UserStatus[] }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-118.2437, 34.0522],
      zoom: 11,
    });

    map.addControl(new mapboxgl.NavigationControl());

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

users.forEach((user) => {
  const popupHtml = `
    <div style="min-width:220px">
      <div style="font-weight:600;margin-bottom:8px;">${user.nickname}</div>
      <div>📍 ${user.place_name}</div>
      <div>😊 ${user.mood ?? ""}</div>
      <div>📖 ${user.work_today ?? ""}</div>
      <div>${user.open_to_social ? "🟣 open to social" : "⚪ quiet mode"}</div>

      <div style="margin-top:12px;">
        <a href="${DISCORD_URL}" target="_blank" style="
          display:inline-block;
          padding:8px 12px;
          background:#5865F2;
          color:white;
          border-radius:8px;
          text-decoration:none;
          font-weight:600;
        ">
          Join study room
        </a>
      </div>
    </div>
  `;

  const el = document.createElement("div");
  el.style.width = "24px";
  el.style.height = "24px";
  el.style.borderRadius = "999px";
  el.style.cursor = "pointer";
  el.style.background = "white";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  const inner = document.createElement("div");
  inner.style.width = "14px";
  inner.style.height = "14px";
  inner.style.borderRadius = "999px";
  inner.style.background = user.open_to_social ? "#ff2f92" : "#6b7280";

  el.appendChild(inner);

  if (user.open_to_social) {
    el.style.boxShadow = "0 0 0 5px rgba(255,47,146,0.18), 0 4px 12px rgba(0,0,0,0.2)";
  }

  const marker = new mapboxgl.Marker({ element: el })
    .setLngLat([user.lng, user.lat])
    .setPopup(new mapboxgl.Popup({ offset: 20 }).setHTML(popupHtml))
    .addTo(mapRef.current!);

  markersRef.current.push(marker);
});
  }, [users]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />;
}