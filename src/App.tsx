import { useState } from 'react'
import type { FieldValue } from 'types/fieldValue'
import Board from './components/board/Board'
import './App.css'

function App() {
  const [fieldset, setFieldset] = useState<FieldValue[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handlePlay = (fieldsetValues: FieldValue[]) => {
    setXIsNext(!xIsNext)
    setFieldset(fieldsetValues)
  }

  const handleRestart = () => {
    setFieldset(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} xIsNext={xIsNext} fieldset={fieldset} />
      </div>
      <div className="game-control">
        <button onClick={handleRestart} type="button">
          Restart Game
        </button>
      </div>
      <ol className="game-info">{/* TODO */}</ol>
    </div>
  )
}

export default App
