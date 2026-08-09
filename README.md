# FRETLAB — 구조 와이어프레임

기타 이론(스케일/코드) 학습 + 연습 루틴 생성 도구의 초기 구조 스켈레톤입니다.
Vite + React로 구성되어 있고, 실제 생성 로직은 아직 없습니다 (화면 전환/모듈 연결 흐름 확인용).

## StackBlitz에서 열기
1. stackblitz.com 접속 → "New Project" → 아무 템플릿(예: Static/Node)으로 생성
2. 터미널에서 `rm -rf *` 로 기본 파일 비우기
3. 이 폴더 안의 파일/폴더를 전부 StackBlitz 파일 탐색기로 드래그 앤 드롭
4. 터미널에서 `npm install && npm run dev`

## 로컬에서 실행
```
npm install
npm run dev
```

## 구조
- `src/App.jsx` — 3섹션(연습생성/이론탐색/기록) 상태 관리
- `src/components/` — FretNav, PracticeView, TheoryView, LogView
- `src/data/colorModes.js` — 무빙도/고정도 색상 데이터, 스케일·코드 placeholder (다음 단계에서 실제 데이터로 교체)
- `src/index.css` — 프렛보드 테마 전역 스타일

## 다음 단계
1. 왼손 크로매틱 패턴 생성 알고리즘 (스케일/코드 기반)
2. 실제 프렛보드 시각화 컴포넌트 (지금은 placeholder)
3. 오른손 피킹 패턴 생성기
4. 박자 연습 모듈
5. 기록(Log) 저장 로직
