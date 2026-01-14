import { useState } from 'react'

type TimerStatus = 'idle' | 'running' | 'paused'

const primaryLabel: Record<TimerStatus, string> = {
  idle : 'start',
  running : 'pause',
  paused : 'resume'
}

const secondaryLabel: string = 'end'

type SecondaryButtonProps = {
  timerStatus : TimerStatus
  onSecondaryClick : () => void
}

function SecondaryButton({timerStatus, onSecondaryClick} : SecondaryButtonProps) {
  if (timerStatus === 'idle') return null

  return (
    <button onClick={onSecondaryClick}>
      {secondaryLabel}
    </button>
  )
  
}

export function Timer() {
  const [timerStatus, changeState] = useState<TimerStatus>('idle')

  function handlePrimaryClick() {
    changeState(prev => {
      switch (prev) {
        case 'idle' : return 'running'
        case 'running' : return 'paused'
        case 'paused' : return 'running'
      }
    })
  }

  function handleSecondaryClick() {
    changeState('idle')
  }

  return (
    <>
      <h1>20:00</h1>
      <button onClick={handlePrimaryClick}>{primaryLabel[timerStatus]}</button>
      <SecondaryButton 
        timerStatus={timerStatus} 
        onSecondaryClick={handleSecondaryClick}
      />
    </>
  )
}
