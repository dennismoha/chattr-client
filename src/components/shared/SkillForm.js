import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ForagerForm = ({ skill, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Label>Name</Form.Label>
    <Form.Control
      placeholder="A Great Skill"
      value={skill.name}
      name="name"
      onChange={handleChange}
    />

    <Form.Label>Description</Form.Label>
    <Form.Control
      placeholder="John Doe"
      value={skill.description}
      name="description"
      onChange={handleChange}
    />

    <Form.Label>Resource</Form.Label>
    <Form.Control
      placeholder="hp"
      value={skill.resource}
      name="resource"
      onChange={handleChange}
    />

    <Form.Label>Cost</Form.Label>
    <Form.Control
      type='Number'
      placeholder="00"
      value={skill.cost}
      name="cost"
      onChange={handleChange}
    />

    <Button type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default ForagerForm
