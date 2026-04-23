"use client";

import { useState } from "react";
import LocationPicker from "@/components/LocationPicker";

export default function PostStatusForm({
  action,
}: {
  action: (formData: FormData) => void;
}) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  return (
    <form action={action} style={{ display: "grid", gap: 16 }}>
      <label>
        Nickname
        <input name="nickname" required style={inputStyle} />
      </label>

      <label>
        Place name
        <input name="place_name" required placeholder="Blue Bottle DTLA" style={inputStyle} />
      </label>

      <div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>Pick your location on the map</div>
        <LocationPicker
          lat={lat}
          lng={lng}
          onChange={(newLat, newLng) => {
            setLat(newLat);
            setLng(newLng);
          }}
        />
      </div>

      <input name="lat" value={lat} type="hidden" required />
      <input name="lng" value={lng} type="hidden" required />

      <label>
        Mood
        <input name="mood" placeholder="calm / focused / tired" style={inputStyle} />
      </label>

      <label>
        Activity
        <input name="activity" placeholder="reading / coding / writing" style={inputStyle} />
      </label>

      <label>
        Discord URL
        <input name="discord_url" placeholder="https://discord.gg/..." style={inputStyle} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input name="open_to_social" type="checkbox" />
        Open to social
      </label>

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 8,
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#111",
  color: "white",
  fontWeight: 600,
  fontSize: 15,
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
};