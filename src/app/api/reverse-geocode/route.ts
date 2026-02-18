import { NextRequest, NextResponse } from "next/server";

const OWM_BASE = "https://api.openweathermap.org";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Both 'lat' and 'lon' are required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const url = `${OWM_BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      throw new Error(`Reverse geocoding error: ${res.status}`);
    }

    const data = await res.json();
    if (!data.length) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const item = data[0];
    return NextResponse.json({
      name: item.name,
      country: item.country,
      state: item.state || undefined,
      lat: item.lat,
      lon: item.lon,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Reverse geocoding failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
