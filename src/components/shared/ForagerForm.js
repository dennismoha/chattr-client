import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ForagerForm = ({ forager, remaining, handleSubmit, handleChange, cancelPath }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Label>Name</Form.Label>
    <Form.Control
      placeholder="A Superb Forager"
      value={forager.name}
      name="name"
      onChange={handleChange}
    />

    <Form.Label>Description</Form.Label>
    <Form.Control
      placeholder="John Doe"
      value={forager.description}
      name="description"
      onChange={handleChange}
    />

    <Form.Label>Hp</Form.Label>
    <Form.Control
      type="number"
      min="0"
      max="100"
      placeholder="00"
      value={forager.hp}
      name="hp"
      onChange={handleChange}
    />

    <Form.Label>Mp</Form.Label>
    <Form.Control
      type="number"
      min="0"
      max="100"
      placeholder="00"
      value={forager.mp}
      name="mp"
      onChange={handleChange}
    />

    <Form.Label>Str</Form.Label>
    <Form.Control
      type="number"
      min="0"
      max="100"
      placeholder="00"
      value={forager.str}
      name="str"
      onChange={handleChange}
    />

    <p>Remaining Stats Points: {remaining}</p>

    <Button type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button>Cancel</Button>
    </Link>
  </Form>
)

export default ForagerForm
