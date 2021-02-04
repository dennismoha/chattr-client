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

  // const [createdProjectId, setCreatedProjectId] = useState(null)
  //
  // if (createdProjectId) {
  //   return <Redirect to={`/projects/${createdProjectId}`} />
  // }
  //
  // const projectCreate = () => {
  //   axios({
  //     url: `${apiUrl}/projects`,
  //     method: 'POST',
  //     data: { 'project': {
  //       'user1': `${props.user._id}`,
  //       'user1Email': `${props.user.email}`
  //     }
  //     },
  //     headers: {
  //       'Authorization': `Bearer ${props.user.token}`
  //     }
  //   })
  //     .then(res => setCreatedProjectId(res.data.project._id))
  //     .catch(() => props.msgAlert({
  //       heading: 'Couldnt Create Project',
  //       message: 'Are you signed in?',
  //       variant: 'danger'
  //     }))
  // }
  //
  // const projecter = (
  //   <Button onClick={projectCreate} type='button'>
  //         Create Project!
  //   </Button>
  // )
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
