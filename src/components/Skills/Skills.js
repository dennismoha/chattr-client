import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
// import LetsFight from '../shared/LetsFight'

const Skills = props => {
  const [skills, setSkills] = useState([])
  const [forager, setForager] = useState(null)
  const [opponent, setOpponent] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/skills`)
      .then(res => setSkills(res.data.skills))
      .catch(() => props.msgAlert({
        heading: 'Couldnt find skill',
        message: 'Go make a skill',
        variant: 'danger'
      }))
  }, [])

  const skillss = skills.map(skill => {
    return (
      <tbody className="lay" key={skill._id}>
        <tr>
          <td>
            <Link to={`/skills/${skill._id}`}>{skill.name}</Link></td>
          <td>{skill.description}</td>
          <td>{skill.resource}</td>
          <td>{skill.cost}</td>
        </tr>
      </tbody>
    )
  })

  const findForager = () => {
    if (props.selected) {
      axios({
        url: `${apiUrl}/foragers/${props.selected}`,
        method: 'GET'
      })
        .then((res) => setForager(res.data.forager.name))
        .catch()
    }
  }

  const findOpponent = () => {
    if (props.opponent) {
      axios({
        url: `${apiUrl}/foragers/${props.opponent}`,
        method: 'GET'
      })
        .then((res) => setOpponent(res.data.forager.name))
        .catch()
    }
  }

  findForager()
  findOpponent()
  const foragerName = forager
  const opponentName = opponent

  const fightButton = (
    <Link to='/fight'>
      <Button type='button'>
        Fight!
      </Button>
    </Link>
  )

  return (
    <Layout>
      <h4>Skills</h4>
      <p>Currently Selected: {foragerName}</p>
      <p></p>
      {((foragerName !== null) && (opponentName !== null)) ? <p>{fightButton}</p> : ''}
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">resource</th>
            <th scope="col">cost</th>
          </tr>
        </thead>
        {skillss}
      </table>
    </Layout>
  )
}

export default Skills
