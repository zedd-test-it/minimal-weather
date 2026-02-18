"use client";

import { motion } from "framer-motion";
import { Quote, Music } from "lucide-react";

interface Inspiration {
  quote: string;
  author: string;
  song: string;
  artist: string;
}

const INSPIRATIONS: Inspiration[] = [
  {
    quote: "오늘 할 수 있는 일에 최선을 다하라. 그러면 내일은 한 걸음 더 나아갈 수 있다.",
    author: "아이작 뉴턴",
    song: "Here Comes The Sun",
    artist: "The Beatles",
  },
  {
    quote: "삶이 있는 한 희망은 있다.",
    author: "키케로",
    song: "Don't Stop Me Now",
    artist: "Queen",
  },
  {
    quote: "작은 기회로부터 종종 위대한 업적이 시작된다.",
    author: "데모스테네스",
    song: "Viva La Vida",
    artist: "Coldplay",
  },
  {
    quote: "매일 아침 눈을 뜰 때, 오늘 하루도 살아있음에 감사하라.",
    author: "마르쿠스 아우렐리우스",
    song: "Beautiful Day",
    artist: "U2",
  },
  {
    quote: "행복은 습관이다. 그것을 몸에 지녀라.",
    author: "허버트 스펜서",
    song: "Happy",
    artist: "Pharrell Williams",
  },
  {
    quote: "당신이 할 수 있다고 믿든, 할 수 없다고 믿든, 당신 말이 맞다.",
    author: "헨리 포드",
    song: "Stronger",
    artist: "Kanye West",
  },
  {
    quote: "위대한 일을 하는 유일한 방법은 하는 일을 사랑하는 것이다.",
    author: "스티브 잡스",
    song: "Dynamite",
    artist: "BTS",
  },
  {
    quote: "천 리 길도 한 걸음부터 시작된다.",
    author: "노자",
    song: "Walking on Sunshine",
    artist: "Katrina & The Waves",
  },
  {
    quote: "실패는 성공의 어머니다.",
    author: "토마스 에디슨",
    song: "Eye of the Tiger",
    artist: "Survivor",
  },
  {
    quote: "지금 이 순간을 살아라. 내일은 아직 오지 않았다.",
    author: "공자",
    song: "Spring Day",
    artist: "BTS",
  },
  {
    quote: "꿈을 꾸는 것만으로는 부족하다. 행동으로 옮겨야 한다.",
    author: "월트 디즈니",
    song: "A Whole New World",
    artist: "Aladdin OST",
  },
  {
    quote: "어두운 밤이 지나면 반드시 밝은 아침이 온다.",
    author: "한국 속담",
    song: "Sunrise",
    artist: "Norah Jones",
  },
  {
    quote: "가장 어두운 시간은 새벽 직전이다.",
    author: "토마스 풀러",
    song: "Fix You",
    artist: "Coldplay",
  },
  {
    quote: "오늘 걷지 않으면 내일은 뛰어야 한다.",
    author: "한국 속담",
    song: "Run",
    artist: "BTS",
  },
  {
    quote: "세상에서 가장 용기 있는 행동은 스스로 생각하고 그것을 크게 말하는 것이다.",
    author: "코코 샤넬",
    song: "Brave",
    artist: "Sara Bareilles",
  },
  {
    quote: "변화는 바깥에서 오지 않는다. 변화는 우리 안에서 시작된다.",
    author: "짐 론",
    song: "Man in the Mirror",
    artist: "Michael Jackson",
  },
  {
    quote: "지식이 아닌 상상력이 세상을 지배한다.",
    author: "알베르트 아인슈타인",
    song: "Imagine",
    artist: "John Lennon",
  },
  {
    quote: "인생에서 가장 중요한 것은 꿈을 갖는 것이 아니라, 꿈을 이루기 위해 노력하는 것이다.",
    author: "소크라테스",
    song: "Lose Yourself",
    artist: "Eminem",
  },
  {
    quote: "비가 온 뒤에 땅이 굳어진다.",
    author: "한국 속담",
    song: "After the Storm",
    artist: "Mumford & Sons",
  },
  {
    quote: "오늘이 바로 당신의 인생에서 가장 젊은 날이다.",
    author: "익명",
    song: "Young and Beautiful",
    artist: "Lana Del Rey",
  },
  {
    quote: "할 수 있다고 생각하면 할 수 있고, 할 수 없다고 생각하면 할 수 없다.",
    author: "붓다",
    song: "Believer",
    artist: "Imagine Dragons",
  },
  {
    quote: "아무것도 하지 않으면 아무 일도 일어나지 않는다.",
    author: "토니 로빈스",
    song: "Shake It Off",
    artist: "Taylor Swift",
  },
  {
    quote: "지금 당장 행동하라. 완벽한 시기란 오지 않는다.",
    author: "나폴레온 힐",
    song: "Now or Never",
    artist: "Halsey",
  },
  {
    quote: "포기하지 마라. 지금 고생하는 것이 앞으로의 인생을 바꿀 것이다.",
    author: "무하마드 알리",
    song: "Hall of Fame",
    artist: "The Script ft. will.i.am",
  },
  {
    quote: "당신의 시간은 한정되어 있다. 남의 인생을 사느라 낭비하지 마라.",
    author: "스티브 잡스",
    song: "It's My Life",
    artist: "Bon Jovi",
  },
  {
    quote: "모든 성취는 시도하겠다는 결심에서 시작된다.",
    author: "게일 디버스",
    song: "Unstoppable",
    artist: "Sia",
  },
  {
    quote: "넘어지는 것은 실패가 아니다. 넘어진 채로 있는 것이 실패다.",
    author: "메리 픽퍼드",
    song: "Titanium",
    artist: "David Guetta ft. Sia",
  },
  {
    quote: "밤이 어두울수록 별은 더 빛난다.",
    author: "도스토옙스키",
    song: "A Sky Full of Stars",
    artist: "Coldplay",
  },
  {
    quote: "성공은 최종이 아니며, 실패는 치명적이지 않다. 계속하는 용기가 중요하다.",
    author: "윈스턴 처칠",
    song: "Roar",
    artist: "Katy Perry",
  },
  {
    quote: "가장 큰 영광은 넘어지지 않는 것이 아니라, 넘어질 때마다 일어서는 것이다.",
    author: "넬슨 만델라",
    song: "Rise Up",
    artist: "Andra Day",
  },
  {
    quote: "꽃이 피기 위해서는 비를 견뎌야 한다.",
    author: "익명",
    song: "Flowers",
    artist: "Miley Cyrus",
  },
];

function getDailyInspiration(): Inspiration {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return INSPIRATIONS[dayOfYear % INSPIRATIONS.length];
}

export function DailyInspiration() {
  const { quote, author, song, artist } = getDailyInspiration();

  return (
    <motion.div
      className="glass-elevated rounded-2xl p-5 text-white overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Decorative accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-[0.06] pointer-events-none"
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col gap-4">
        {/* Quote */}
        <div className="flex gap-3">
          <Quote className="w-5 h-5 shrink-0 mt-0.5 opacity-50" />
          <div className="space-y-2">
            <p className="text-sm leading-relaxed italic">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-xs opacity-60">— {author}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Music */}
        <div className="flex items-center gap-3">
          <div className="glass rounded-full p-2 shrink-0">
            <Music className="w-3.5 h-3.5 opacity-70" />
          </div>
          <div className="min-w-0">
            <p className="text-xs opacity-50 mb-0.5">오늘의 추천 음악</p>
            <p className="text-sm font-medium truncate">{song}</p>
            <p className="text-xs opacity-60 truncate">{artist}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
