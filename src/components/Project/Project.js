import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import useSocket from 'socket.io-client'
import ChatBar from './chatBar.js'
import ChatLog from './chatLog.js'
import Button from 'react-bootstrap/Button'

const Project = props => {
  const [client, setClient] = useState('')
  const [designer, setDesigner] = useState('')
  const [project, setProject] = useState({ user1: '', user2: '', messages: [] })
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({ werd: '', owner: '' })

  const socket = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setProject(res.data.project)
        setClient(res.data.project.user1)
        setMessages(res.data.project.messages)
        if (res.data.project.user2 !== undefined) {
          setDesigner(res.data.project.user2)
        }
      })
      .catch()

    socket.on('new peep', (message) => {
      console.log(message)
      if (message.message !== undefined) {
        const editedMessage = message.message
        setMessages(editedMessage)
      }
      if (message.user2 !== undefined) {
        const newDesigner = message.user2
        setDesigner(newDesigner)
      }
    })
  }, [])
  const handleChange = event => {
    setNewMessage({ ...newMessage, [event.target.name]: event.target.value, owner: props.user._id })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setProject(res.data.project)
        setClient(res.data.project.user1)
        setMessages(res.data.project.messages)
        if (res.data.project.user2 !== undefined) {
          setDesigner(res.data.project.user2)
        }
      })
      .catch()

    const fullMessage = messages
    fullMessage.push(newMessage)
    setMessages(fullMessage)
    setProject({ ...project, user1: client, user2: designer, message: messages })
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'PATCH',
      data: { project },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        socket.emit('new peep', { message: messages })
        setNewMessage({ werd: '', owner: '' })
      })
      .catch(() => props.msgAlert({
        heading: 'Couldnt send messsage',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  const arrival = () => {
    setDesigner(props.user._id)
    setProject({ ...project, user1: client, user2: props.user._id, message: messages })
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'PATCH',
      data: { project },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        socket.emit('new peep', { user2: props.user._id })
      })

      .catch(() => props.msgAlert({
        heading: 'Couldnt appoint you as the designer',
        message: 'Please try again',
        variant: 'danger'
      }))
  }

  const response = (
    <Button onClick={arrival} type='button'>
      Are you the designer for this project?
    </Button>
  )

  const responder = () => {
    if (props.user._id !== client) {
      return (
        { response }
      )
    }
  }

  return (
    <div>
      <p>client: {client}</p>
      <p>designer: {designer}</p>
      {responder}
      <div>
        <ChatLog messages={messages} user={props.user} />
      </div>
      <div>
        <ChatBar
          message={newMessage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Project
