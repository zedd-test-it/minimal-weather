"use client";

import { motion } from "framer-motion";

interface Inspiration {
  quote: string;
  author: string;
  song: string;
  artist: string;
}

const INSPIRATIONS: Inspiration[] = [
  { quote: "오늘 할 수 있는 일에 최선을 다하라!", author: "아이작 뉴턴", song: "Here Comes The Sun", artist: "The Beatles" },
  { quote: "삶이 있는 한 희망은 있다.", author: "키케로", song: "Don't Stop Me Now", artist: "Queen" },
  { quote: "작은 기회로부터 위대한 업적이 시작된다.", author: "데모스테네스", song: "Viva La Vida", artist: "Coldplay" },
  { quote: "매일 아침, 살아있음에 감사하자!", author: "마르쿠스 아우렐리우스", song: "Beautiful Day", artist: "U2" },
  { quote: "행복은 습관이다. 몸에 지녀라!", author: "허버트 스펜서", song: "Happy", artist: "Pharrell Williams" },
  { quote: "할 수 있다고 믿으면, 정말 할 수 있다!", author: "헨리 포드", song: "Stronger", artist: "Kanye West" },
  { quote: "하는 일을 사랑하는 것이 위대함의 시작!", author: "스티브 잡스", song: "Dynamite", artist: "BTS" },
  { quote: "천 리 길도 한 걸음부터!", author: "노자", song: "Walking on Sunshine", artist: "Katrina & The Waves" },
  { quote: "실패는 성공의 어머니다!", author: "토마스 에디슨", song: "Eye of the Tiger", artist: "Survivor" },
  { quote: "지금 이 순간을 살아라!", author: "공자", song: "Spring Day", artist: "BTS" },
  { quote: "꿈을 꾸었다면, 행동으로 옮겨라!", author: "월트 디즈니", song: "A Whole New World", artist: "Aladdin OST" },
  { quote: "어두운 밤이 지나면 밝은 아침이 온다!", author: "한국 속담", song: "Sunrise", artist: "Norah Jones" },
  { quote: "가장 어두운 시간은 새벽 직전!", author: "토마스 풀러", song: "Fix You", artist: "Coldplay" },
  { quote: "오늘 걷지 않으면 내일은 뛰어야 해!", author: "한국 속담", song: "Run", artist: "BTS" },
  { quote: "스스로 생각하고, 크게 말하자!", author: "코코 샤넬", song: "Brave", artist: "Sara Bareilles" },
  { quote: "변화는 우리 안에서 시작된다!", author: "짐 론", song: "Man in the Mirror", artist: "Michael Jackson" },
  { quote: "상상력이 세상을 지배한다!", author: "아인슈타인", song: "Imagine", artist: "John Lennon" },
  { quote: "꿈을 이루려면 노력해야 해!", author: "소크라테스", song: "Lose Yourself", artist: "Eminem" },
  { quote: "비 온 뒤에 땅이 굳어진다!", author: "한국 속담", song: "After the Storm", artist: "Mumford & Sons" },
  { quote: "오늘이 가장 젊은 날이야!", author: "익명", song: "Young and Beautiful", artist: "Lana Del Rey" },
  { quote: "넘어져도 다시 일어서면 돼!", author: "넬슨 만델라", song: "Rise Up", artist: "Andra Day" },
  { quote: "꽃이 피려면 비를 견뎌야 해!", author: "익명", song: "Flowers", artist: "Miley Cyrus" },
  { quote: "포기하지 마! 지금의 노력이 미래를 바꿔!", author: "무하마드 알리", song: "Hall of Fame", artist: "The Script" },
  { quote: "밤이 어두울수록 별은 더 빛난다!", author: "도스토옙스키", song: "A Sky Full of Stars", artist: "Coldplay" },
  { quote: "계속하는 용기가 가장 중요해!", author: "윈스턴 처칠", song: "Roar", artist: "Katy Perry" },
  { quote: "할 수 있다고 생각하면 할 수 있어!", author: "붓다", song: "Believer", artist: "Imagine Dragons" },
  { quote: "지금 당장 행동하라!", author: "나폴레온 힐", song: "Now or Never", artist: "Halsey" },
  { quote: "모든 성취는 시도에서 시작된다!", author: "게일 디버스", song: "Unstoppable", artist: "Sia" },
  { quote: "넘어진 채로 있는 것이 진짜 실패야!", author: "메리 픽퍼드", song: "Titanium", artist: "Sia" },
  { quote: "아무것도 안 하면 아무 일도 안 일어나!", author: "토니 로빈스", song: "Shake It Off", artist: "Taylor Swift" },
  { quote: "당신의 시간은 한정되어 있어!", author: "스티브 잡스", song: "It's My Life", artist: "Bon Jovi" },
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
      className="kakao-card-main p-5 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex flex-col gap-4">
        {/* Quote */}
        <div className="flex gap-3 items-start">
          <span className="text-2xl shrink-0">💬</span>
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="text-xs text-amber-600/50 dark:text-amber-400/50 mt-1">
              — {author}
            </p>
          </div>
        </div>

        <div className="h-px bg-amber-200/50 dark:bg-amber-700/30" />

        {/* Music */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-2.5 shrink-0">
            <span className="text-lg">🎵</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-amber-600/50 dark:text-amber-400/50">오늘의 추천 음악</p>
            <p className="text-sm font-bold text-amber-900 dark:text-amber-100 truncate">{song}</p>
            <p className="text-xs text-amber-700/60 dark:text-amber-300/60 truncate">{artist}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
