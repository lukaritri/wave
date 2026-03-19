import { useState, useEffect, useRef } from 'react';
import type { TimerStatus, SetState } from './types/react';
import './Timer.css';
// import { PlayChime } from './Chime';
import chimeMp3 from './assets/chime.mp3';

/*
Top-level variables
*/

const primaryLabel: Record<TimerStatus, string> = {
  idle: 'start',
  running: 'pause',
  paused: 'resume',
  end: 'end',
};

type PrimaryButtonProps = {
  timerStatus: TimerStatus;
  onPrimaryClick: () => void;
};

const secondaryLabel: string = 'end';

type SecondaryButtonProps = {
  timerStatus: TimerStatus;
  onSecondaryClick: () => void;
};

function PrimaryButton({ timerStatus, onPrimaryClick }: PrimaryButtonProps) {
  return (
    <button className="btn-primary" onClick={onPrimaryClick}>
      {primaryLabel[timerStatus]}
    </button>
  );
}

function SecondaryButton({
  timerStatus,
  onSecondaryClick,
}: SecondaryButtonProps) {
  if (timerStatus === 'idle') return null;

  return (
    <button className="btn-secondary" onClick={onSecondaryClick}>
      {secondaryLabel}
    </button>
  );
}

type TimeDisplayProps = {
  timerStatus: TimerStatus;
  toggleSettings: () => void;
  remainingSec: number;
};

function TimeDisplay({
  timerStatus,
  toggleSettings,
  remainingSec,
}: TimeDisplayProps) {
  const displayHour = Math.floor(remainingSec / 3600);
  const displayMin = Math.floor((remainingSec % 3600) / 60);
  const displaySec = remainingSec % 60;

  return (
    <button
      className={timerStatus == 'idle' ? 'time-idle' : 'time-running'}
      style={timerStatus == 'idle' ? {} : { cursor: 'default' }}
      onClick={toggleSettings}
      disabled={timerStatus != 'idle'}
    >
      {displayHour > 0 && (
        <span>
          {String(displayHour).padStart(2, '0')}
          <span className="colon">:</span>
        </span>
      )}

      {String(displayMin).padStart(2, '0')}
      <span className="colon">:</span>
      {String(displaySec).padStart(2, '0')}
    </button>
  );
}

type TimerProps = {
  timerStatus: TimerStatus;
  setTimerStatus: SetState<TimerStatus>;
  totalDurationSec: number;
  toggleSettings: () => void;
};

export function Timer({
  timerStatus,
  setTimerStatus,
  totalDurationSec,
  toggleSettings,
}: TimerProps) {
  /*
  Timer logic
  */

  // const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle');
  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec);
  const [endTimeMs, setEndTimeMs] = useState<number | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  async function unlockAudio() {
    if (!chimeRef.current || audioUnlockedRef.current) return;

    try {
      chimeRef.current.volume = 0;
      await chimeRef.current.play();
      chimeRef.current.pause();
      chimeRef.current.currentTime = 0;
      chimeRef.current.volume = 1;
      audioUnlockedRef.current = true;
      console.log('audio unlocked');
    } catch (err) {
      console.error('Audio unlock failed:', err);
    }
  }

  useEffect(() => {
    if (chimeRef.current) {
      chimeRef.current.load();
    }
    chimeRef.current = new Audio(chimeMp3);
    chimeRef.current.preload = 'auto';

    return () => {
      chimeRef.current?.pause();
      chimeRef.current = null;
    };
  }, []);

  // useEffect triggered by variables changing?
  useEffect(() => {
    if (endTimeMs === null || timerStatus === 'end') return;

    const tick = () => {
      // calculating time left more reliable than setInterval every second
      const timeLeftMs = endTimeMs - Date.now();
      const timeLeftSec = Math.max(0, Math.ceil(timeLeftMs / 1000));
      setRemainingSec(timeLeftSec);
    };

    /* I'm not a fan of how I setInterval then immediately clear it 
    if the state is not running, not sure how to improve it. */
    const id = setInterval(tick, 250);

    if (timerStatus === 'paused' || timerStatus === 'idle') {
      clearInterval(id);
    }

    return () => clearInterval(id); // needed for when re-starting the timer
  }, [endTimeMs, timerStatus]);

  useEffect(() => {
    if (remainingSec <= 0) {
      console.log('ending');
      setTimerStatus('end');

      if (chimeRef.current) {
        chimeRef.current.currentTime = 0;
        chimeRef.current.play().catch((err) => {
          console.error('Failed to play chime:', err);
        });
      }
    }
  }, [remainingSec, setTimerStatus]);

  useEffect(() => {
    setRemainingSec(totalDurationSec);
  }, [totalDurationSec]);

  /*
  Button click functions
  */

  function handlePrimaryClick() {
    unlockAudio();

    setTimerStatus((prev) => {
      switch (prev) {
        case 'idle':
          setEndTimeMs(Date.now() + totalDurationSec * 1000); // start timer
          return 'running';

        case 'running':
          return 'paused';

        case 'paused':
          setEndTimeMs(Date.now() + remainingSec * 1000); // restart timer
          return 'running';

        case 'end':
          return 'end';
      }
    });
  }

  function handleSecondaryClick() {
    if (confirm('End session and restart timer?')) {
      setTimerStatus('idle');
      setEndTimeMs(null);
      setRemainingSec(totalDurationSec);
    } else {
      // treat confirmation dialog as if timer was paused and resumed
      setEndTimeMs(Date.now() + remainingSec * 1000);
    }
  }

  return (
    <div className="timer-page">
      <h1 className={timerStatus == 'idle' ? 'brand' : 'brand-running'}>
        wave
      </h1>

      <TimeDisplay
        timerStatus={timerStatus}
        toggleSettings={toggleSettings}
        remainingSec={remainingSec}
      />

      <div className="controls">
        <PrimaryButton
          timerStatus={timerStatus}
          onPrimaryClick={handlePrimaryClick}
        />

        <SecondaryButton
          timerStatus={timerStatus}
          onSecondaryClick={handleSecondaryClick}
        />
      </div>

      <audio ref={chimeRef} src={chimeMp3} preload="auto" />
    </div>
  );
}
