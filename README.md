# 프로젝트명: Minimal Weather (가칭)
**문서 버전:** 1.1  
**작성일:** 2026-02-18  
**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui

---

## 1. 프로젝트 개요 (Overview)
사용자가 선택한 지역을 기반으로 실시간 날씨 및 예보 정보를 제공하는 웹 서비스입니다. 
복잡한 수치 나열을 지양하고, **'지금 입어야 할 옷차림'**이나 **'우산 필요 여부'** 등 사용자에게 직관적인 인사이트를 제공하는 **모던하고 심플한 UI**를 지향합니다.

## 2. 디자인 컨셉 & 가이드라인 (Design & UX)
### 2.1 Design Philosophy
- **Minimalism:** 불필요한 장식을 배제하고 타이포그래피와 아이콘 위주의 레이아웃 구성.
- **Glassmorphism:** 배경에 블러 처리된 카드 UI를 사용하여 세련되고 깊이감 있는 시각적 경험 제공.
- **Dynamic Context:** 날씨 상태(맑음, 흐림, 비, 밤/낮)에 따라 배경 그라디언트 및 테마 색상 자동 변경.

### 2.2 UI Framework Strategy (shadcn/ui & Tailwind)
- **Base Components:** shadcn/ui의 `Card`, `Input`, `Button`, `Dialog`, `Skeleton` 활용.
- **Responsiveness:** Mobile First 원칙. 데스크탑에서는 그리드 레이아웃, 모바일에서는 스택 레이아웃 적용.
- **Motion:** Framer Motion을 활용하여 지역 전환 및 데이터 로딩 시 부드러운 페이드인/슬라이드 효과 적용.

---

## 3. 기능 요구 사항 (Functional Requirements)

### 3.1 지역 관리 (Location Management)
- **지역 검색:** - shadcn `Command` 컴포넌트(Combobox)를 활용한 실시간 검색어 자동 완성.
  - 도시 이름 입력 시 API를 통해 해당 지역의 좌표(Lat, Lon) 획득.
- **지역 저장:**
  - `localStorage`를 활용하여 사용자가 관심 지역으로 등록한 도시 목록 저장 (최대 5개).
  - 저장된 지역 간 탭(Tabs) 또는 스와이프로 빠른 전환.

### 3.2 날씨 정보 표시 (Weather Display)
- **현재 날씨 (Current):**
  - 기온, 체감 온도, 날씨 상태(텍스트 + 아이콘), 최고/최저 기온.
  - shadcn `Card` 컴포넌트를 활용한 정보 그룹화.
- **상세 정보 (Details):**
  - 습도, 풍속, 자외선 지수(UV), 가시거리.
  - 그리드 형태로 깔끔하게 배치.
- **시간별 예보 (Hourly):**
  - 가로 스크롤(Horizontal Scroll Area) 형태의 24시간 예보.
- **주간 예보 (Daily):**
  - 7일간의 예보 리스트 (List View).

### 3.3 사용자 설정 (Preferences)
- **단위 변환:** 섭씨(°C) / 화씨(°F) 토글 스위치.
- **테마 설정:** 시스템 설정 동기화 및 라이트/다크 모드 강제 설정 (next-themes 활용).

---

## 4. 비기능 요구 사항 (Non-Functional Requirements)

### 4.1 성능 (Performance)
- **SSR & ISR:** 초기 로딩 속도 최적화를 위해 Next.js의 Server Components 활용.
- **Caching:** 동일 지역 데이터 재요청 방지를 위한 `fetch` 캐싱 전략 수립 (Revalidate: 1800초).
- **Skeleton UI:** 데이터 로딩 중 shadcn `Skeleton`을 노출하여 레이아웃 시프트(CLS) 방지.

### 4.2 접근성 (Accessibility)
- 모든 인터랙티브 요소는 키보드 포커싱(`Tab`)이 가능해야 함.
- 스크린 리더 지원을 위해 날씨 아이콘에 적절한 `aria-label` 부여.
- 명도 대비(Contrast Ratio) 준수 (특히 날씨 테마 적용 시 텍스트 가독성 확보).

---

## 5. 데이터 구조 및 API (Data & API)

### 5.1 External API
- **Weather Provider:** OpenWeatherMap One Call API 3.0 (또는 동급 서비스).
- **Geo-coding:** 도시 이름 검색 및 좌표 변환 API.

### 5.2 핵심 데이터 모델 (TypeScript Interface 예시)
```typescript
interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    condition: string; // e.g., "Clear", "Rain"
    iconCode: string;
  };
  forecast: {
    hourly: Array<{ time: string; temp: number; icon: string }>;
    daily: Array<{ date: string; min: number; max: number; condition: string }>;
  };
}
```

---

## 6. 구현 단계 (Implementation Roadmap)

### Phase 0: 프로젝트 기반 구성 (Foundation)

| Step | 작업 | 상세 |
|------|------|------|
| 0-1 | **shadcn/ui 초기화** | `npx shadcn@latest init` → `Card`, `Button`, `Input`, `Skeleton`, `Command`, `Dialog`, `Tabs`, `Toggle` 컴포넌트 설치 |
| 0-2 | **추가 의존성 설치** | `framer-motion`, `next-themes`, `lucide-react` (아이콘) |
| 0-3 | **환경 변수 설정** | `.env.local` 파일 생성 → `OPENWEATHERMAP_API_KEY` 등록, `.env.example` 템플릿 제공 |
| 0-4 | **글로벌 스타일 & 테마** | `globals.css`에 Glassmorphism 유틸리티, 날씨별 그라디언트 CSS 변수 정의. `next-themes` 다크/라이트 모드 통합 |
| 0-5 | **프로젝트 구조 생성** | 디렉토리 스캐폴딩: `src/lib/`, `src/types/`, `src/components/`, `src/hooks/`, `src/app/api/` |

### Phase 1: 데이터 레이어 (Data Layer)

| Step | 작업 | 상세 |
|------|------|------|
| 1-1 | **TypeScript 타입 정의** | `src/types/weather.ts` — `WeatherData`, `Location`, `HourlyForecast`, `DailyForecast` 인터페이스 정의 |
| 1-2 | **API Route: Geocoding** | `src/app/api/geocode/route.ts` — 도시 이름 → 좌표 변환 (OpenWeatherMap Geocoding API). 입력 검증 + 에러 처리 |
| 1-3 | **API Route: Weather** | `src/app/api/weather/route.ts` — 좌표 기반 날씨 조회 (One Call API 3.0). `revalidate: 1800` 캐싱 전략 적용 |
| 1-4 | **API 응답 정규화** | `src/lib/weather-api.ts` — 외부 API 원본 응답을 내부 `WeatherData` 타입으로 변환하는 어댑터 함수 |

### Phase 2: 핵심 UI 컴포넌트 (Core Components)

| Step | 작업 | 상세 |
|------|------|------|
| 2-1 | **레이아웃 리팩토링** | `layout.tsx` — 메타데이터 업데이트, `ThemeProvider`(next-themes) 래핑, 폰트 설정 |
| 2-2 | **동적 배경 컴포넌트** | `src/components/weather-background.tsx` — 날씨 상태별 그라디언트 배경 + Framer Motion 전환 애니메이션 |
| 2-3 | **현재 날씨 카드** | `src/components/current-weather.tsx` — 기온, 체감온도, 상태 아이콘, 최고/최저 기온 표시. Glassmorphism Card |
| 2-4 | **상세 정보 그리드** | `src/components/weather-details.tsx` — 습도, 풍속, UV 지수, 가시거리를 2×2 그리드 카드로 배치 |
| 2-5 | **시간별 예보** | `src/components/hourly-forecast.tsx` — 가로 스크롤 24시간 예보 (shadcn ScrollArea 활용) |
| 2-6 | **주간 예보** | `src/components/daily-forecast.tsx` — 7일 예보 리스트 뷰 |
| 2-7 | **Skeleton 로딩 UI** | `src/components/weather-skeleton.tsx` — 각 컴포넌트에 대응하는 Skeleton 레이아웃 |

### Phase 3: 지역 관리 (Location Management)

| Step | 작업 | 상세 |
|------|------|------|
| 3-1 | **지역 검색 Combobox** | `src/components/location-search.tsx` — shadcn `Command` 기반 실시간 자동완성. Geocoding API 연동, 디바운스 적용 |
| 3-2 | **localStorage 훅** | `src/hooks/use-saved-locations.ts` — 관심 지역 CRUD (최대 5개), SSR 안전 처리 |
| 3-3 | **지역 탭 네비게이션** | `src/components/location-tabs.tsx` — 저장 지역 간 탭 전환 UI (shadcn `Tabs`). 추가/삭제 기능 포함 |

### Phase 4: 사용자 설정 & 테마 (Preferences & Theme)

| Step | 작업 | 상세 |
|------|------|------|
| 4-1 | **온도 단위 토글** | `src/hooks/use-temperature-unit.ts` + `src/components/unit-toggle.tsx` — °C/°F 전환. localStorage 영속화 |
| 4-2 | **다크/라이트 모드** | `src/components/theme-toggle.tsx` — next-themes 기반 시스템/수동 전환 토글 |
| 4-3 | **설정 통합** | 설정 옵션을 헤더 영역에 배치. 모바일에서는 시트(Sheet) 또는 드롭다운으로 접근 |

### Phase 5: 페이지 조립 & 통합 (Page Assembly)

| Step | 작업 | 상세 |
|------|------|------|
| 5-1 | **메인 페이지 구성** | `src/app/page.tsx` — Server Component로 초기 데이터 fetch. 모든 컴포넌트 조립 |
| 5-2 | **반응형 레이아웃** | Mobile First: 모바일=스택, 데스크탑=2컬럼 그리드. Tailwind breakpoint 활용 |
| 5-3 | **Framer Motion 통합** | 지역 전환 시 페이드인/슬라이드, 카드 진입 애니메이션. `AnimatePresence` 적용 |
| 5-4 | **에러/빈 상태 처리** | API 실패 시 에러 UI, 저장 지역 없을 때 온보딩 안내 화면 |

### Phase 6: 접근성 & 최적화 (A11y & Polish)

| Step | 작업 | 상세 |
|------|------|------|
| 6-1 | **접근성 보강** | 모든 아이콘 `aria-label`, 키보드 네비게이션 테스트, 명도 대비 검증 |
| 6-2 | **SEO & 메타데이터** | `metadata` export 최적화, Open Graph 태그 |
| 6-3 | **성능 점검** | 번들 사이즈 확인, 이미지 최적화, Lighthouse 기준 검증 |