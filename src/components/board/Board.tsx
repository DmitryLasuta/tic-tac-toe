import type { FieldValue } from 'types/fieldValue'
import calculateWinner from 'services/calculateWinner'
import { Box, Button, Typography } from '@mui/material'

/**
 * Renders a square component.
 *
 * @param {object} props - The properties of the square component.
 * @param {FieldValue} props.value - The value of the square.
 * @param {function} props.handleClick - The click event handler for the square.
 * @returns {JSX.Element} The rendered square component.
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
 * Renders the game board component.
 *
 * @param {Object} props - The props object.
 * @param {array} props.fieldset - The fieldset array.
 * @param {boolean} props.xIsNext - Indicates if it's X's turn.
 * @param {function} props.onPlay - The callback function when a field is played.
 * @return {JSX.Element} The rendered game board component.
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
   * Handles the click event for a specific index in the fieldset.
   *
   * @param {number} index - The index of the fieldset to handle the click for.
   * @return {void} This function does not return anything.
   */
  const handleClick = (index: number): void => {
    if (fieldset[index] || winner) return

    const fieldsetValues = [...fieldset]
    xIsNext ? (fieldsetValues[index] = 'X') : (fieldsetValues[index] = 'O')

    onPlay(fieldsetValues)
  }

  return (
    <>
      <Typography variant="h4" textTransform={'uppercase'}>
        {status}
      </Typography>
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
