import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'

const Skill = props => {
  const [skill, setSkill] = useState(null)
  const [foragerr, setForager] = useState({ name: '', description: '', hp: '', mp: '', str: '', skill: '' })
  const [deleted, setDeleted] = useState(false)

  // call this callback once after first render, only occurs once
  // because dependency array is empty, so dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/skills/${props.match.params.id}`)
      // make sure to updated this.setState to hooks setSkill
      .then(res => setSkill(res.data.skill))
      .catch()

    axios(`${apiUrl}/foragers/${props.selected}`)
      // make sure to updated this.setState to hooks setForager
      .then(res => setForager(res.data.forager))
      .catch()
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/skills/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(props.msgAlert({
        heading: 'Couldnt delete skill',
        message: 'Probly not yours tbh',
        variant: 'danger'
      }))
  }

  const add = () => {
    event.preventDefault()
    const move = skill._id
    const updatedSkill = { skill: move }
    const forager = Object.assign({ ...foragerr }, updatedSkill)
    setForager(forager)
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
      .catch(props.msgAlert({
        heading: 'Couldnt add skill to your forager',
        message: 'Go get a forager',
        variant: 'danger'
      }))
  }

  if (!skill) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/skills', state: { msg: 'Skill succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{skill.name}</h4>
      <p>Description: {skill.description}</p>
      <p>Cost: {skill.cost}</p>
      <p>Resource used: {skill.resource}</p>
      <Button onClick={destroy}>Delete Skill</Button>
      <Button onClick={add}>Use this skill</Button>
      <Link to={`/skills/${props.match.params.id}/edit`}>
        <Button>Edit</Button>
      </Link>
      <Link to="/skills">Back to all skills</Link>
    </Layout>
  )
}

export default Skill
