import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Forager = props => {
  console.log(props)
  const [forager, setForager] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [skill, setSkill] = useState('')

  // call this callback once after first render, only occurs once
  // because dependency array is empty, so dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/foragers/${props.match.params.id}`)
      // make sure to updated this.setState to hooks setForager
      .then(res => setForager(res.data.forager))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/foragers/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!forager) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/foragers', state: { msg: 'Forager succesfully deleted!' } }
    } />
  }

  axios(`${apiUrl}/skills/${forager.skill}`)
    // make sure to updated this.setState to hooks setForager
    .then(res => setSkill(res.data.skill))
    .catch(console.error)

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
      <button onClick={destroy}>Delete Forager</button>
      <Link to={`/foragers/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/foragers">Back to all foragers</Link>
    </Layout>
  )
}

export default Forager
