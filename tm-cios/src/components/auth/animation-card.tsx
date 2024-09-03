export function AnimationCard() {
  return (
    <>
      <div className="check-in-out-container">
        <div className="shape circle check-in text-sm">C • I • O • S</div>
        <div className="shape circle check-out text-sm">C • I • O • S</div>
        <div className="shape square pulse">Pulse</div>
        <div className="shape hexagon pulse-rotate">Rotate</div>
        <div className="shape triangle rotate"></div>
        <div className="arrow" style={{ top: '20%', left: '10%' }}></div>
        <div className="arrow" style={{ top: '60%', left: '80%' }}></div>
        <svg className="path" viewBox="0 0 100 100" width="200" height="200">
          <path d="M10 80 C 40 10, 65 10, 95 80" />
        </svg>
        <svg className="path" viewBox="0 0 100 100" width="200" height="200">
          <path d="M10 20 C 40 90, 65 90, 95 20" />
        </svg>
        <div className="footer">
          © {new Date().getFullYear()} | Desenvolvido por William Elesbão
        </div>
      </div>
    </>
  );
}
