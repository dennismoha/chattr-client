import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ForagerForm from '../shared/ForagerForm'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

const ForagerEdit = props => {
  const [forager, setForager] = useState({
    name: '',
    description: '',
    hp: '',
    mp: '',
    str: ''
  })
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/foragers/${props.match.params.id}`)
      .then(res => setForager(res.data.forager))
      .catch(() => props.msgAlert({
        heading: 'Couldnt find your forager',
        message: 'Go get a forager',
        variant: 'danger'
      }))
  }, [])

  const handleChange = event => {
    setForager({ ...forager, [event.target.name]: event.target.value })
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

    if (props.user._id !== forager.owner) {
      props.msgAlert({
        heading: 'You do not own this resource',
        message: messages.notOwner,
        variant: 'danger'
      })
    }

    axios({
      url: `${apiUrl}/foragers/${props.match.params.id}`,
      method: 'PATCH',
      data: { forager },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        setUpdate(true)
        props.msgAlert({
          heading: 'Successfully modified forager',
          message: 'Congratulations',
          variant: 'success'
        })
      })
      .catch(() => props.msgAlert({
        heading: 'Couldnt modify forager',
        message: 'Probly not yours',
        variant: 'danger'
      }))
  }
  if (update) {
    return <Redirect to={`/foragers/${props.match.params.id}`} />
  }
  return (
    <Layout>
      <ForagerForm
        forager={forager}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        remaining={remainingStats}
        cancelPath={`/foragers/${props.match.params.id}`}
      />
    </Layout>
  )
}
export default ForagerEdit
