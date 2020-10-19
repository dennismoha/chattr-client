import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
// import Button from 'react-bootstrap/Button'

// import LetsFight from '../shared/LetsFight'
const Foragers = props => {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios(`${apiUrl}/projects`)
      .then(res => setProjects(res.data.projects))
      .catch()
  }, [])

  const projectss = projects.map(project => {
    return (
      <tbody className="lay" key={project._id}>
        <tr>
          <td><Link to={`/projects/${project._id}`}>{project.name}<br></br></Link></td>
          <td>{project.user2}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <Layout className="lay">
      <h4>Projects</h4>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">Designer</th>
          </tr>
        </thead>
        {projectss}
      </table>
    </Layout>
  )
}

export default Foragers
