import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/foragers'>Foragers</NavLink>
    <NavLink to='/forager-create'>Create Forager</NavLink>
  </nav>
)

export default Nav
