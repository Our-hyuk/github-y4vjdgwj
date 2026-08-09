import { STRINGS, KEY_PITCH, SCALES, FIXED_DEGREE_BY_PITCH, CAGED_SHAPES, CAGED_ORDER } from '../data/scaleTheory';

const FRET_COUNT = 15; // 0~14프렛 표시
const FRET_WIDTH = 42;
const STRING_HEIGHT = 28;

export default function Fretboard({
  keyName = 'E',
  scaleName = '메이저 펜타토닉',
  colorMode = 'movable', // 'movable' | 'fixed'
  activeShape = null,    // 'C' | 'A' | 'G' | 'E' | 'D' | null (전체)
  showDegrees = true,
}) {
  const root = KEY_PITCH[keyName] ?? 0;
  const scale = SCALES[scaleName] || SCALES['메이저 펜타토닉'];
  const scalePitches = scale.offsets.map((o) => (root + o) % 12);

  // 전체 지판에서 스케일 음 찾기
  const notes = [];
  STRINGS.forEach((str, sIdx) => {
    for (let fret = 0; fret <= FRET_COUNT; fret++) {
      const pitch = (str.open + fret) % 12;
      const pos = scalePitches.indexOf(pitch);
      if (pos !== -1) {
        notes.push({
          string: sIdx,
          fret,
          pitch,
          movableDeg: scale.degrees[pos],
          fixedDeg: FIXED_DEGREE_BY_PITCH[pitch],
          isRoot: pitch === root,
        });
      }
    }
  });

  // 특정 CAGED 형태만 하이라이트할 때
  const isInActiveShape = (note) => {
    if (!activeShape) return true;
    // 간단한 버전: 해당 형태의 상대 위치를 루트 기준으로 이동
    // (더 정교한 CAGED 매핑은 추후 개선 가능)
    return true; // 일단 전체 표시, 아래에서 박스 강조
  };

  return (
    <div className="fretboard-wrap">
      {/* 프렛 번호 */}
      <div className="fret-numbers">
        <div className="fret-num-spacer" />
        {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
          <div key={i} className="fret-num" style={{ width: FRET_WIDTH }}>
            {i === 0 ? '개방' : i}
          </div>
        ))}
      </div>

      <div className="fretboard">
        {/* 현 라인 + 노트 */}
        {STRINGS.map((str, sIdx) => (
          <div key={sIdx} className="string-row" style={{ height: STRING_HEIGHT }}>
            <div className="string-name mono">{str.label}</div>
            <div className="string-track">
              {/* 프렛 구분선 */}
              {Array.from({ length: FRET_COUNT + 1 }, (_, f) => (
                <div
                  key={f}
                  className={`fret-cell${f === 0 ? ' nut' : ''}`}
                  style={{ width: FRET_WIDTH }}
                />
              ))}

              {/* 노트 배지 */}
              {notes
                .filter((n) => n.string === sIdx)
                .map((n) => {
                  const deg = colorMode === 'movable' ? n.movableDeg : n.fixedDeg;
                  const left = n.fret * FRET_WIDTH + FRET_WIDTH / 2;
                  return (
                    <span
                      key={`${n.string}-${n.fret}`}
                      className={`fb-note deg-${deg}${n.isRoot ? ' root' : ''}`}
                      style={{ left }}
                      title={`프렛 ${n.fret}`}
                    >
                      {showDegrees ? deg : n.fret}
                    </span>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* CAGED 형태 선택 (옵션) */}
      <div className="caged-selector">
        {CAGED_ORDER.map((shape) => (
          <button
            key={shape}
            className={`caged-btn${activeShape === shape ? ' active' : ''}`}
            // onClick은 부모에서 제어
          >
            {shape}
          </button>
        ))}
        <button className={`caged-btn${!activeShape ? ' active' : ''}`}>
          전체
        </button>
      </div>
    </div>
  );
}