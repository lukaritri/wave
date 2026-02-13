import './App.css';
import { Timer } from './Timer';
import { TimerSettings } from './TimerSettings';
import { useState } from 'react';

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [totalDurationSec, setTotalDurationSec] = useState<number>(() => {
    const durationStr = localStorage.getItem('duration');
    return durationStr ? parseInt(durationStr) : 25 * 60;
  });

  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  function updateTime(newTime: number) {
    setTotalDurationSec(newTime);
    localStorage.setItem('duration', String(newTime));
  }

  return (
    <div className="app">
      <Timer
        totalDurationSec={totalDurationSec}
        toggleSettings={toggleSettings}
      />

      {showSettings ? (
        <TimerSettings
          totalDurationSec={totalDurationSec}
          updateTime={updateTime}
          toggleSettings={toggleSettings}
        />
      ) : null}
    </div>
  );
}

export default App;
