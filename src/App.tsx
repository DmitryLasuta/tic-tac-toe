import { useState } from 'react'
import type { FieldValue } from 'types/fieldValue'
import Board from './components/board/Board'
import './App.css'
import { Box, ButtonGroup, Typography, Button } from '@mui/material'

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

  /**
   * Restarts the game by resetting the history and current move.
   *
   * @return {void}
   */
  const handleRestart = (): void => {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  /**
   * Jumps to a specific step.
   *
   * @param {number} step - The step to jump to.
   */
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
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        gap: '50px',
        justifyContent: 'baseline',
        padding: '0 20px',
        minHeight: '50vh',
      }}
      className="game"
    >
      <Box sx={{ minWidth: '350px', textAlign: 'center' }}>
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
      <Box component={'section'}>
        <Typography sx={{ marginBottom: '20px' }} variant="h4">
          Game history
        </Typography>
        <ButtonGroup orientation="vertical" aria-label="game history buttons">
          {move}
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default App
