export const dynamic = 'force-dynamic';

import Link from "next/link";
import MapView from "@/components/MapView";
import { supabase } from "@/lib/supabase";

type HomeProps = {
  searchParams?: Promise<{
    view?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const view = params?.view === "all" ? "all" : "current";

  let query = supabase
    .from("user_statuses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (view === "current") {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    query = query.gte("created_at", twoHoursAgo);
  }

  const { data, error } = await query;

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Failed to load user statuses</h1>
        <pre>{error.message}</pre>
      </main>
    );
  }

return (
  <main style={{ width: "100vw", height: "100vh", position: "relative" }}>
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        top: 16,
        left: 16,
        display: "grid",
        gap: 10,
        background: "rgba(255,255,255,0.95)",
        padding: 12,
        borderRadius: 14,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        maxWidth: "none",
        width: "fit-content",
      }}
    >
      <div style={{ fontSize: 13, color: "#555", lineHeight: 1.4 }}>
        Studying alone? See who’s working nearby 👀
      </div>

     <div style={{ display: "grid", gap: 8 }}>
  <div style={{ display: "flex", gap: 8, flexWrap: "nowrap" }}>
    <Link href="/post" style={{ ...buttonBaseStyle, background: "#111", color: "white" }}>
      Post status
    </Link>

    <Link
      href="/?view=current"
      style={{
        ...buttonBaseStyle,
        background: view === "current" ? "#111" : "white",
        color: view === "current" ? "white" : "#111",
        border: "1px solid #ccc",
      }}
    >
      Current online
    </Link>

    <Link
      href="/?view=all"
      style={{
        ...buttonBaseStyle,
        background: view === "all" ? "#111" : "white",
        color: view === "all" ? "white" : "#111",
        border: "1px solid #ccc",
      }}
    >
      All history
    </Link>
  </div>

  <div>
    <Link
      href="/about"
      style={{
        ...buttonBaseStyle,
        background: "white",
        color: "#111",
        border: "1px solid #ccc",
      }}
    >
      About
    </Link>
  </div>
</div>
    </div>

    <MapView users={data ?? []} />
  </main>
);
}

const buttonBaseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 14,
  lineHeight: 1,
};