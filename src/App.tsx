import './App.css'
import { Timer } from './Timer'
import { TimerSettings } from './TimerSettings'
import { useState } from 'react'

function App() {

  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [totalDurationSec, setTotalDurationSec] = useState<number>(25)

  return (
    <div className='app'>

      <Timer />
      <TimerSettings />
      
    </div>
  )
}

export default App
