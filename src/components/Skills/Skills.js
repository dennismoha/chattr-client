import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
// import LetsFight from '../shared/LetsFight'

const Skills = props => {
  const [skills, setSkills] = useState([])
  const [foragerr, setForager] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/skills`)
      .then(res => setSkills(res.data.skills))
      .catch(() => props.msgAlert({
        heading: 'Couldnt find skill',
        message: 'Go make a skill',
        variant: 'danger'
      }))

    if (props.selected) {
      axios({
        url: `${apiUrl}/foragers/${props.selected}`,
        method: 'GET'
      })
        .then(res => setForager(res.data.forager))
        .catch()
    }
  }, [])

  let foragerName = ''
  if (foragerr !== null) {
    foragerName = foragerr.name
  }
  const skillss = skills.map(skill => {
    const add = () => {
      event.preventDefault()
      const move = skill._id
      const updatedSkill = { skill: move }
      const forager = Object.assign({ ...foragerr }, updatedSkill)
      setForager(forager)
      if (props.selected) {
        axios({
          url: `${apiUrl}/foragers/${props.selected}`,
          method: 'PATCH',
          data: { forager },
          headers: {
            'Authorization': `Bearer ${props.user.token}`
          }
        })
          .then(() => props.msgAlert({
            heading: 'Skill Added to your forager',
            message: 'Go fight',
            variant: 'success'
          })
          )
          .catch(() => props.msgAlert({
            heading: 'Couldnt add skill to your forager',
            message: 'Go get a forager',
            variant: 'danger'
          }))
      }
    }

    const addButton = (<Button onClick={add}>Use this skill</Button>)

    return (
      <tbody className="lay" key={skill._id}>
        <tr>
          <td>
            <Link to={`/skills/${skill._id}`}>{skill.name}</Link>
            {(foragerName) ? <p>{addButton}</p> : ''}</td>
          <td>{skill.description}</td>
          <td>{skill.resource}</td>
          <td>{skill.cost}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <Layout>
      <h4>Skills</h4>
      <p>Currently Selected: {foragerName}</p>
      <p></p>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Resource</th>
            <th scope="col">Cost</th>
          </tr>
        </thead>
        {skillss}
      </table>
    </Layout>
  )
}

export default Skills
