import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BattleLog from './BattleLog'
import useSocket from 'socket.io-client'
import Button from 'react-bootstrap/Button'

const Fight = props => {
  const [fighter, setFighter] = useState({ name: '', description: '', hp: 1, mp: 1, str: 1 })
  const [enemy, setEnemy] = useState({ name: '', description: '', hp: 1, mp: 1, str: 1 })
  const [fighterSkill, setFighterSkill] = useState({ name: '', description: '', cost: '', resource: '' })
  const [enemySkill, setEnemySkill] = useState({ name: '', description: '', cost: '', resource: '' })
  const [turn, setTurn] = useState(1)
  const [log, setLog] = useState([])

  const socket = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    axios(`${apiUrl}/foragers`)
      .then(res => {
        const foragers = res.data.foragers
        const foundFighter = foragers.find(forager => forager._id === props.selected)
        const foundEnemy = foragers.find(forager => forager._id === props.opponent)
        foundFighter.hp = 200 + (foundFighter.hp * 2)
        foundEnemy.hp = 200 + (foundEnemy.hp * 2)
        setFighter(foundFighter)
        setEnemy(foundEnemy)
      })
      .catch()
    axios(`${apiUrl}/skills/${props.fighterSkill}`)
      .then((res) => setFighterSkill(res.data.skill))
      .catch()

    axios(`${apiUrl}/skills/${props.enemySkill}`)
      .then((res) => setEnemySkill(res.data.skill))
      .catch()

    socket.on('new peep', (fighter) => {
      if (fighter.fighter !== undefined) {
        if (fighter.fighter.editedEnemy !== undefined) {
          const editedEnemy = fighter.fighter.editedEnemy
          setEnemy(editedEnemy)
        }
      } else if (fighter.fighter !== undefined) {
        if (fighter.fighter.editedFighter !== undefined) {
          const editedFighter = fighter.fighter.editedFighter
          setFighter(editedFighter)
        }
      }
    })
  }, [])

  const templog = [...log]
  const fighterDmg = () => {
    if (fighter.str > fighter.mp) {
      const ouch = enemy.hp - fighter.str
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      templog.push({ [templog.length]: `you have dealt ${fighter.str} damage` })
      socket.emit('new peep', { fighter: { editedEnemy } })
    } else if (fighter.mp > fighter.str) {
      const ouch = enemy.hp - fighter.mp
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      templog.push({ [templog.length]: `you have dealt ${fighter.mp} damage` })
      socket.emit('new peep', { fighter: { editedEnemy } })
    } else {
      const ouch = enemy.hp - (fighter.mp + fighter.str)
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      templog.push({ [templog.length]: `you have dealt ${fighter.str + fighter.mp} damage` })
      socket.emit('new peep', { fighter: { editedEnemy } })
    }
  }

  const enemyDmg = () => {
    if (enemy.str > enemy.mp) {
      const ouch = fighter.hp - enemy.str
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      templog.push({ [templog.length]: `you have been dealt ${enemy.str} damage` })
      socket.emit('new peep', { fighter: { editedFighter } })
    } else if (enemy.mp > enemy.str) {
      const ouch = fighter.hp - enemy.mp
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      templog.push({ [templog.length]: `you have been dealt ${enemy.mp} damage` })
      socket.emit('new peep', { fighter: { editedFighter } })
    } else {
      const ouch = fighter.hp - (enemy.mp + enemy.str)
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      templog.push({ [templog.length]: `you have been dealt ${enemy.str + enemy.mp} damage` })
      socket.emit('new peep', { fighter: { editedFighter } })
    }
  }

  const fighterAttack = () => {
    const newTurn = turn + 1
    socket.emit('new peep', { turn: { newTurn } })
    socket.on('new peep', (turn) => {
      if (turn.turn !== undefined) {
        if (turn.turn.newTurn !== undefined) {
          setTurn(newTurn)
        }
      }
    })
    fighterDmg()
    setLog([...templog])
  }

  const enemyAttack = () => {
    const newTurn = turn + 1
    socket.emit('new peep', { turn: { newTurn } })
    socket.on('new peep', (turn) => {
      if (turn.turn !== undefined) {
        if (turn.turn.newTurn !== undefined) {
          setTurn(newTurn)
        }
      }
    })
    enemyDmg()
    setLog([...templog])
  }

  let updatedHp1
  let updatedStat1
  let updatedHp2
  let updatedStat2
  const fighterAbility = () => {
    let ouch
    if (fighterSkill.resource === 'mp') {
      ouch = enemy.hp - Math.floor((Math.pow(fighterSkill.cost, 1.2)))
      const weak = fighter.mp - fighterSkill.cost
      updatedStat1 = { mp: weak }
      templog.push({ [templog.length]: `you have dealt ${Math.floor((Math.pow(fighterSkill.cost, 1.2)))} damage` })
      if (fighter.mp < 0) {
        templog.push('Your skill resource is negative, you have healed your opponent for 300hp')
      }
    } else {
      ouch = enemy.hp - ((fighterSkill.cost * 2) + 10)
      const weak = fighter.str - fighterSkill.cost
      updatedStat1 = { str: weak }
      templog.push({ [templog.length]: `you have dealt ${(fighterSkill.cost * 2) + 10} damage` })
      if (fighter.str < 0) {
        templog.push({ [templog.length]: 'Your skill resource is negative, you have healed your opponent for 300hp' })
      }
    }
    if (fighter.mp < 0 || fighter.str < 0) {
      ouch = ouch + 300
    }
    updatedHp1 = { hp: ouch }
  }

  const enemyAbility = () => {
    let ouch2
    if (enemySkill.resource === 'mp') {
      ouch2 = fighter.hp - Math.floor((Math.pow(enemySkill.cost, 1.2)))
      const weak = enemy.mp - enemySkill.cost
      updatedStat2 = { mp: weak }
      templog.push({ [templog.length]: `you have been dealt ${Math.floor((Math.pow(enemySkill.cost, 1.2)))} damage` })
      if (enemy.mp < 0) {
        templog.push({ [templog.length]: 'Your enemies skill resource is negative, you have been healed for 300hp' })
      }
    } else {
      ouch2 = fighter.hp - ((enemySkill.cost * 2) + 10)
      const weak = enemy.str - enemySkill.cost
      updatedStat2 = { str: weak }
      templog.push({ [templog.length]: `you have been dealt ${(enemySkill.cost * 2) + 10} damage` })
      if (enemy.str < 0) {
        templog.push({ [templog.length]: 'Your enemies skill resource is negative, you have been healed for 300hp' })
      }
    }
    if (enemy.mp < 0 || enemy.str < 0) {
      ouch2 = ouch2 + 300
    }
    updatedHp2 = { hp: ouch2 }
  }

  const fighterUseAbility = () => {
    const newTurn = turn + 1
    socket.emit('new peep', { turn: { newTurn } })
    socket.on('new peep', (turn) => {
      if (turn.turn !== undefined) {
        if (turn.turn.newTurn !== undefined) {
          setTurn(newTurn)
        }
      }
    })
    fighterAbility()
    const editedFighter = Object.assign({ ...fighter }, updatedHp2, updatedStat1)
    const editedEnemy = Object.assign({ ...enemy }, updatedHp1, updatedStat2)
    setLog([...templog])
    socket.emit('new peep', { fighter: { editedFighter } })
    socket.emit('new peep', { fighter: { editedEnemy } })
  }

  const enemyUseAbility = () => {
    const newTurn = turn + 1
    socket.emit('new peep', { turn: { newTurn } })
    socket.on('new peep', (turn) => {
      if (turn.turn !== undefined) {
        if (turn.turn.newTurn !== undefined) {
          setTurn(newTurn)
        }
      }
    })
    enemyAbility()
    const editedEnemy = Object.assign({ ...enemy }, updatedHp1, updatedStat2)
    const editedFighter = Object.assign({ ...fighter }, updatedHp2, updatedStat1)
    setLog([...templog])
    socket.emit('new peep', { fighter: { editedEnemy } })
    socket.emit('new peep', { fighter: { editedFighter } })
  }

  if (fighter.hp <= 0 && enemy.hp <= 0) {
    return 'Its a tie!'
  }

  if (fighter.hp <= 0) {
    return 'You lose!'
  }

  if (enemy.hp <= 0) {
    return 'You win!'
  }

  if (turn === 15) {
    return 'Game Over!'
  }
  const enemyButton = (
    <div>
      <Button onClick={enemyAttack}>Attack!</Button>
      <Button onClick={enemyUseAbility}>Use your Ability!</Button>
    </div>
  )

  const fighterButton = (
    <p>
      <Button onClick={fighterAttack}>Attack!</Button>
      <Button onClick={fighterUseAbility}>Use your Ability!</Button>
    </p>
  )
  return (
    <div>
      <ul>your stats:
        <li>hp: {fighter.hp}</li>
        <li>str: {fighter.str}</li>
        <li>mp: {fighter.mp}</li>
        <li>skill: {fighterSkill.name}</li>
        {(turn % 2 === 0) ? <div>{ fighterButton }</div> : '' }
      </ul>

      <ul>opponents stats:
        <li>hp: {enemy.hp}</li>
        <li>str: {enemy.str}</li>
        <li>mp: {enemy.mp}</li>
        <li>skill: {enemySkill.name}</li>
        {(turn % 2 !== 0) ? <p>{ enemyButton }</p> : '' }
      </ul>
      <BattleLog log={log} />
    </div>
  )
}

export default Fight
