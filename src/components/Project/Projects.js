import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProjectForm from './ProjectForm'

const Projects = props => {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({ title: '', user1: '', user1Email: '' })
  const [createdProjectId, setCreatedProjectId] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/projects`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setProjects(res.data.projects))
      .catch()

    const newProject = Object.assign({ ...project }, { user1: userId, user1Email: userEmail, owner: userId })
    setProject(newProject)
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
      <Button variant="primary" onClick={handleShow}>
    Create a new Project
      </Button>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Project Name</th>
          </tr>
        </thead>
        {projectss}
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProjectForm
            project={project}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          >
          </ProjectForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
        Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default Projects
