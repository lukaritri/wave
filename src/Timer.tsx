import { useState } from 'react'

type TimerStatus = 'idle' | 'running' | 'paused'

const primaryLabel: Record<TimerStatus, string> = {
  idle : 'start',
  running : 'pause',
  paused : 'resume'
}

export function Timer() {
  const [timerStatus, changeState] = useState<TimerStatus>('idle')

  function handlePrimaryClick() {
    changeState(prev => {
      switch (prev) {
        case 'idle' : return 'running'
        case 'running' : return 'paused'
        case 'paused' : return 'idle'
      }
    })
  }

  return (
    <>
      <h1>20:00</h1>
      <button onClick={handlePrimaryClick}>{primaryLabel[timerStatus]}</button>
    </>
  )
}
