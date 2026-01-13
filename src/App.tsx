import './App.css'
import { Timer } from './components/Timer/Timer'
import { PrimaryButton } from './components/PrimaryButton/PrimaryButton'

function App() {

  return (
    <>
      <h1>wave</h1>
      <Timer />
      <PrimaryButton text='Click' />
    </>
  )
}

export default App
