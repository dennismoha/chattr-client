import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
// import LetsFight from '../shared/LetsFight'

const Foragers = props => {
  const [foragers, setForagers] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch(console.error)
  }, [])

  const foragerss = foragers.map(forager => (
    <li key={forager._id}>
      <Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
      <Button variant="secondary" onClick={() => { props.setSelected(forager._id, forager.skill) }}>Select</Button>
      <Button variant="secondary" onClick={() => { props.setOpponent(forager._id, forager.skill) }}>Fight</Button>
    </li>
  ))
  console.log(props.selected)
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

  let exist

  if (foragerName !== '' && opponentName !== '') {
    exist = true
  } else {
    exist = false
  }

  console.log(exist)

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

  const show = function (exist) {
    if (exist === true) {
      return (
        { fightButton }
      )
    } else {
      return 'Please pick your fighters'
    }
  }
  console.log(show)

  return (
    <Layout>
      <h4>Foragers</h4>
      <p>Currently Selected: {foragerName}</p>
      <p>Opponent: {opponentName}</p>
      {((foragerName !== '') && (opponentName !== '')) ? <p>{fightButton}</p> : ''}
      {((foragerName !== '') && (opponentName !== '')) ? <p>{multiFightButton}</p> : ''}
      <ul>
        {foragerss}
      </ul>
    </Layout>
  )
}

export default Foragers
