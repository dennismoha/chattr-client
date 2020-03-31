import React from 'react'
import { Link } from 'react-router-dom'

const LetsFight = props => {
  const fightButton = (
    <Link to='/fight'>
      <button type='button'>
        Fight!
      </button>
    </Link>
  )

  if (props.selected !== null && props.opponent !== null) {
    return { fightButton }
  }
  return 'Please pick a fighter and opponent'
}

export default LetsFight
