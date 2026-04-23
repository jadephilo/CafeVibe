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
  const [placeName, setPlaceName] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <form action={action} style={{ display: "grid", gap: 16 }}>
      {/* Nickname */}
      <label>
        Nickname
        <input name="nickname" required style={inputStyle} />
      </label>

      {/* Place name */}
      <label>
        Place name
        <input
          name="place_name"
          required
          placeholder="Blue Bottle DTLA"
          style={inputStyle}
        />
      </label>

      {/* Map picker */}
      <div>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>
          Pick your location on the map
        </div>

        <LocationPicker
          lat={lat}
          lng={lng}
          onChange={(newLat, newLng) => {
            setLat(newLat);
            setLng(newLng);
          }}
        />
      </div>

      {/* Hidden lat/lng */}
      <input name="lat" value={lat} type="hidden" required />
      <input name="lng" value={lng} type="hidden" required />

      {/* Work today */}
      <label>
        What are you working on today?
        <input name="work_today" required style={inputStyle} />
      </label>

      {/* Mood */}
      <label>
        What's your mood today?
        <input
          name="mood"
          placeholder="calm / focused / tired"
          style={inputStyle}
        />
      </label>

      {/* Open to social */}
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input name="open_to_social" type="checkbox" />
        Open to social
      </label>

      {/* Submit */}
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