import { useState } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import { Button } from '@mui/material'

const CardForm = ({ toggleCardForm }) => {
  const { dispatch } = useCardsContext()
  const { user } = useAuthContext()

  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const card = { front, back }

    const repsonse = await fetch('/api/cards', {
      method: 'POST',
      body: JSON.stringify(card),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await repsonse.json()

    if (!repsonse.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (repsonse.ok) {
      setFront('')
      setBack('')
      setError(null)
      setEmptyFields([])
      toggleCardForm()
      console.log('New card added', json)
      dispatch({ type: 'CREATE_CARD', payload: json })
    }
  }

  return (
    <div className='modal'>
      <div className='create-card-container'>
        <h3>Add a New Card</h3>
        <label>Front:</label>
        <input
          type='text'
          onChange={(e) => setFront(e.target.value)}
          value={front}
          className={emptyFields.includes('front') ? 'error' : ''}
        />

        <label>Back:</label>
        <input
          type='text'
          onChange={(e) => setBack(e.target.value)}
          value={back}
          className={emptyFields.includes('back') ? 'error' : ''}
        />

        <Button onClick={handleSubmit} variant='contained'>
          Add Card
        </Button>
        {error && <div className='error'>{error}</div>}
      </div>
    </div>
  )
}

export default CardForm
