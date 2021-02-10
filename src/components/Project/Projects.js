import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProjectForm from './projectForm'

const Projects = props => {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({ title: '', user1: '', user1Email: '' })
  const [createdProjectId, setCreatedProjectId] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/projects`)
      .then(res => setProjects(res.data.projects))
      .catch()
  }, [])

  const projectss = projects.map(project => {
    return (
      <tbody className="lay" key={project._id}>
        <tr>
          <td><Link to={`/projects/${project._id}`}>{project.title}<br></br></Link></td>
        </tr>
      </tbody>
    )
  })

  if (createdProjectId) {
    return <Redirect to={`/projects/${createdProjectId}`} />
  }

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedProject = Object.assign({ ...project }, updatedField)
    setProject(editedProject)
  }

  const userId = props.user._id
  const userEmail = props.user.email

  const handleSubmit = event => {
    event.preventDefault()

    setProject({ user1: userId, user1Email: userEmail })

    axios({
      url: `${apiUrl}/projects`,
      method: 'POST',
      data: { project },
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

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Layout className="lay">
      <h4>Projects</h4>
      <h5>These are the projects you are currently involved in</h5>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Project Name</th>
          </tr>
        </thead>
        {projectss}
      </table>
      <Button variant="primary" onClick={handleShow}>
    Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
        Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
        Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default Projects
