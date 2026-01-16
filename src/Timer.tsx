import { useState, useEffect } from 'react'

/*
Top-level variables
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
  Timer logic
  */

  const [timerStatus, setTimerStatus] = useState<TimerStatus>('idle')
  const totalDurationSec: number = 20 * 60
  const [remainingSec, setRemainingSec] = useState<number>(totalDurationSec)
  const [endTimeMs, setEndTimeMs] = useState<number | null>(null)

  // useEffect runs when page re-renders
  useEffect(() => {
    if (endTimeMs === null) return

    const tick = () => {
      // calculating time left more reliable than setInterval every second
      const timeLeftMs = endTimeMs - Date.now()
      const timeLeftSec = Math.max(0, Math.ceil(timeLeftMs / 1000))
      setRemainingSec(timeLeftSec)
    }

    /* I'm not a fan of how I setInterval then immediately clear it 
    if the state is not running, not sure how to improve it. */
    const id = setInterval(tick, 250)

    if (timerStatus === 'paused' || timerStatus === 'idle') {
      clearInterval(id)
    }

    return () => clearInterval(id) // needed for when re-starting the timer
  }, [endTimeMs, timerStatus])

  const remainingMin: number = Math.floor(remainingSec / 60)

  /*
  Button click functions
  */

  function handlePrimaryClick() {
    setTimerStatus(prev => {
      switch (prev) {
        case 'idle' :
          setEndTimeMs(Date.now() + totalDurationSec * 1000) // start timer
          return 'running'

        case 'running' : 
          return 'paused'

        case 'paused' : 
          setEndTimeMs(Date.now() + remainingSec * 1000) // start timer
          return 'running'
      }
    })
  }

  function handleSecondaryClick() {
    setTimerStatus('idle')
    setEndTimeMs(null)
    setRemainingSec(totalDurationSec)
  }

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
