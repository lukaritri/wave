import './TimerSettings.css'
import UpArrow from './assets/up-arrow.svg?react'
import DownArrow from './assets/down-arrow.svg?react'

function TimeComponent() {
  return (
    <div className='timer-settings-unit'>
      <UpArrow />
      <div className='timer-settings-edit'>
        00
      </div>
      <DownArrow />
    </div>
  )
}

export function TimerSettings() {
  return (
    <div className='timer-settings'>
      <TimeComponent />
    </div>
  )
}