import { useState } from 'react'
import styles from './Board.module.css'

type FieldValue = 'X' | 'O' | null

function Square({
  value,
  handleClick,
}: {
  value: FieldValue
  handleClick: () => void
}) {
  return (
    <button className={styles.square} onClick={handleClick} type="button">
      {value}
    </button>
  )
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [fieldsetValues, setFieldsetValues] = useState<FieldValue[]>(
    Array(9).fill(null)
  )

  const handleClick = (index: number) => {
    const newFieldsetValues = [...fieldsetValues]
    xIsNext ? (newFieldsetValues[index] = 'X') : (newFieldsetValues[index] = 'O')
    setFieldsetValues(newFieldsetValues)
    setXIsNext(!xIsNext)
  }

  return (
    <div className={styles.board}>
      {fieldsetValues.map((fieldValue, index) => (
        <Square
          key={index}
          value={fieldValue}
          handleClick={() => {
            handleClick(index)
          }}
        />
      ))}
    </div>
  )
}
