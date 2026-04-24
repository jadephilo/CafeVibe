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
  discord_username: string | null;
};

export default function MapView({ users }: { users: UserStatus[] }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const rowStyle = `
  display:flex;
  align-items:center;
  gap:8px;
  margin-top:6px;
  line-height:1.2;
`;

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

    <div style="font-weight:600;margin-bottom:8px;">
      ${user.nickname}
    </div>

    <div style="${rowStyle}">
      <span>📍</span>
      <span>${user.place_name}</span>
    </div>

    <div style="${rowStyle}">
      <span>😊</span>
      <span>${user.mood ?? ""}</span>
    </div>

    <div style="${rowStyle}">
      <span>📖</span>
      <span>${user.work_today ?? ""}</span>
    </div>

    <div style="${rowStyle}">
      <span>${user.open_to_social ? "🟣" : "⚪"}</span>
      <span>${user.open_to_social ? "open to social" : "quiet mode"}</span>
    </div>

    ${
      user.open_to_social && user.discord_username
        ? `<div style="${rowStyle}">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2">
    <path d="M20 4a16.3 16.3 0 0 0-4-1.2l-.2.4a15.4 15.4 0 0 0-7.6 0L8 2.8A16.3 16.3 0 0 0 4 4C1.6 7.6.8 11.1 1.2 14.6A16.5 16.5 0 0 0 6 17l.8-1.3a10.7 10.7 0 0 1-1.7-.8l.4-.3a12 12 0 0 0 10.9 0l.4.3a10.7 10.7 0 0 1-1.7.8l.8 1.3a16.5 16.5 0 0 0 4.8-2.4C23.2 11.1 22.4 7.6 20 4zM9.5 13.2c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm5 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z"/>
  </svg>
  <span>${user.discord_username}</span>
</div>`
        : ""
    }

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

  return (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  </div>
);
}

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 10,
  background: "#111",
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
};

const secondaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 10,
  background: "white",
  color: "#111",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
  border: "1px solid #ddd",
};