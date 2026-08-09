const TABS = [
  { id: 'practice', num: '03', label: '연습 생성' },
  { id: 'theory', num: '05', label: '이론 탐색' },
  { id: 'log', num: '07', label: '기록' },
];

export default function FretNav({ active, onChange }) {
  return (
    <div className="fretnav">
      <div className="fretnav-strip" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`fret-tab${active === tab.id ? ' active' : ''}`}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
          >
            <span className="fret-num mono">{tab.num}</span>
            <span className="fret-label">{tab.label}</span>
            <span className="fret-dot" />
          </button>
        ))}
      </div>
    </div>
  );
}
