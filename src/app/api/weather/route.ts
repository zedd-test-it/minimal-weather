import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "@/lib/weather-api";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Both 'lat' and 'lon' query parameters are required" },
      { status: 400 }
    );
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  if (isNaN(latNum) || isNaN(lonNum)) {
    return NextResponse.json(
      { error: "'lat' and 'lon' must be valid numbers" },
      { status: 400 }
    );
  }

  if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
    return NextResponse.json(
      { error: "Coordinates out of valid range" },
      { status: 400 }
    );
  }

  try {
    const weather = await fetchWeather(latNum, lonNum);
    return NextResponse.json(weather);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch weather";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
