import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Nav = () => (
  <nav className='buttoins'>
    <Button
      variant="dark">
      <NavLink to='/home'>Home</NavLink>
    </Button>
  </nav>
)

export default Nav
