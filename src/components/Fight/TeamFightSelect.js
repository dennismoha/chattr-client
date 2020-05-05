import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
// import LetsFight from '../shared/LetsFight'
const TeamFightSelect = props => {
  const [foragers, setForagers] = useState([])
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [fighter3, setFighter3] = useState(null)
  const [fighter4, setFighter4] = useState(null)
  const [fighter5, setFighter5] = useState(null)
  const [fighter6, setFighter6] = useState(null)
  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()
  }, [])
  const foragerss = foragers.map(forager => {
    const team1Selector = () => {
      const t1 = [ ...team1 ]
      if (fighter1 === null) {
        setFighter1(forager)
        t1.push(forager)
      } else if (fighter2 === null) {
        setFighter2(forager)
        t1.push(forager)
      } else if (fighter3 === null) {
        setFighter3(forager)
        t1.push(forager)
      }
      setTeam1(t1)
    }

    const team2Selector = () => {
      const t2 = [...team2]
      if (!fighter4) {
        setFighter4(forager)
        t2.push(forager)
      } else if (!fighter5) {
        setFighter5(forager)
        t2.push(forager)
      } else {
        setFighter6(forager)
        t2.push(forager)
      }
      setTeam2(t2)
      console.log(team2)
    }

    if (confirm === true) {
      return <Redirect to={'/teamfight'} />
    }

    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            {!fighter1 || !fighter2 || !fighter3 ? <Button variant="secondary" onClick={team1Selector}>Add to your team!</Button> : ''}
            {!fighter4 || !fighter5 || !fighter6 ? <Button variant="secondary" onClick={team2Selector}>Add to opponents team!</Button> : ''}
          </td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })

  const confirmation = () => {
    props.setTeam1(team1)
    props.setTeam2(team2)
    setConfirm(true)
  }

  return (
    <Layout>
      <div>
      Team 1:
        <ul>
          {(fighter1 !== null) ? <li>{fighter1.name}</li> : '' }
          {(fighter2 !== null) ? <li>{fighter2.name}</li> : '' }
          {(fighter3 !== null) ? <li>{fighter3.name}</li> : '' }
        </ul>
      Team 2:
        <ul>
          {(fighter4 !== null) ? <li>{fighter4.name}</li> : '' }
          {(fighter5 !== null) ? <li>{fighter5.name}</li> : '' }
          {(fighter6 !== null) ? <li>{fighter6.name}</li> : '' }
        </ul>
      </div>
      {team1.length === 3 && team2.length === 3 ? <Button variant='secondary' onClick={confirmation}>Confirm!</Button> : ''}
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

export default TeamFightSelect
