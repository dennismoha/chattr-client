import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from 'react'
// import apiUrl from '../../apiConfig'
// import axios from 'axios'

const ProjectForm = ({ project, handleSubmit, handleChange, cancelPath }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label>Title</Form.Label>
      <Form.Control
        placeholder="A Project Title"
        value={project.title}
        name="title"
        onChange={handleChange}
      />

      <Button type="submit">Submit</Button>
      <Link to={cancelPath}>
        <Button>Cancel</Button>
      </Link>
    </Form>
  )
}

export default ProjectForm
