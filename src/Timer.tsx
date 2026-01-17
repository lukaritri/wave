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

type PrimaryButtonProps = {
  timerStatus : TimerStatus
  onPrimaryClick : () => void
}

const secondaryLabel: string = 'end'

type SecondaryButtonProps = {
  timerStatus : TimerStatus
  onSecondaryClick : () => void
}

function PrimaryButton({timerStatus, onPrimaryClick} : PrimaryButtonProps) {
  return (
    <button className='btnPrimary' onClick={onPrimaryClick}>
      {primaryLabel[timerStatus]}
    </button>
  )
  
}

function SecondaryButton({timerStatus, onSecondaryClick} : SecondaryButtonProps) {
  if (timerStatus === 'idle') return null

  return (
    <button className='btnSecondary' onClick={onSecondaryClick}>
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
          setEndTimeMs(Date.now() + remainingSec * 1000) // restart timer
          return 'running'
      }
    })
  }

  function handleSecondaryClick() {
    if (confirm('End session and restart timer?')) {
      setTimerStatus('idle')
      setEndTimeMs(null)
      setRemainingSec(totalDurationSec)
    } else {
      // treat confirmation dialog as if timer was paused and resumed
      setEndTimeMs(Date.now() + remainingSec * 1000)
    }
  }

  return (
    <>
      <h1 className='time'>
        {String(remainingMin).padStart(2, '0')}
        <span className='colon'>:</span>
        {String(remainingSec % 60).padStart(2, '0')}
      </h1>

      <PrimaryButton
        timerStatus={timerStatus}
        onPrimaryClick={handlePrimaryClick}
      />

      <SecondaryButton 
        timerStatus={timerStatus} 
        onSecondaryClick={handleSecondaryClick}
      />

    </>
  )
}
