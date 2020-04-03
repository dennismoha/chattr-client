import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import SkillForm from '../shared/SkillForm'
import Layout from '../shared/Layout'

const SkillCreate = props => {
  const [skill, setSkill] = useState({ name: '', description: '', resource: '', cost: '' })
  const [createdSkillId, setCreatedSkillId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedSkill = Object.assign({ ...skill }, updatedField)
    setSkill(editedSkill)

    // setForager({ ...forager, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/skills`,
      method: 'POST',
      data: { skill },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCreatedSkillId(res.data.skill._id))
      .catch(props.msgAlert({
        heading: 'Couldnt create a skill',
        message: 'Are you logged in',
        variant: 'danger'
      }))
  }

  if (createdSkillId) {
    return <Redirect to={`/skills/${createdSkillId}`} />
  }

  return (
    <Layout>
      <SkillForm
        skill={skill}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default SkillCreate
