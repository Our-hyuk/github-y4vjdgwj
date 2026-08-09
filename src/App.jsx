import { useState } from 'react';
import FretNav from './components/FretNav';
import PracticeView from './components/PracticeView';
import TheoryView from './components/TheoryView';
import LogView from './components/LogView';

export default function App() {
  const [active, setActive] = useState('practice');
  const [context, setContext] = useState('');

  const handleHandoff = (value) => {
    setContext(value);
    setActive('practice');
  };

  return (
    <>
      <div className="banner">
        🔧 <strong>구조 스케치용 와이어프레임</strong> — 실제 생성 로직 없음, 화면 전환과 모듈 연결 흐름만 확인하는 뼈대입니다
      </div>

      <div className="topbar">
        <div>
          <div className="wordmark">
            FRET<span>LAB</span>
          </div>
          <div className="tagline">스케일 · 코드 이론을 실제 손가락 연습으로</div>
        </div>
      </div>

      <FretNav active={active} onChange={setActive} />

      <main>
        {active === 'practice' && <PracticeView context={context} />}
        {active === 'theory' && <TheoryView onHandoff={handleHandoff} />}
        {active === 'log' && <LogView />}
      </main>
    </>
  );
}
