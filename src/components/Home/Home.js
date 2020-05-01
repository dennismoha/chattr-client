import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Home = props => {
  const [createdGameId, setCreatedGameId] = useState(null)

  if (createdGameId) {
    return <Redirect to={`/games/${createdGameId}/select`} />
  }

  const gameCreate = () => {
    axios({
      url: `${apiUrl}/games`,
      method: 'POST',
      data: { 'game': {
        'player1': `${props.user._id}`
      }
      },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCreatedGameId(res.data.game._id))
      .catch(() => props.msgAlert({
        heading: 'Couldnt Create Game',
        message: 'Are you signed in?',
        variant: 'danger'
      }))
  }

  const teamfight = () => (
    <Link to='/TeamFight/Select'>
      <Button type='button'>
            TeamFight!
      </Button>
    </Link>
  )

  const multiplayer = (
    <Button onClick={gameCreate} type='button'>
          Multiplayer!
    </Button>
  )

  return (
    <div>
      <h1 className="lay">Welcome to Fantasy Foragers</h1>
      <h6>{teamfight}</h6>
      <h6>{multiplayer}</h6>

    </div>
  )
}

export default Home
