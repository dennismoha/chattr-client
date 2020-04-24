import React from 'react'

const BattleLog = props => {
  const logger = props.log
  const fightLog = logger.map(msg => {
    let id
    for (const key in msg) {
      id = key
    }
    return (
      <p key={id}>
        {msg[id]}
      </p>
    )
  })

  return (
    <div style={{ overflowY: 'scroll', height: '20vh', width: '70vw', margin: '10vh 5vw' } }>
      <ul>Log:
        {fightLog}
      </ul>
    </div>
  )
}

export default BattleLog
