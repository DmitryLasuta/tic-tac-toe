import { useState } from 'react'
import type { FieldValue } from 'types/fieldValue'
import Board from './components/board/Board'
import './App.css'

function App() {
  const [fieldset, setFieldset] = useState<FieldValue[]>(Array(9).fill(null))

  const handlePlay = (fieldsetValues: FieldValue[]) => {
    setFieldset(fieldsetValues)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} fieldset={fieldset} />
      </div>
      <ol className="game-info">{/* TODO */}</ol>
    </div>
  )
}

export default App
