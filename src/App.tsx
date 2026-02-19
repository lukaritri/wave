import './App.css';
import { Timer } from './Timer';
import { TimerSettings } from './TimerSettings';
import { Wave } from './Wave';
import { useState } from 'react';
import type { TimerStatus } from './types/react';

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [totalDurationSec, setTotalDurationSec] = useState<number>(() => {
    const durationStr = localStorage.getItem('duration');
    return durationStr ? parseInt(durationStr) : 25 * 60;
  });
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');

  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  function updateTime(newTime: number) {
    setTotalDurationSec(newTime);
    localStorage.setItem('duration', String(newTime));
  }

  return (
    <div className="app">
      <div className="main">
        <Timer
          timerStatus={timerStatus}
          setTimerStatus={setTimerStatus}
          totalDurationSec={totalDurationSec}
          toggleSettings={toggleSettings}
        />

        <Wave />
      </div>

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
