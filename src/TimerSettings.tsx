import './TimerSettings.css';
import './App.css';
import UpArrow from './assets/up-arrow.svg?react';
import DownArrow from './assets/down-arrow.svg?react';
import { useState } from 'react';

type TimeComponentProps = {
  displayTime: number;
  increment: () => void;
  decrement: () => void;
  label: string;
};

function TimeComponent({
  displayTime,
  increment,
  decrement,
  label,
}: TimeComponentProps) {
  return (
    <div className="time-component">
      <button className="icon-button" onClick={increment}>
        <UpArrow />
      </button>

      <div className="time-component-edit">
        {String(displayTime).padStart(2, '0')}
      </div>

      <button className="icon-button" onClick={decrement}>
        <DownArrow />
      </button>

      <div className="time-component-label">{label}</div>
    </div>
  );
}

type TimerSettingsProps = {
  totalDurationSec: number;
  updateTime: (value: number) => void;
  toggleSettings: () => void;
};

export function TimerSettings({
  totalDurationSec,
  updateTime,
  toggleSettings,
}: TimerSettingsProps) {
  const [hours, setHours] = useState<number>(
    Math.floor(totalDurationSec / 3600),
  );
  const [minutes, setMinutes] = useState<number>(
    Math.floor((totalDurationSec - hours * 3600) / 60),
  );
  const [seconds, setSeconds] = useState<number>(
    totalDurationSec - hours * 3600 - minutes * 60,
  );

  function onDone() {
    const totalDurationSec = seconds + 60 * minutes + 360 * hours;
    updateTime(totalDurationSec);
    toggleSettings();
  }

  return (
    <div className="timer-settings">
      <button className="timer-settings-overlay" onClick={onDone}></button>

      <div className="timer-settings-box">
        <div className="timer-settings-row">
          <TimeComponent
            displayTime={hours}
            increment={() => {
              setHours(Math.min(hours + 1, 59));
            }}
            decrement={() => {
              setHours(Math.max(hours - 1, 0));
            }}
            label="hours"
          />

          <div className="timer-settings-colon">:</div>

          <TimeComponent
            displayTime={minutes}
            increment={() => {
              setMinutes(Math.min(minutes + 1, 59));
            }}
            decrement={() => {
              setMinutes(Math.max(minutes - 1, 0));
            }}
            label="minutes"
          />

          <div className="timer-settings-colon">:</div>

          <TimeComponent
            displayTime={seconds}
            increment={() => {
              setSeconds(Math.min(seconds + 1, 59));
            }}
            decrement={() => {
              setSeconds(Math.max(seconds - 1, 0));
            }}
            label="seconds"
          />
        </div>
      </div>
    </div>
  );
}
