import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Forager = props => {
  const [foragers, setForagers] = useState(null)
  const [skill, setSkill] = useState('')

  // call this callback once after first render, only occurs once
  // because dependency array is empty, so dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      // make sure to updated this.setState to hooks setForager
      .then(res => {
        setForagers(res.data.foragers)
      })
      .catch()
  }, [])

  const foragerss = foragers.map(forager => {
    const fighter1Selector = () => {
      // setFighter1(forager._id)
      // setFighter1Skill(forager.skill)
      const forager1 = forager
    }
    const fighter2Selector = () => {
      // setFighter2(forager._id)
      // setFighter2Skill(forager.skill)
      const forager2 = forager
      socket.emit('new peep', { fighter: { forager2 } })
    }

    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            {props.user._id === game.player1 && (game.player2) ? <Button variant="secondary" onClick={fighter1Selector}>Forager 1</Button> : ''}
            {props.user._id === game.player2 ? <Button variant="secondary" onClick={fighter2Selector}>Forager 2</Button> : ''}
          </td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })

  if (!forager) {
    return <p>Loading...</p>
  }

  const ability = (
    <Link to={`/skills/${skill._id}`}>{skill.name}</Link>
  )

  return (
    <Layout>
      <h4>{forager.name}</h4>
      <p>Description: {forager.description}</p>
      <p>Hp: {forager.hp}</p>
      <p>Mp: {forager.mp}</p>
      <p>Str: {forager.str}</p>
      <p>Skill: {ability}</p>
      <Link to="/foragers">Back to all foragers</Link>
    </Layout>
  )
}

export default Forager
