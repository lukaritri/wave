import { useState } from 'react';

export function Timer() {
  const [state, changeState] = useState('idle');

  function handleClick() {
    changeState(s => {
      if (s == 'idle') return 'running'
      if (s == 'running') return 'paused'
      return 'idle'
    })
  }

  const buttonText = state == 'idle' ? 'start' : state == 'running' ? 'pause' : 'resume'

  return (
    <>
      <h1>20:00</h1>
      <button onClick={handleClick}>{buttonText}</button>
    </>
  )
}
