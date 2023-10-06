import type { FieldValue } from 'types/fieldValue'
import calculateWinner from 'services/calculateWinner'
import { Box, Button, Typography } from '@mui/material'

/**
 * Renders a square button component.
 *
 * @param {object} props - The properties of the square button.
 * @param {FieldValue} props.value - The value displayed on the button.
 * @param {() => void} props.handleClick - The function called when the button is clicked.
 * @returns {JSX.Element} The square button component.
 */
function Square({
  value,
  handleClick,
}: {
  value: FieldValue
  handleClick: () => void
}): JSX.Element {
  return (
    <Button
      variant="outlined"
      sx={{ height: 64, fontSize: '2rem' }}
      onClick={handleClick}
      type="button"
    >
      {value}
    </Button>
  )
}

/**
 * Renders a game board with squares that can be clicked to make a move.
 *
 * @return {JSX.Element} The rendered game board.
 */
export default function Board({
  fieldset,
  xIsNext,
  onPlay,
}: {
  fieldset: FieldValue[]
  xIsNext: boolean
  onPlay: (fieldsetValues: FieldValue[]) => void
}): JSX.Element {
  const winner = calculateWinner(fieldset)
  let status: string

  if (winner !== null) {
    status = `Winner: ${winner}`
  } else if (fieldset.every(value => value !== null)) {
    status = "It's a tie!"
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  /**
   * Handles the click event for a specific index.
   *
   * @param {number} index - The index of the fieldset value.
   * @return {void} This function does not return a value.
   */
  const handleClick = (index: number): void => {
    if (fieldset[index] || winner) return

    const fieldsetValues = [...fieldset]
    xIsNext ? (fieldsetValues[index] = 'X') : (fieldsetValues[index] = 'O')

    onPlay(fieldsetValues)
  }

  return (
    <>
      <Typography variant="h3">{status}</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'fit-content',
          margin: '20px auto',
        }}
      >
        {fieldset.map((fieldValue, index) => (
          <Square
            key={index}
            value={fieldValue}
            handleClick={() => {
              handleClick(index)
            }}
          />
        ))}
      </Box>
    </>
  )
}
