import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  const teamfight = () => (
    <Link to='/TeamFight/Select'>
      <Button type='button'>
            TeamFight!
      </Button>
    </Link>
  )

  return (
    <div>
      <h1 className="lay">Welcome to Fantasy Foragers</h1>
      <div>
        {teamfight}
      </div>
    </div>
  )
}

export default Home
