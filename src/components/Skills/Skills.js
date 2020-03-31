import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
// import LetsFight from '../shared/LetsFight'

const Skills = props => {
  const [skills, setSkills] = useState([])
  const [forager, setForager] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/skills`)
      .then(res => setSkills(res.data.skills))
      .catch(console.error)
  }, [])

  const skillss = skills.map(skill => (
    <li key={skill._id}>
      {console.log(skill)}
      <Link to={`/skills/${skill._id}`}>{skill.name}</Link>
    </li>
  ))

  const find = () => {
    axios({
      url: `${apiUrl}/foragers/${props.selected}`,
      method: 'GET'
    })
      .then((res) => setForager(res.data.forager.name))
      .catch(console.error)
  }

  find()
  const foragerName = forager

  return (
    <Layout>
      <h4>Skills</h4>
      <p>Currently Selected: {foragerName}</p>
      <p></p>
      <Link to='/fight'>
        <button type='button'>
          Fight!
        </button>
      </Link>
      <ul>
        {skillss}
      </ul>
    </Layout>
  )
}

export default Skills
