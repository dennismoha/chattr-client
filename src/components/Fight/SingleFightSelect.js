import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'

const Forager = props => {
  const [foragers, setForagers] = useState([])
  const [fighter, setFighter] = useState(null)
  const [opponent, setOpponent] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => {
        setForagers(res.data.foragers)
      })
      .catch()
  }, [])

  console.log(props)
  console.log(fighter)
  console.log(opponent)

  const foragerss = foragers.map(forager => {
    const fighterSelector = () => {
      const fig = forager
      props.setFighter(fig._id, fig.skill)
      axios(`${apiUrl}/foragers/${fig._id}`)
        .then(res => setFighter(res.data.forager))
        .catch()
    }

    const opponentSelector = () => {
      const opp = forager
      props.setOpponent(opp._id, opp.skill)
      axios(`${apiUrl}/foragers/${opp._id}`)
        .then(res => setOpponent(res.data.forager))
        .catch()
    }

    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            <Button onClick={fighterSelector}>Select Fighter!</Button>
            <Button onClick={opponentSelector}>Select Opponent!</Button>
          </td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })

  const fightButton = (
    <Link to='/fight'>
      <Button type='button'>
        Fight!
      </Button>
    </Link>
  )

  return (
    <Layout>
      <h4>Foragers</h4>
      <h5>Please pick a fighter and opponent</h5>
      <p>Currently Selected: {(fighter !== null) ? <h6>{fighter.name}</h6> : '' }</p>
      <p>Opponent: {(opponent !== null) ? <h6>{opponent.name}</h6> : '' }</p>
      {(fighter !== null && opponent !== null) ? <h6>{fightButton}</h6> : ''}
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

export default Forager
