// 표준 튜닝(EADGBE) 기준 각 현의 개방현 음이름을 절대 피치클래스(C=0)로 표현
export const STRINGS = [
  { label: 'e', open: 4 },
  { label: 'B', open: 11 },
  { label: 'G', open: 7 },
  { label: 'D', open: 2 },
  { label: 'A', open: 9 },
  { label: 'E', open: 4 },
];

export const KEY_PITCH = { E: 4, A: 9, G: 7, C: 0 };

export const SCALES = {
  '마이너 펜타토닉': { offsets: [0, 3, 5, 7, 10], degrees: [1, 3, 4, 5, 7] },
  '메이저 펜타토닉': { offsets: [0, 2, 4, 7, 9], degrees: [1, 2, 3, 5, 6] },
  '블루스 스케일': { offsets: [0, 3, 5, 6, 7, 10], degrees: [1, 3, 4, 4, 5, 7] },
  '도리안': { offsets: [0, 2, 3, 5, 7, 9, 10], degrees: [1, 2, 3, 4, 5, 6, 7] },
};

export const FIXED_DEGREE_BY_PITCH = [1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7];

export const TEMPO_HINTS = {
  '느리게 (정확도)': '♩=60–80 · 정확도 우선, 프렛 짚는 위치부터 확인',
  '보통': '♩=90–110 · 표준 연습 템포',
  '빠르게 (속도)': '♩=120+ · 스피드 트레이닝, 메트로놈 필수',
};