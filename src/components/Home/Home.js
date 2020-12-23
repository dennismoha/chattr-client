import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Home = props => {
  const [createdProjectId, setCreatedProjectId] = useState(null)

  if (createdProjectId) {
    return <Redirect to={`/projects/${createdProjectId}`} />
  }

  const projectCreate = () => {
    axios({
      url: `${apiUrl}/projects`,
      method: 'POST',
      data: { 'project': {
        'user1': `${props.user._id}`,
        'user1Email': `${props.user.email}`
      }
      },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setCreatedProjectId(res.data.project._id))
      .catch(() => props.msgAlert({
        heading: 'Couldnt Create Project',
        message: 'Are you signed in?',
        variant: 'danger'
      }))
  }

  const projecter = (
    <Button onClick={projectCreate} type='button'>
          Create Project!
    </Button>
  )

  return (
    <div>
      <h1 className="lay">Welcome to Chattr</h1>
      <h6>{projecter}</h6>
    </div>
  )
}

export default Home
