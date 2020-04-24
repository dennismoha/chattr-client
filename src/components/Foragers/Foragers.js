import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'

// import LetsFight from '../shared/LetsFight'
const Foragers = props => {
  const [foragers, setForagers] = useState([])
  const [createdGameId, setCreatedGameId] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()
  }, [])

  const foragerss = foragers.map(forager => {
    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            <Button variant="secondary" onClick={() => { props.setSelected(forager._id, forager.skill) }}>Select</Button>
            <Button variant="secondary" onClick={() => { props.setOpponent(forager._id, forager.skill) }}>Opponent</Button></td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })
  let foragerName = ''
  let opponentName = ''

  if (props.selected) {
    const selectedForager = foragers.find(forager => forager._id === props.selected)
    if (selectedForager !== undefined) {
      foragerName = selectedForager.name
    }
  }

  if (props.opponent) {
    const selectedOpponent = foragers.find(forager => forager._id === props.opponent)
    if (selectedOpponent !== undefined) {
      opponentName = selectedOpponent.name
    }
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

  const fightButton = (
    <Link to='/fight'>
      <Button type='button'>
            Fight!
      </Button>
    </Link>
  )

  if (createdGameId) {
    return <Redirect to={`/games/${createdGameId}/select`} />
  }

  const multiplayer = (
    <Button onClick={gameCreate} type='button'>
          Multiplayer!
    </Button>
  )

  return (
    <Layout className="lay">
      <h4>Foragers</h4>
      <h5>Please pick a selected forager and an opponent</h5>
      <h5>Go to the skills tab and add a skill to your forager</h5>
      <h6>{multiplayer}</h6>
      <p>Currently Selected: {foragerName}</p>
      <p>Opponent: {opponentName}</p>
      {((foragerName !== '') && (opponentName !== '')) ? <p>{fightButton}</p> : ''}
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">hp</th>
            <th scope="col">mp</th>
            <th scope="col">str</th>
          </tr>
        </thead>
        {foragerss}
      </table>
    </Layout>
  )
}

export default Foragers
