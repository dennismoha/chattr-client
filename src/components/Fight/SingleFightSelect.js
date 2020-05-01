import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Forager = props => {
  const [forager, setForager] = useState(null)
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
