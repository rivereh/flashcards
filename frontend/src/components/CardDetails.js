import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import toDate from 'date-fns/toDate'

const CardDetails = ({ card }) => {
  const { dispatch } = useCardsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/cards/' + card._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_CARD', payload: json })
    }
  }

  return (
    <div className='card-details'>
      <p>
        {/* <strong>Load (kg): </strong> */}
        {card.front}
      </p>
      <p>
        {/* <strong>Reps: </strong> */}
        {card.back}
      </p>
      {/* <p title={toDate(new Date(workout.createdAt))}>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p> */}
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  )
}

export default CardDetails
