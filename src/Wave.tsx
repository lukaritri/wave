import './Wave.css';

function WaveSvg() {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="wave">
      <path
        d="
          M 0 10
          Q 25 0 50 10
          T 100 10
          T 150 10
          T 200 10
        "
        stroke="var(--accent)"
        fill="transparent"
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Wave() {
  return (
    <div className="wave-container">
      <div className="wave-track">
        <WaveSvg />
        <WaveSvg />
      </div>
    </div>
  );
}
