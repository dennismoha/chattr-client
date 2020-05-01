import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
// import LetsFight from '../shared/LetsFight'
const Foragers = props => {
  const [foragers, setForagers] = useState([])
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [fighter3, setFighter3] = useState(null)
  const [fighter4, setFighter4] = useState(null)
  const [fighter5, setFighter5] = useState(null)
  const [fighter6, setFighter6] = useState(null)
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()
  }, [])
  const foragerss = foragers.map(forager => {
    const team1Selector = () => {
      if (!fighter1) {
        setFighter1(forager)
      } else if (!fighter2) {
        setFighter2(forager)
      } else {
        setFighter3(forager)
      }
    }

    const team2Selector = () => {
      if (!fighter4) {
        setFighter4(forager)
      } else if (!fighter5) {
        setFighter5(forager)
      } else {
        setFighter6(forager)
      }
    }

    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            {!fighter2 && !fighter3 ? <Button variant="secondary" onClick={team1Selector}>Add to your team!</Button> : ''}
            {!fighter5 && !fighter6 ? <Button variant="secondary" onClick={team2Selector}>Add to opponents team!</Button> : ''}
          </td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })

  const t1 = [fighter1, fighter2, fighter3]
  const t2 = [fighter4, fighter5, fighter6]
  setTeam1(t1)
  setTeam2(t2)

  return (
    <Layout>
      <div>Team 1:
        <ul>
          <li>{team1.fighter1.name}</li>
          <li>{team1.fighter2.name}</li>
          <li>{team1.fighter3.name}</li>
        </ul>
      Team 2:
        <ul>
          <li>{team2.fighter4.name}</li>
          <li>{team2.fighter5.name}</li>
          <li>{team2.fighter6.name}</li>
        </ul>
      </div>
      <h4>Foragers</h4>
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
