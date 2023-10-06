import { useState } from 'react'
import type { FieldValue } from 'types/fieldValue'
import Board from './components/board/Board'
import './App.css'
import Button from '@mui/material/Button'
import { Box, ButtonGroup } from '@mui/material'

function App() {
  const [history, setHistory] = useState<Array<FieldValue[]>>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)

  const xIsNext = currentMove % 2 === 0
  const currentFieldset = history[currentMove]

  const handlePlay = (fieldsetValues: FieldValue[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), fieldsetValues]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
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
        <Button onClick={() => jumpTo(move)} type="button">
          {desc}
        </Button>
      )
    }
  })

  return (
    <Box component={'main'} sx={{ display: 'flex', gap: '20px' }} className="game">
      <Box>
        <Board onPlay={handlePlay} xIsNext={xIsNext} fieldset={currentFieldset} />
        <Button
          variant="contained"
          sx={{ width: '100%', mt: '20px' }}
          onClick={handleRestart}
          type="button"
        >
          Restart Game
        </Button>
      </Box>
      <div className="game-info">
        <h3>Game history</h3>
        <ButtonGroup orientation="vertical">{move}</ButtonGroup>
      </div>
    </Box>
  )
}

export default App
