import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Skill = props => {
  console.log(props)
  const [skill, setSkill] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // call this callback once after first render, only occurs once
  // because dependency array is empty, so dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/skills/${props.match.params.id}`)
      // make sure to updated this.setState to hooks setSkill
      .then(res => setSkill(res.data.skill))
      .catch(console.error)
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
      .catch(console.error)
  }
  console.log(skill)

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
      <button onClick={destroy}>Delete Skill</button>
      <Link to={`/skills/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/skills">Back to all skills</Link>
    </Layout>
  )
}

export default Skill
