import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'

const Home = props => {
  const [projects, setProjects] = useState(false)

  if (projects === true) {
    return <Redirect to={'/projects/'} />
  }

  const projjects = () => {
    setProjects(true)
  }

  const mover = (
    <Button onClick={projjects} type='button'>
          View your Projects!
    </Button>
  )

  return (
    <div>
      <h1 className="lay">Welcome to Chattr</h1>
      <h6>{mover}</h6>
    </div>
  )
}

export default Home
