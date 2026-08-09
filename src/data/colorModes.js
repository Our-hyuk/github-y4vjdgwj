// 색상 모드 예시 데이터
// 무빙도(movable) = 스케일 안에서 몇 번째 음인지(1~7도)로 색이 정해짐 → 키가 바뀌어도 "근음은 항상 빨강"
// 고정도(fixed)   = 실제 음이름(C~B)으로 색이 고정됨 → 예: E는 지판 어디서든 항상 노랑(미)
//
// 지금은 하이 E현에서 E메이저 스케일 한 옥타브(프렛 0,2,4,5,7,9,11,12)를 예시로 하드코딩해뒀습니다.
// 다음 단계에서 실제 프렛보드 전체 좌표 + 임의의 스케일/키에 대해 동적으로 계산하는 함수로 교체하면 됩니다.

export const DEGREE_LABELS = {
  movable: ['도', '레', '미', '파', '솔', '라', '시'],
  fixed: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
};

export const tabData = {
  movable: {
    cells: [
      { fret: 0, deg: 1 },
      { fret: 2, deg: 2 },
      { fret: 4, deg: 3 },
      { fret: 5, deg: 4 },
      { fret: 7, deg: 5 },
      { fret: 9, deg: 6 },
      { fret: 11, deg: 7 },
      { fret: 12, deg: 1 },
    ],
    legendNote: '— 키가 바뀌어도 색은 "도수"에 고정 (근음 = 항상 빨강)',
    tabNote: '예시: E 메이저 스케일, 도수 기준 — 0=도(근음) → 12=도(옥타브), 항상 같은 자리에서 같은 색',
  },
  fixed: {
    // 반음(F#, G#, C#, D#)은 가장 가까운 자연음 색으로 근사 처리
    cells: [
      { fret: 0, deg: 3 }, // E  -> 미
      { fret: 2, deg: 4 }, // F# -> 파(근사)
      { fret: 4, deg: 5 }, // G# -> 솔(근사)
      { fret: 5, deg: 6 }, // A  -> 라
      { fret: 7, deg: 7 }, // B  -> 시
      { fret: 9, deg: 1 }, // C# -> 도(근사)
      { fret: 11, deg: 2 }, // D# -> 레(근사)
      { fret: 12, deg: 3 }, // E  -> 미
    ],
    legendNote: '— 음이름(C~B)에 색이 고정 (반음은 가까운 자연음 색으로 표시)',
    tabNote: '예시: 같은 E메이저 스케일이지만 색은 음이름 기준 — E는 지판 어디서든 항상 노랑(미)',
  },
};

// 이론 탐색 탭 - 스케일 라이브러리 placeholder (다음 단계에서 전체 데이터로 교체)
export const scaleLibrary = [
  { name: '마이너 펜타토닉', degrees: '1-♭3-4-5-♭7' },
  { name: '메이저 펜타토닉', degrees: '1-2-3-5-6' },
  { name: '블루스 스케일', degrees: '1-♭3-4-♭5-5-♭7' },
  { name: '도리안', degrees: '1-2-♭3-4-5-6-♭7' },
  { name: '믹솔리디안', degrees: '1-2-3-4-5-6-♭7' },
  { name: '아이오니안', degrees: '1-2-3-4-5-6-7' },
];

// 이론 탐색 탭 - 코드 해체 placeholder (다음 단계에서 전체 코드 사전으로 교체)
export const chordLibrary = {
  Cmaj7: { notes: 'C · E · G · B', function: '토닉 (I)', scales: 'C 아이오니안 · C 리디안' },
  Dm7: { notes: 'D · F · A · C', function: '서브도미넌트 (ii)', scales: 'D 도리안' },
  G7: { notes: 'G · B · D · F', function: '도미넌트 (V)', scales: 'G 믹솔리디안' },
  Am: { notes: 'A · C · E', function: '토닉 (vi)', scales: 'A 아이오리안(에올리안)' },
};
