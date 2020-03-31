import React, { useState, useEffect } from 'react'

const BattleLog = props => {
  const [log, setLog] = useState([])

  useEffect(() => {
    setLog(props.log)
  }, [])
  console.log(log)

  const fightLog = log.map(msg => (
    <li key={msg}>
      {msg}
    </li>
  ))

  return (
    <div>
      <ul>Log
        {fightLog}
      </ul>
    </div>
  )
}

export default BattleLog
