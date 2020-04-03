import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ForagerForm from '../shared/ForagerForm'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

const ForagerCreate = props => {
  const [forager, setForager] = useState({ name: '', description: '', hp: '', mp: '', str: '' })
  const [createdForagerId, setCreatedForagerId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedForager = Object.assign({ ...forager }, updatedField)
    setForager(editedForager)

    // setForager({ ...forager, [event.target.name]: event.target.value })
  }
  let hp = 0
  let mp = 0
  let str = 0
  if (forager.hp !== '') {
    hp = parseInt(forager.hp)
  }
  if (forager.mp !== '') {
    mp = parseInt(forager.mp)
  }
  if (forager.str !== '') {
    str = parseInt(forager.str)
  }
  const total = hp + mp + str
  const remainingStats = 100 - total

  const handleSubmit = event => {
    event.preventDefault()

    if (total !== 100) {
      props.msgAlert({
        heading: 'Please allocate all your stat points',
        message: messages.statAllocate,
        variant: 'danger'
      })
    }

    axios({
      url: `${apiUrl}/foragers`,
      method: 'POST',
      data: { forager },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCreatedForagerId(res.data.forager._id))
      .catch(() => props.msgAlert({
        heading: 'Couldnt create forager',
        message: messages.statAllocate,
        variant: 'danger'
      }))
  }

  if (createdForagerId) {
    return <Redirect to={`/foragers/${createdForagerId}`} />
  }

  return (
    <Layout>
      <ForagerForm
        forager={forager}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        remaining={remainingStats}
        cancelPath="/"
      />
    </Layout>
  )
}

export default ForagerCreate
