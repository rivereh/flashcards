import { useCardsContext } from '../hooks/useCardsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import LoopIcon from '@mui/icons-material/Loop'
import ClearIcon from '@mui/icons-material/Clear';

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
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_CARD', payload: json })
    }
  }

  function flipCard(e) {
    let cardElem = e.target.closest('.card')
    cardElem.classList.toggle('flip')
  }

  function deleteCard() {}

  return (
    <div className='card-container' onClick={flipCard}>
      <div className='card' sx={{ cursor: 'pointer' }}>
        <div className='card-front'>
          {card.front}
          {/* <LoopIcon onClick={flipCard} className='card-flip' /> */}
          <ClearIcon onClick={handleClick} className='card-delete' />
        </div>
        <div className='card-back'>
          {card.back}
          {/* <LoopIcon onClick={flipCard} className='card-flip' /> */}
          <ClearIcon onClick={handleClick} className='card-delete' />
        </div>
      </div>
    </div>
  )
}

export default CardDetails
