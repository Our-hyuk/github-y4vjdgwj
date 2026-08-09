import { useState } from 'react';
import { DEGREE_LABELS } from '../data/colorModes';
import { generateLeftHandRoutine } from '../utils/generateRoutine';

const DEFAULT_CHIPS = [
  { key: 'leftHand', label: '왼손 크로매틱', selected: true },
  { key: 'rightHand', label: '오른손 피킹', selected: false },
  { key: 'rhythm', label: '박자 훈련', selected: false },
  { key: 'passing', label: '코드 기반 패싱', selected: false },
];

const STRING_LABELS = ['e', 'B', 'G', 'D', 'A', 'E'];
const ROW_HEIGHT = 26;
const SLOT_WIDTH = 32;
const NOTES_PER_MEASURE = 8; // 4/4박자, 8분음표 기준 가정

function TabDisplay({ sequence, colorMode }) {
  const height = ROW_HEIGHT * STRING_LABELS.length;
  const width = SLOT_WIDTH * (sequence.length + 1) + 20;

  return (
    <div className="tab-visual-wrap">
      <div className="string-label-col" style={{ height }}>
        {STRING_LABELS.map((label) => (
          <span key={label} className="string-label" style={{ height: ROW_HEIGHT }}>
            {label}
          </span>
        ))}
      </div>

      <div className="tab-visual" style={{ height, width }}>
        {STRING_LABELS.map((_, sIdx) => (
          <div
            key={sIdx}
            className="string-line"
            style={{ top: sIdx * ROW_HEIGHT + ROW_HEIGHT / 2 }}
          />
        ))}

        <div className="measure-bar" style={{ left: 6 }} />

        {sequence.map((ev, i) => {
          const deg = colorMode === 'movable' ? ev.movableDeg : ev.fixedDeg;
          const left = 6 + SLOT_WIDTH * (i + 1);
          const top = ev.string * ROW_HEIGHT + ROW_HEIGHT / 2;
          return (
            <span key={i} className={`note-badge deg-${deg}`} style={{ left, top }}>
              {ev.fret}
            </span>
          );
        })}

        {sequence.map((_, i) => {
          const isMeasureEnd = (i + 1) % NOTES_PER_MEASURE === 0;
          const isLast = i === sequence.length - 1;
          if (!isMeasureEnd && !isLast) return null;
          const left = 6 + SLOT_WIDTH * (i + 1) + SLOT_WIDTH / 2;
          return (
            <div
              key={`bar-${i}`}
              className={`measure-bar${isLast ? ' final' : ''}`}
              style={{ left }}
            />
          );
        })}
      </div>
    </div>
  );
}


export default function PracticeView({ context }) {
  const [chips, setChips] = useState(DEFAULT_CHIPS);
  const [colorMode, setColorMode] = useState('movable');
  const [scaleName, setScaleName] = useState('마이너 펜타토닉');
  const [keyName, setKeyName] = useState('E');
  const [difficulty, setDifficulty] = useState('보통');
  const [routine, setRoutine] = useState(null);
  const [notice, setNotice] = useState('');

  const toggleChip = (key) => {
    setChips((prev) => prev.map((c) => (c.key === key ? { ...c, selected: !c.selected } : c)));
  };

  const handleGenerate = () => {
    const leftHandOn = chips.find((c) => c.key === 'leftHand')?.selected;
    if (!leftHandOn) {
      setNotice('왼손 크로매틱 체크박스를 선택해주세요 — 지금은 이 기능만 실제로 동작합니다.');
      setRoutine(null);
      return;
    }
    setNotice('');
    setRoutine(generateLeftHandRoutine({ key: keyName, scaleName, difficulty }));
  };

  const labels = DEGREE_LABELS[colorMode];

  return (
    <section id="practice" className="view">
      <div className="section-head">
        <div className="eyebrow mono">PRACTICE BUILDER</div>
        <h1>오늘 뭘 연습할지 조합하세요</h1>
        <p className="sub">왼손 · 오른손 · 박자를 골라 조합하면 매번 다른 루틴이 생성됩니다</p>
      </div>

      {context && (
        <div className="context-tag mono">↳ 이론 탐색에서 넘어온 컨텍스트: {context}</div>
      )}

      <div className="card">
        <h2>
          구성 요소 <span className="mono">— 왼손 크로매틱만 실제 동작, 나머지는 준비 중</span>
        </h2>
        <div className="chip-row">
          {chips.map((c) => (
            <button
              key={c.key}
              className={`chip${c.selected ? ' selected' : ''}`}
              onClick={() => toggleChip(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="field-row">
          <div className="field">
            <label>스케일</label>
            <select value={scaleName} onChange={(e) => setScaleName(e.target.value)}>
              <option>마이너 펜타토닉</option>
              <option>메이저 펜타토닉</option>
              <option>블루스 스케일</option>
              <option>도리안</option>
            </select>
          </div>
          <div className="field">
            <label>키</label>
            <select value={keyName} onChange={(e) => setKeyName(e.target.value)}>
              <option>E</option>
              <option>A</option>
              <option>G</option>
              <option>C</option>
            </select>
          </div>
          <div className="field">
            <label>난이도</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option>느리게 (정확도)</option>
              <option>보통</option>
              <option>빠르게 (속도)</option>
            </select>
          </div>
        </div>
      </div>

      <button className="btn" onClick={handleGenerate}>
        루틴 생성 →
      </button>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>결과</h2>

        {notice && <div className="result-empty">{notice}</div>}

        {!routine && !notice && (
          <div className="result-empty">루틴을 생성하면 탭 악보와 패턴이 여기 표시됩니다</div>
        )}

        {routine && (
          <>
            <div className="origin-tags">
              <span className="origin-tag">
                <span className="k">원본 스케일</span> {routine.key} {routine.scaleName}
              </span>
              <span className="origin-tag">
                <span className="k">컨텍스트</span> {context || '직접 선택'}
              </span>
            </div>

            <div className="segmented">
              <button
                className={`seg-btn${colorMode === 'movable' ? ' active' : ''}`}
                onClick={() => setColorMode('movable')}
              >
                무빙도 <span className="seg-sub">근음 = 항상 빨강</span>
              </button>
              <button
                className={`seg-btn${colorMode === 'fixed' ? ' active' : ''}`}
                onClick={() => setColorMode('fixed')}
              >
                고정도 <span className="seg-sub">C = 항상 빨강</span>
              </button>
            </div>

            <div className="legend">
              {labels.map((label, i) => (
                <span className="legend-item" key={i}>
                  <span className={`swatch deg-${i + 1}`} />
                  {label}
                </span>
              ))}
            </div>

            <TabDisplay sequence={routine.sequence} colorMode={colorMode} />

            <p className="flow-note">
              포지션: {routine.boxStart}~{routine.boxEnd}프렛 · {routine.shapeLabel} · {routine.tempoHint}
            </p>
          </>
        )}
      </div>
    </section>
  );
}