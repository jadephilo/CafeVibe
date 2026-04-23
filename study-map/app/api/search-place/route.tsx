import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    return NextResponse.json({ features: [] });
  }

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query
  )}.json?access_token=${token}&limit=10&country=US&proximity=-118.2437,34.0522`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  // 👇 关键：只保留 POI（地点）
  const filtered = (data.features || []).filter((item: any) => {
    return item.place_type?.includes("poi");
  });

  return NextResponse.json({
    features: filtered,
  });
}