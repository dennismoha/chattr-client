import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import Button from 'react-bootstrap/Button'
import useSocket from 'socket.io-client'
import { CopyToClipboard } from 'react-copy-to-clipboard'
// import LetsFight from '../shared/LetsFight'
const MultiSelect = props => {
  const [game, setGame] = useState({ player1: '', player2: '' })
  const [foragers, setForagers] = useState([])
  const [skills, setSkills] = useState([])
  const [fighter1, setFighter1] = useState(null)
  const [fighter2, setFighter2] = useState(null)
  const [fighter3, setFighter3] = useState(null)
  const [fighter4, setFighter4] = useState(null)
  const [fighter5, setFighter5] = useState(null)
  const [fighter6, setFighter6] = useState(null)
  const [tem1, setTem1] = useState([])
  const [tem2, setTem2] = useState([])
  const [confirm1, setConfirm1] = useState(false)
  const [confirm2, setConfirm2] = useState(false)
  const [copier, setCopier] = useState(window.location.href)

  const socket = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        setGame(res.data.game)
      })
      .catch()
    axios(`${apiUrl}/foragers`)
      .then(res => setForagers(res.data.foragers))
      .catch()

    socket.on('new peep', (fighter) => {
      if (fighter.fighter) {
        if (fighter.fighter.teammate1) {
          const team1 = [...tem1]
          tem1.push(fighter.fighter.teammate1)
          setTem1(team1)
        }
      }
      if (fighter.fighter) {
        if (fighter.fighter.teammate2) {
          const team2 = [...tem2]
          tem2.push(fighter.fighter.teammate2)
          setTem2(team2)
        }
      }
      if (fighter.game) {
        setGame(fighter.game.gamey)
      }
      if (fighter.confirm1) {
        setConfirm1(true)
      }
      if (fighter.confirm2) {
        setConfirm2(true)
      }
    })
  }, [])
  const foragerss = foragers.map(forager => {
    const tem1Selector = () => {
      // setFighter1(forager._id)
      // setFighter1Skill(forager.skill)
      const teammate1 = forager
      socket.emit('new peep', { fighter: { teammate1 } })
    }
    const tem2Selector = () => {
      // setFighter2(forager._id)
      // setFighter2Skill(forager.skill)
      const teammate2 = forager
      socket.emit('new peep', { fighter: { teammate2 } })
    }

    return (
      <tbody className="lay" key={forager._id}>
        <tr>
          <td><Link to={`/foragers/${forager._id}`}>{forager.name}<br></br></Link>
            {props.user._id === game.player1 && (game.player2) && tem1.length <= 3 ? <Button variant="secondary" onClick={tem1Selector}>Team 1</Button> : ''}
            {props.user._id === game.player2 && tem2.length <= 3 ? <Button variant="secondary" onClick={tem2Selector}>Team 2</Button> : ''}
          </td>
          <td>{forager.description}</td>
          <td>{forager.hp}</td>
          <td>{forager.mp}</td>
          <td>{forager.str}</td>
        </tr>
      </tbody>
    )
  })

  const p2 = () => {
    axios({
      url: `${apiUrl}/games/${props.match.params.id}`,
      method: 'PATCH',
      data: { 'game': {
        'player2': `${props.user._id}`
      }
      },
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then((res) => {
        const gamey = res.data.game
        socket.emit('new peep', { game: { gamey } })
        setGame(res.data.game)
      })
  }

  const confirmation1 = () => {
    setConfirm1(true)
    socket.emit('new peep', { confirm1: true })
    props.setTem1(tem1)
    props.setTem2(tem2)
  }

  const confirmation2 = () => {
    setConfirm2(true)
    socket.emit('new peep', { confirm2: true })
    props.setTem2(tem2)
    props.setTem1(tem1)
  }

  if (confirm1 === true) {
    if (confirm2 === true) {
      return <Redirect to={`/games/${game._id}/multiTeamFight`} />
    }
  }

  const confirmButton1 = (
    <Button onClick={confirmation1} type='button'>
      Lock in your team player 1
    </Button>
  )

  const confirmButton2 = (
    <Button onClick={confirmation2} type='button'>
      Lock in your team player 2
    </Button>
  )

  const p2Button = (
    <Button onClick={p2} type='button'>
      Are you Playing?
    </Button>
  )

  const handleChange = event => {
    const updatedField = event.target.value

    setCopier(updatedField)

    // setForager({ ...forager, [event.target.name]: event.target.value })
  }

  const urlCopier = (
    <div>
      <input value={copier} onChange={handleChange} />
      <CopyToClipboard text={copier}>
        <button>Copy URL</button>
      </CopyToClipboard>
    </div>
  )
  return (
    <Layout>
      <h4>Foragers</h4>
      {(game.player1 && game.player2) ? <h5>Please pick a selected forager and an opponent</h5> : <div><p>Please send your friend this link to get started:</p> { urlCopier }</div>}
      <p>Forager 1: {fighter1Name}<br></br>
      Skill: {fighter1SkillName}</p>
      <p>Forager 2: {fighter2Name}<br></br>
      Skill: {fighter2SkillName}</p>
      {((game) && (game.player2)) || ((game) && (props.user._id === game.player1)) ? '' : <p>{p2Button}</p>}
      {((fighter1Name !== '') && (fighter2Name !== '') && (props.user._id === game.player1) && (confirm1 === false)) ? <p>{confirmButton1}</p> : ''}
      {((fighter1Name !== '') && (fighter2Name !== '') && (props.user._id === game.player2) && (confirm2 === false)) ? <p>{confirmButton2}</p> : ''}
      <div>{(fighter1Name === '' && (game.player2) && (props.user._id === game.player1)) ? 'Please pick your forager' : ''}
        {(fighter2Name === '' && (game.player2) && (props.user._id === game.player2)) ? 'Please pick your forager' : ''}</div>
      {(fighter1Name === '' && (props.user._id === game.player2) ? 'Waiting for player 1 to choose a forager...' : '')}
      {(fighter2Name === '' && (game.player2) && (props.user._id === game.player1) ? 'Waiting for player 2 to choose a forager...' : '')}
      <div>{((fighter2Name !== '') && (fighter1Name !== '') && (confirm1 === false) && (props.user._id === game.player1)) ? 'Please lock in your forager' : ''}
        {((fighter2Name !== '') && (fighter1Name !== '') && (confirm2 === false) && (props.user._id === game.player2)) ? 'Please lock in your forager' : ''}</div>
      {(fighter2Name !== '' && (fighter1Name !== '') && (confirm2 === false) && (props.user._id === game.player1) ? 'Waiting for player 2 to lock in...' : '')}
      {(fighter1Name !== '' && (fighter1Name !== '') && (confirm1 === false) && (props.user._id === game.player2) ? 'Waiting for player 1 to lock in...' : '')}
      {(!game.player2) ? 'Waiting for player 2 to join...' : ''}
      <table className="table">
        <thead>
          <tr className="lay">
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">hp</th>
            <th scope="col">mp</th>
            <th scope="col">str</th>
          </tr>
        </thead>
        {foragerss}
      </table>
    </Layout>
  )
}

export default MultiSelect
