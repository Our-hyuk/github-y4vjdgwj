export default function LogView() {
  return (
    <section id="log" className="view">
      <div className="section-head">
        <div className="eyebrow mono">LOG</div>
        <h1>연습 기록</h1>
        <p className="sub">생성한 루틴을 완료하면 여기 쌓입니다</p>
      </div>
      <div className="card">
        <div className="log-empty">
          <span className="mono">— · — · —</span>
          아직 기록이 없습니다.
          <br />
          연습을 생성하고 완료해보세요.
        </div>
      </div>
    </section>
  );
}
