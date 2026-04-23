import Link from "next/link";

const DISCORD_URL = "https://discord.gg/QC6H3pDxbz";

export default function PostedPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "#fafafa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: 18,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>

        <h1 style={{ fontSize: 28, marginBottom: 10 }}>
          Status posted
        </h1>

        <p style={{ color: "#666", marginBottom: 24, lineHeight: 1.5 }}>
          Your location is now visible on the map.
          You can join the live study room now, or go back to the map.
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              borderRadius: 10,
              background: "#5865F2",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            }}
          >
            Join Discord
          </a>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              borderRadius: 10,
              background: "white",
              color: "#111",
              textDecoration: "none",
              fontWeight: 600,
              border: "1px solid #ddd",
            }}
          >
            Back to map
          </Link>
        </div>
      </div>
    </main>
  );
}