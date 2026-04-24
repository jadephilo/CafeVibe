import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={badgeStyle}>Just launched in April 2026 ✨</div>

        <h1 style={titleStyle}>
          Studying alone doesn’t have to feel lonely.
        </h1>

        <p style={subtitleStyle}>
          A cozy little map for people working, reading, coding, or studying in
          cafés around Los Angeles.
        </p>

        <div style={buttonRowStyle}>
          <Link href="/" style={primaryButtonStyle}>
            Open the map
          </Link>

          <Link href="/post" style={secondaryButtonStyle}>
            Log my status
          </Link>
        </div>

        <div style={illustrationStyle}>
          <div style={mapCardStyle}>
            <div style={pinStyle}>📍</div>
            <div style={miniCardStyle}>
              <strong>Blue Bottle DTLA</strong>
              <span>3 people studying now</span>
            </div>
            <div style={{ ...floatingDotStyle, top: 42, left: 58 }}>☕</div>
            <div style={{ ...floatingDotStyle, top: 130, right: 70 }}>📖</div>
            <div style={{ ...floatingDotStyle, bottom: 48, left: 95 }}>💻</div>
            <div style={{ ...floatingDotStyle, bottom: 82, right: 110 }}>🟣</div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Why I made this</h2>
        <p style={bodyTextStyle}>
          Hi, I am Jade. I remember joining a virtual study room during the last two years of my PhD, back in COVID. Every day I turned on my camera and wrote papers with other students across the US. 
          We shared work goals, all the depressions during phds and encouraged each other through words (because who isn't depressed during phd?). After covid, we graduated and the virtual study room faded out from our lives.  
          After a few years, in a new chapter of my life, the idea came back to me again.
          I want something lighter than a social
          app and warmer than a zoom study room, so I made this app!
        </p>
      </section>

      <section style={cardsStyle}>
        <div style={cardStyle}>
          <div style={emojiStyle}>🗺️</div>
          <h3 style={cardTitleStyle}>See who’s nearby</h3>
          <p style={cardTextStyle}>
            Open the map and see people studying or working around LA cafés.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={emojiStyle}>🟣</div>
          <h3 style={cardTitleStyle}>Choose your social mode</h3>
          <p style={cardTextStyle}>
            Stay quiet, or turn on “open to social” if you’re okay with being
            reached out to.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={emojiStyle}>💬</div>
          <h3 style={cardTitleStyle}>Join the study room</h3>
          <p style={cardTextStyle}>
            If you want company, jump into the shared Discord study room.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>It’s still new</h2>
        <p style={bodyTextStyle}>
          This is an early version. The goal is simple: help people feel a little
          more accompanied while they work. If you try it, your feedback will
          shape what it becomes next.
        </p>

        <Link href="/" style={{ ...primaryButtonStyle, marginTop: 18 }}>
          Try it now
        </Link>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #fff7fb 0%, #fffaf2 45%, #f7fbff 100%)",
  color: "#262626",
  padding: "32px 20px 56px",
};

const heroStyle: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto",
  textAlign: "center",
  padding: "56px 0 34px",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: 999,
  background: "#ffe1f0",
  color: "#b83273",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 18,
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(40px, 7vw, 72px)",
  lineHeight: 1.02,
  margin: "0 auto 18px",
  maxWidth: 820,
  letterSpacing: "-0.04em",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 19,
  color: "#666",
  lineHeight: 1.6,
  maxWidth: 640,
  margin: "0 auto 28px",
};

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
};

const primaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "13px 18px",
  borderRadius: 14,
  background: "#ff4da6",
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  boxShadow: "0 10px 24px rgba(255,77,166,0.25)",
};

const secondaryButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "13px 18px",
  borderRadius: 14,
  background: "white",
  color: "#333",
  textDecoration: "none",
  fontWeight: 800,
  border: "1px solid #f0d6e4",
};

const illustrationStyle: React.CSSProperties = {
  marginTop: 42,
  display: "flex",
  justifyContent: "center",
};

const mapCardStyle: React.CSSProperties = {
  position: "relative",
  width: "min(760px, 100%)",
  height: 340,
  borderRadius: 32,
  background:
    "radial-gradient(circle at 20% 30%, #ffd6ea 0 8%, transparent 9%), radial-gradient(circle at 80% 35%, #dbeafe 0 9%, transparent 10%), radial-gradient(circle at 55% 75%, #dcfce7 0 10%, transparent 11%), linear-gradient(135deg, #ffffff, #fff4fa)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.10)",
  border: "1px solid rgba(255,255,255,0.8)",
  overflow: "hidden",
};

const pinStyle: React.CSSProperties = {
  position: "absolute",
  top: "42%",
  left: "48%",
  fontSize: 54,
  transform: "translate(-50%, -50%)",
};

const miniCardStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "52%",
  transform: "translateX(-50%)",
  background: "white",
  borderRadius: 18,
  padding: "14px 16px",
  display: "grid",
  gap: 4,
  boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
  fontSize: 14,
};

const floatingDotStyle: React.CSSProperties = {
  position: "absolute",
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
  fontSize: 24,
};

const sectionStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "34px auto 0",
  background: "rgba(255,255,255,0.72)",
  borderRadius: 28,
  padding: 28,
  boxShadow: "0 12px 34px rgba(0,0,0,0.06)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 30,
  margin: "0 0 12px",
};

const bodyTextStyle: React.CSSProperties = {
  color: "#555",
  lineHeight: 1.75,
  fontSize: 17,
  margin: 0,
};

const cardsStyle: React.CSSProperties = {
  maxWidth: 980,
  margin: "34px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: 24,
  padding: 24,
  boxShadow: "0 12px 34px rgba(0,0,0,0.06)",
};

const emojiStyle: React.CSSProperties = {
  fontSize: 34,
  marginBottom: 10,
};

const cardTitleStyle: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: 20,
};

const cardTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#666",
  lineHeight: 1.6,
};