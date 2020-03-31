import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BattleLog from './BattleLog'

const Fight = props => {
  const [fighter, setFighter] = useState({ name: '', description: '', hp: 1, mp: 1, str: 1 })
  const [enemy, setEnemy] = useState({ name: '', description: '', hp: 1, mp: 1, str: 1 })
  const [fighterSkill, setFighterSkill] = useState({ name: '', description: '', cost: '', resource: '' })
  const [enemySkill, setEnemySkill] = useState({ name: '', description: '', cost: '', resource: '' })
  const [turn, setTurn] = useState(1)
  const log = []

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
      .catch(console.error)
  }, [])

  const fighterDmg = () => {
    if (enemy.str > enemy.mp) {
      const ouch = enemy.hp - fighter.str
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      log.push(`you have dealt ${fighter.str} damage`)
    } else if (enemy.mp > fighter.str) {
      const ouch = enemy.hp - enemy.mp
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      log.push(`you have dealt ${fighter.mp} damage`)
    } else {
      const ouch = enemy.hp - (fighter.mp + fighter.str)
      const updatedHp = { hp: ouch }
      const editedEnemy = Object.assign({ ...enemy }, updatedHp)
      setEnemy(editedEnemy)
      log.push(`you have dealt ${fighter.str + fighter.mp} damage`)
    }
  }

  const enemyDmg = () => {
    if (enemy.str > enemy.mp) {
      const ouch = fighter.hp - enemy.str
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      log.push(`you have been dealt ${enemy.str} damage`)
    } else if (enemy.mp > enemy.str) {
      const ouch = fighter.hp - enemy.mp
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      log.push(`you have been dealt ${enemy.mp} damage`)
    } else {
      const ouch = fighter.hp - (enemy.mp + enemy.str)
      const updatedHp = { hp: ouch }
      const editedFighter = Object.assign({ ...fighter }, updatedHp)
      setFighter(editedFighter)
      log.push(`you have been dealt ${enemy.str + enemy.mp} damage`)
    }
    console.log(log)
  }

  const attack = () => {
    const newTurn = turn + 2
    setTurn(newTurn)
    fighterDmg()
    enemyDmg()
  }

  const fighterAbility = () => {
    let updatedStat
    let ouch
    if (fighterSkill.resource === 'mp') {
      ouch = enemy.hp - (Math.pow(fighter.mp, 1.2))
      const weak = fighter.mp - fighterSkill.cost
      updatedStat = { mp: weak }
    } else {
      ouch = enemy.hp - ((fighter.str * 2) + 10)
      const weak = fighter.str - fighterSkill.cost
      updatedStat = { str: weak }
    }
    const updatedHp = { hp: ouch }
    const editedEnemy = Object.assign({ ...enemy }, updatedHp)
    const editedFighter = Object.assign({ ...fighter }, updatedStat)
    setEnemy(editedEnemy)
    setFighter(editedFighter)
  }

  const enemyAbility = () => {
    let updatedStat
    let ouch
    if (enemySkill.resource === 'mp') {
      ouch = fighter.hp - (Math.pow(enemy.mp, 1.2))
      const weak = fighter.mp - enemySkill.cost
      updatedStat = { mp: weak }
    } else {
      ouch = fighter.hp - ((fighter.str * 2) + 10)
      const weak = fighter.str - enemySkill.cost
      updatedStat = { str: weak }
    }
    const updatedHp = { hp: ouch }
    const editedFighter = Object.assign({ ...fighter }, updatedHp)
    const editedEnemy = Object.assign({ ...enemy }, updatedStat)
    setFighter(editedFighter)
    setEnemy(editedEnemy)
  }

  const useAbility = () => {
    const newTurn = turn + 2
    setTurn(newTurn)
    fighterAbility()
    enemyAbility()
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
    return 'Game Over'
  }

  return (
    <div>
      <span>
        <ul>your stats:
          <li>hp: {fighter.hp}</li>
          <li>str: {fighter.str}</li>
          <li>mp: {fighter.mp}</li>
          <li>skill: {fighterSkill}</li>
        </ul>
      </span>
      <span>
        <ul>opponents stats:
          <li>hp: {enemy.hp}</li>
          <li>str: {enemy.str}</li>
          <li>mp: {enemy.mp}</li>
          <li>skill: {enemySkill}</li>
        </ul>
      </span>
      <button onClick={attack}>Attack!</button>
      <button onClick={useAbility}>Use Ability!</button>
      <div>
        <BattleLog log={log}/>
      </div>
    </div>
  )
}

export default Fight
