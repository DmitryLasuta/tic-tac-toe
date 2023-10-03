import { useState } from 'react'
import styles from './Board.module.css'

type FieldValue = 'X' | 'O' | null

function Square() {
  const [value, setValue] = useState<FieldValue>(null)

  const handleClick = () => {
    setValue('X')
  }

  return (
    <button className={styles.square} onClick={handleClick} type="button">
      {value}
    </button>
  )
}

export default function Board() {
  return (
    <div className={styles.board}>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  )
}
