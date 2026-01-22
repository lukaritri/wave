import './TimerSettings.css'
import UpArrow from './assets/up-arrow.svg?react'
import DownArrow from './assets/down-arrow.svg?react'
import { useState } from 'react'

type TimeComponentProps = {
  displayTime : number,
  increment : () => void,
  decrement : () => void
}

function TimeComponent({displayTime, increment, decrement}:TimeComponentProps) {
  return (
    <div className='timer-settings-unit'>

      <button className='icon-button' onClick={increment}>
        <UpArrow />
      </button>
      
      <div className='timer-settings-edit'>
        {String(displayTime).padStart(2, '0')}
      </div>

      <button className='icon-button' onClick={decrement}>
        <DownArrow />
      </button>
      
    </div>
  )
}

export function TimerSettings() {

  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  return (
    <div className='timer-settings'>

      <TimeComponent 
        displayTime={hours}
        increment={() => {
          setHours(Math.min(hours + 1, 59))
        }}
        decrement={() => {
          setHours(Math.max(hours - 1, 0))
        }}
      />
      
    </div>
  )
}