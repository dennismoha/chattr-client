import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Home = props => {
  const [createdGameId, setCreatedGameId] = useState(null)
  const [createdGameTeamId, setCreatedGameTeamId] = useState(null)

  if (createdGameId) {
    return <Redirect to={`/games/${createdGameId}/select`} />
  }

  if (createdGameTeamId) {
    return <Redirect to={`/games/${createdGameTeamId}/teamselect`} />
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

  const gameCreateTeam = () => {
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
      .then(res => setCreatedGameTeamId(res.data.game._id))
      .catch(() => props.msgAlert({
        heading: 'Couldnt Create Game',
        message: 'Are you signed in?',
        variant: 'danger'
      }))
  }

  const teamfight = (
    <Link to='/teamfight/select'>
      <Button type='button'>
          Team Fight!
      </Button>
    </Link>
  )

  const singlefight = (
    <Link to='/singlefight/select'>
      <Button type='button'>
        Solo Fight!
      </Button>
    </Link>
  )

  const multiplayer = (
    <Button onClick={gameCreate} type='button'>
          Multiplayer!
    </Button>
  )

  const multiteamfight = (
    <Button onClick={gameCreateTeam} type='button'>
          Multiplayer Team Fight!
    </Button>
  )

  return (
    <div>
      <h1 className="lay">Welcome to Fantasy Foragers</h1>
      <h6>{teamfight}</h6>
      <h6>{singlefight}</h6>
      <h6>{multiplayer}</h6>
      <h6>{multiteamfight}</h6>
    </div>
  )
}

export default Home
