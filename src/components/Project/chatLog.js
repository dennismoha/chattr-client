import React from 'react'

const ChatLog = props => {
  const messages = props.messages
  let id = 0
  const talkLog = messages.map(msg => {
    id++
    if (msg.owner === props.user._id) {
      return (
        <div className='row'>
          <div key={id} className='bg-primary col-4 rounded-pill'>
            {msg.werd}
          </div>
        </div>
      )
    } else {
      return (
        <div className='row'>
          <div className='col-8'>
          </div>
          <div key={id} className='text-right bg-secondary col-4 rounded-pill'>
            {msg.werd}
          </div>
        </div>
      )
    }
  })

  return (
    <div className='container'>
      {talkLog}
    </div>
  )
}

export default ChatLog
