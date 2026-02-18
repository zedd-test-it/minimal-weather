import { NextRequest, NextResponse } from "next/server";
import { geocodeCity } from "@/lib/weather-api";

const KOREAN_TO_ENGLISH: Record<string, string> = {
  서울: "Seoul",
  부산: "Busan",
  인천: "Incheon",
  대구: "Daegu",
  대전: "Daejeon",
  광주: "Gwangju",
  울산: "Ulsan",
  수원: "Suwon",
  제주: "Jeju",
  세종: "Sejong",
  창원: "Changwon",
  성남: "Seongnam",
  고양: "Goyang",
  용인: "Yongin",
  청주: "Cheongju",
  전주: "Jeonju",
  천안: "Cheonan",
  안산: "Ansan",
  포항: "Pohang",
  김해: "Gimhae",
  춘천: "Chuncheon",
  원주: "Wonju",
  강릉: "Gangneung",
  여수: "Yeosu",
  목포: "Mokpo",
  경주: "Gyeongju",
  도쿄: "Tokyo",
  오사카: "Osaka",
  베이징: "Beijing",
  상하이: "Shanghai",
  뉴욕: "New York",
  런던: "London",
  파리: "Paris",
  시드니: "Sydney",
  싱가포르: "Singapore",
  방콕: "Bangkok",
  하노이: "Hanoi",
  로마: "Rome",
  바르셀로나: "Barcelona",
  베를린: "Berlin",
  모스크바: "Moscow",
  두바이: "Dubai",
  홍콩: "Hong Kong",
  타이베이: "Taipei",
  호치민: "Ho Chi Minh City",
  자카르타: "Jakarta",
  쿠알라룸푸르: "Kuala Lumpur",
  샌프란시스코: "San Francisco",
  로스앤젤레스: "Los Angeles",
  시카고: "Chicago",
  토론토: "Toronto",
  밴쿠버: "Vancouver",
};

function hasKorean(text: string): boolean {
  return /[\uAC00-\uD7AF]/.test(text);
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      { error: "Query parameter 'q' must be at least 2 characters" },
      { status: 400 }
    );
  }

  try {
    const trimmed = query.trim();
    const queries: string[] = [trimmed];

    if (hasKorean(trimmed)) {
      const englishName = KOREAN_TO_ENGLISH[trimmed];
      if (englishName) {
        queries.push(englishName);
      }
    }

    const allResults = await Promise.all(queries.map(geocodeCity));
    const merged = allResults.flat();

    const seen = new Set<string>();
    const unique = merged.filter((loc) => {
      const key = `${loc.lat.toFixed(2)},${loc.lon.toFixed(2)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json(unique.slice(0, 5));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to geocode";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
