import { useState } from 'react'

type TimerState = 'idle' | 'running' | 'paused'

const primaryLabel: Record<TimerState, string> = {
  idle : 'start',
  running : 'pause',
  paused : 'resume'
}

export function Timer() {
  const [status, changeState] = useState<TimerState>('idle')

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
      <button onClick={handlePrimaryClick}>{primaryLabel[status]}</button>
    </>
  )
}
