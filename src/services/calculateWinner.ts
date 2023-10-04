import { FieldValue } from 'types/fieldValue'

/**
 * Finds the winner in a tic-tac-toe game given the current field values.
 *
 * @param {FieldValue[]} fieldsetValues - An array of field values representing the state of the game.
 * @returns {FieldValue | null} - The winner of the game, or null if there is no winner yet.
 */
export default function calculateWinner(
  fieldsetValues: FieldValue[]
): FieldValue | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (
      fieldsetValues[a] &&
      fieldsetValues[a] === fieldsetValues[b] &&
      fieldsetValues[a] === fieldsetValues[c]
    ) {
      return fieldsetValues[a]
    }
  }
  return null
}
