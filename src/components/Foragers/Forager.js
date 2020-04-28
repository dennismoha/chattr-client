import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'

const Forager = props => {
  const [forager, setForager] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [skill, setSkill] = useState('')

  // call this callback once after first render, only occurs once
  // because dependency array is empty, so dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/foragers/${props.match.params.id}`)
      // make sure to updated this.setState to hooks setForager
      .then(res => {
        setForager(res.data.forager)
        if (res.data.forager.skill) {
          axios(`${apiUrl}/skills/${res.data.forager.skill}`)
            .then(res => setSkill(res.data.skill))
            .catch()
        }
      })
      .catch()
  }, [])

  const destroy = () => {
    if (props.user._id !== forager.owner) {
      props.msgAlert({
        heading: 'You do not own this resource',
        message: messages.notOwner,
        variant: 'danger'
      })
    }

    axios({
      url: `${apiUrl}/foragers/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(() => props.msgAlert({
        heading: 'Couldnt Delete Forager',
        message: 'Probly not yours',
        variant: 'danger'
      }))
  }

  if (!forager) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/foragers', state: { msg: 'Forager succesfully deleted!' } }
    } />
  }

  const ability = (
    <Link to={`/skills/${skill._id}`}>{skill.name}</Link>
  )

  const deleteButton = (<Button onClick={destroy}>Delete Forager</Button>)
  const editButton = (
    <Link to={`/foragers/${props.match.params.id}/edit`}>
      <Button>Edit</Button>
    </Link>
  )

  return (
    <Layout>
      <h4>{forager.name}</h4>
      <p>Description: {forager.description}</p>
      <p>Hp: {forager.hp}</p>
      <p>Mp: {forager.mp}</p>
      <p>Str: {forager.str}</p>
      <p>Skill: {ability}</p>
      {(props.user._id === forager.owner) ? <p>{deleteButton}</p> : ''}
      {(props.user._id === forager.owner) ? <p>{editButton}</p> : ''}
      <Link to="/foragers">Back to all foragers</Link>
    </Layout>
  )
}

export default Forager
