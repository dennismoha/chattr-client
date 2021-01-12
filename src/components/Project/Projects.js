import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'

// import LetsFight from '../shared/LetsFight'
const Foragers = props => {
  const [foragers, setForagers] = useState([])
  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()
  }, [])

  const foragerss = foragers.map(forager => {
    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            <Button variant="secondary" onClick={() => { props.setSelected(forager._id, forager.skill) }}>Select</Button></td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })
  let foragerName = ''

  if (props.selected) {
    const selectedForager = foragers.find(forager => forager._id === props.selected)
    if (selectedForager !== undefined) {
      foragerName = selectedForager.name
    }
  }

  return (
    <Layout className="lay">
      <h4>Foragers</h4>
      <h5>Please pick a selected forager</h5>
      <h5>Go to the skills tab and add a skill to your forager</h5>
      <p>Currently Selected: {foragerName}</p>
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Hp</th>
            <th scope="col">Mp</th>
            <th scope="col">Str</th>
          </tr>
        </thead>
        {foragerss}
      </table>
    </Layout>
  )
}

export default Foragers
