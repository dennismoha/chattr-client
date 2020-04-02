import React from 'react'

const BattleLog = props => {
  const logger = props.log
  const fightLog = logger.map(msg => {
    const numero = logger.findIndex(mwsg => mwsg === msg)
    return (
      <p key={numero}>
        {msg}
      </p>
    )
  })

  return (
    <div className="overflow-auto">
      <ul>Log:
        {fightLog}
      </ul>
    </div>
  )
}

export default BattleLog
