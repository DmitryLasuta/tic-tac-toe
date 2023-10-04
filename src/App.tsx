import { useState } from 'react'
import type { FieldValue } from 'types/fieldValue'
import Board from './components/board/Board'
import './App.css'

function App() {
  const [history, setHistory] = useState<Array<FieldValue[]>>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)

  const xIsNext = currentMove % 2 === 0
  const currentFieldset = history[currentMove]

  const handlePlay = (fieldsetValues: FieldValue[]) => {
    setHistory([...history, fieldsetValues])
    setCurrentMove(history.length)
  }

  const handleRestart = () => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const jumpTo = (step: number) => {
    setCurrentMove(step)
  }

  const move = history.map((_, move) => {
    if (move > 0) {
      const desc = `Go to move #${move}`
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)} type="button">
            {desc}
          </button>
        </li>
      )
    }
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} xIsNext={xIsNext} fieldset={currentFieldset} />
      </div>
      <div className="game-control">
        <button onClick={handleRestart} type="button">
          Restart Game
        </button>
      </div>
      <ol className="game-info">{move}</ol>
    </div>
  )
}

export default App
