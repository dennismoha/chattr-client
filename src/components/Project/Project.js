import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import useSocket from 'socket.io-client'
import ChatBar from './chatBar.js'
import ChatLog from './chatLog.js'
import Button from 'react-bootstrap/Button'

const Project = props => {
  const [client, setClient] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [designer, setDesigner] = useState('')
  const [designerEmail, setDesignerEmail] = useState('')
  const [project, setProject] = useState({ title: '', user1: '', user2: '', messages: [] })
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState({ werd: '', owner: '' })

  const socket = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    // make axios call to projects
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        // change project to response
        setProject(res.data.project)
        // change client to response
        setClient(res.data.project.user1)
        // change email to response
        setClientEmail(res.data.project.user1Email)
        // change the message log
        setMessages(res.data.project.messages)
        if (res.data.project.user2) {
          setDesigner(res.data.project.user2)
          setDesignerEmail(res.data.project.user2Email)
        }
      })
      .catch()

    socket.on('new peep', (message) => {
      // if there is a message object, change message log state
      if (message.message !== undefined) {
        const editedMessage = message.message
        setMessages(editedMessage)
      }
      // if there is a user2 object, set the second user
      if (message.user2 !== undefined) {
        const newDesigner = message.user2
        setDesigner(newDesigner)
        setDesignerEmail(message.user2Email)
      }
    })
  }, [])
  const handleChange = event => {
    setNewMessage({ ...newMessage, [event.target.name]: event.target.value, owner: props.user._id })
  }

  const handleSubmit = event => {
    event.preventDefault()
    // get the specified project
    // axios({
    //   url: `${apiUrl}/projects/${props.match.params.id}`,
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${props.user.token}`
    //   }
    // })
    //   .then(res => {
    //     if (res.data.project.user2 !== undefined) {
    //       setDesigner(res.data.project.user2)
    //     }
    //     setProject(res.data.project)
    //     setClient(res.data.project.user1)
    //     setMessages(res.data.project.messages)
    //   })
    //   .catch()
    // take the message log, then add the new message to the log
    const fullMessage = messages
    fullMessage.push(newMessage)
    // setMessages({ ...messages, newMessage })

    // change the message log to the new edited message log
    setMessages(fullMessage)
    console.log(fullMessage)
    // change the project with all the new information that has been edited
    setProject({ ...project, user1: client, user2: designer, message: fullMessage })
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'PATCH',
      data: { project },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then((res) => {
        console.log(res)
        setProject(res.data.project)
        setMessages(res.data.project.messages)
        console.log(messages)
        // after modifying project, emit to socket with the modified message
        // socket.emit('new peep', { message: messages })
        setNewMessage({ werd: '', owner: '' })
      })
      .catch(() => props.msgAlert({
        heading: 'Couldnt send messsage',
        message: 'Please try again',
        variant: 'danger'
      }))
    socket.emit('new peep', { message: messages })

    // axios({
    //   url: `${apiUrl}/projects/${props.match.params.id}`,
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${props.user.token}`
    //   }
    // })
    //   .then(res => {
    //     if (res.data.project.user2 !== undefined) {
    //       setDesigner(res.data.project.user2)
    //     }
    //     setProject(res.data.project)
    //     setClient(res.data.project.user1)
    //     setMessages(res.data.project.messages)
    //   })
    //   .catch()
  }
  // for second user in project to assign themselves to project
  const arrival = () => {
    // set new user to designer state
    setDesigner(props.user._id)
    // change project state to reflect new user
    setProject({ ...project, user1: client, user2: props.user._id, user1Email: clientEmail, user2Email: props.user.email })
    // make axios call to update api with new user
    axios({
      url: `${apiUrl}/projects/${props.match.params.id}`,
      method: 'PATCH',
      data: { project },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then((res) => {
        // emit to socket with new user so other users will see change
        socket.emit('new peep', { user2: props.user._id, user2Email: props.user.email })
      })

      .catch(() => props.msgAlert({
        heading: 'Couldnt appoint you as the designer',
        message: 'Please try again',
        variant: 'danger'
      }))

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
        setDesigner(res.data.project.user2)
        setMessages(res.data.project.messages)
      })
      .catch()
  }
  // create button for second user to assign themself to project
  const response = (
    <Button onClick={arrival} type='button'>
      Are you the designer for this project?
    </Button>
  )

  // const responder = () => {
  //   if (props.user._id !== client) {
  //     return (
  //       { response }
  //     )
  //   }
  // }

  return (
    <div>
      <div className='text-center bg-dark text-light'><h1>{project.title}</h1>
      </div>
      <div className='row mb-3'>
        <div className='col-6 bg-primary'><h3>client: {clientEmail}</h3></div>
        <div className='col-6 bg-secondary'><h3>designer: {designerEmail}</h3></div>
      </div>
      <div>
        {(props.user._id !== client) && (designerEmail === '') ? <p>{response}</p> : '' }
      </div>
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
