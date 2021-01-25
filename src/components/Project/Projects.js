import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

// import LetsFight from '../shared/LetsFight'
const Projects = props => {
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
          <td><Link to={`/projects/${project._id}`}>{project.title}<br></br></Link></td>
        </tr>
      </tbody>
    )
  })
  return (
    <Layout className="lay">
      <h4>Projects</h4>
      <h5>These are the projects you are currently involved in</h5>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Project Name</th>
          </tr>
        </thead>
        {projectss}
      </table>
    </Layout>
  )
}

export default Projects
