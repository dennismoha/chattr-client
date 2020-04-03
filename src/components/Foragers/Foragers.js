import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
import useSocket from 'socket.io-client'
// import LetsFight from '../shared/LetsFight'

const Foragers = props => {
  const [foragers, setForagers] = useState([])

  const socket = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()

    socket.on('new selected', (fighter) => {
      if (fighter.fighter.selected) {
        props.setSelected(fighter.fighter.selected._id, fighter.fighter.selected.skill)
        return props.selected
      }

      if (fighter.fighter.opponent) {
        props.setOpponent(fighter.fighter.opponent._id, fighter.fighter.opponent.skill)
        return props.opponent
      }
    })
  }, [])

  const foragerss = foragers.map(forager => (
    <tbody key={forager._id}>
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
  ))
  let foragerName = ''
  let opponentName = ''

  if (props.selected) {
    const selectedForager = foragers.find(forager => forager._id === props.selected)
    if (selectedForager !== undefined) {
      foragerName = selectedForager.name
      socket.emit('new person', { fighter: { selected: selectedForager } })
    }
  }

  if (props.opponent) {
    const selectedOpponent = foragers.find(forager => forager._id === props.opponent)
    if (selectedOpponent !== undefined) {
      opponentName = selectedOpponent.name
      socket.emit('new person', { fighter: { opponent: selectedOpponent } })
    }
  }

  const fightButton = (
    <Link to='/fight'>
      <Button type='button'>
            Fight!
      </Button>
    </Link>
  )

  const multiFightButton = (
    <Link to='/multi-fight'>
      <Button type='button'>
            Multi-Fight!
      </Button>
    </Link>
  )

  return (
    <Layout>
      <h4>Foragers</h4>
      <p>Currently Selected: {foragerName}</p>
      <p>Opponent: {opponentName}</p>
      {((foragerName !== '') && (opponentName !== '')) ? <p>{fightButton}</p> : ''}
      {((foragerName !== '') && (opponentName !== '')) ? <p>{multiFightButton}</p> : ''}
      <table className="table">
        <thead>
          <tr>
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
