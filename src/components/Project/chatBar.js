import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React from 'react'

const Chatbar = ({ message, handleSubmit, handleChange }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        placeholder="type here"
        value={message.werd}
        name="werd"
        onChange={handleChange}
      />
      <Button type="submit">Send</Button>
    </Form>
  )
}

export default Chatbar
