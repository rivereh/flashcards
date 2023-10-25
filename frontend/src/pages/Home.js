import { useEffect, useState } from 'react'
import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import CardDetails from '../components/CardDetails'
import CardForm from '../components/CardForm'

import AddCircleIcon from '@mui/icons-material/AddCircle'

const Home = () => {
  // const [workouts, setWorkouts] = useState(null)
  const { cards, dispatch } = useCardsContext()
  const { user } = useAuthContext()
  const [showCardForm, setShowCardForm] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('/api/cards', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const json = await response.json()

      if (response.ok) {
        // setWorkouts(json)
        dispatch({ type: 'SET_CARDS', payload: json })
      }
    }

    if (user) {
      fetchCards()
    }
  }, [dispatch, user])

  function toggleCardForm() {
    setShowCardForm(!showCardForm)
  }

  return (
    <div className='home'>
      <div className='cards'>
        {cards &&
          cards.map((card) => <CardDetails key={card._id} card={card} />)}
      </div>
      {showCardForm && <CardForm toggleCardForm={toggleCardForm} />}

      <AddCircleIcon
        sx={{
          position: 'fixed',
          right: 10,
          bottom: 10,
          width: '4rem',
          height: '4rem',
          color: '#1976d2',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={toggleCardForm}
      />
    </div>
  )
}

export default Home
