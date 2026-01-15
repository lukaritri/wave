import { useState, useEffect } from 'react'

/*
Timer state
*/

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
  /*
  State updates 
  */

  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle')

  function handlePrimaryClick() {
    setTimerStatus(prev => {
      switch (prev) {
        case 'idle' :
          setEndTimeMs(Date.now() + totalDurationSec * 1000) // start timer
          return 'running'
        case 'running' : return 'paused'
        case 'paused' : return 'running'
      }
    })
  }

  function handleSecondaryClick() {
    setTimerStatus('idle')
  }

  /*
  Timer logic
  */

  const totalDurationSec: number = 20 * 60

  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec)
  const [endTimeMs, setEndTimeMs] = useState<number | null>(null)

  useEffect(() => {
    if (endTimeMs == null) return

    const tick = () => {
      const timeLeftMs = endTimeMs - Date.now()
      const timeLeftSec = Math.max(0, Math.ceil(timeLeftMs / 1000))
      setRemainingSec(timeLeftSec)
    }

    tick();
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [endTimeMs])

  const remainingMin: number = Math.floor(remainingSec / 60)

  return (
    <>
      <h1>
        {String(remainingMin).padStart(2, '0')}:{String(remainingSec % 60).padStart(2, '0')}
      </h1>

      <button onClick={handlePrimaryClick}>
        {primaryLabel[timerStatus]}
      </button>

      <SecondaryButton 
        timerStatus={timerStatus} 
        onSecondaryClick={handleSecondaryClick}
      />

    </>
  )
}
