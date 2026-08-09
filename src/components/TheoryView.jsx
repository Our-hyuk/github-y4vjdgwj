import { useState } from 'react';
import { scaleLibrary, chordLibrary } from '../data/colorModes';

export default function TheoryView({ onHandoff }) {
  const [sub, setSub] = useState('scaleLib');
  const [chordKey, setChordKey] = useState('Cmaj7');
  const chord = chordLibrary[chordKey];

  return (
    <section id="theory" className="view">
      <div className="section-head">
        <div className="eyebrow mono">THEORY EXPLORER</div>
        <h1>스케일과 코드의 구조를 살펴보세요</h1>
        <p className="sub">여기서 고른 스케일은 바로 연습 생성으로 넘길 수 있습니다</p>
      </div>

      <div className="subtabs">
        <button
          className={`subtab${sub === 'scaleLib' ? ' active' : ''}`}
          onClick={() => setSub('scaleLib')}
        >
          스케일 라이브러리
        </button>
        <button
          className={`subtab${sub === 'chordBreak' ? ' active' : ''}`}
          onClick={() => setSub('chordBreak')}
        >
          코드 해체
        </button>
      </div>

      {sub === 'scaleLib' && (
        <div>
          <div className="scale-grid">
            {scaleLibrary.map((s) => (
              <button
                key={s.name}
                className="scale-card"
                onClick={() => onHandoff(s.name)}
              >
                <div className="name">{s.name}</div>
                <div className="deg mono">{s.degrees}</div>
              </button>
            ))}
          </div>
          <div className="fretboard-placeholder" />
          <p className="flow-note">카드를 클릭하면 연습 생성으로 바로 넘어갑니다 (프렛보드 표시는 다음 단계)</p>
        </div>
      )}

      {sub === 'chordBreak' && (
        <div className="card">
          <h2>
            코드 입력 <span className="mono">— 예: Cmaj7</span>
          </h2>
          <div className="field-row" style={{ marginTop: 0 }}>
            <div className="field" style={{ flex: 2 }}>
              <select value={chordKey} onChange={(e) => setChordKey(e.target.value)}>
                {Object.keys(chordLibrary).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="chord-result">
            <div className="chord-row">
              <span className="k">구성음</span>
              <span className="mono">{chord.notes}</span>
            </div>
            <div className="chord-row">
              <span className="k">기능</span>
              <span>{chord.function}</span>
            </div>
            <div className="chord-row">
              <span className="k">어울리는 스케일</span>
              <span>{chord.scales}</span>
            </div>
          </div>

          <button className="btn" style={{ marginTop: 16 }} onClick={() => onHandoff(chord.scales)}>
            이 스케일로 연습하기 →
          </button>
          <p className="flow-note">누르면 ① 연습 생성 탭으로 이동하고 스케일이 자동으로 채워집니다</p>
        </div>
      )}
    </section>
  );
}
