import React from 'react'

const ChatLog = props => {
  const messages = props.messages
  let id = 0
  const talkLog = messages.map(msg => {
    let position
    if (msg.owner === props.user._id) {
      position = 'pull-left'
    } else {
      position = 'pull-right'
    }
    id++
    return (
      <p key={id} className={position}>
        {msg.werd}
      </p>
    )
  })

  return (
    <div>
      {talkLog}
    </div>
  )
}

export default ChatLog
