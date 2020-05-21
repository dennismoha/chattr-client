import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Foragers from '../Foragers/Foragers'
import Forager from '../Foragers/Forager'
import ForagerCreate from '../Foragers/ForagerCreate'
import ForagerEdit from '../Foragers/ForagerEdit'
import SingleFight from '../Fight/SingleFight'
import Skills from '../Skills/Skills'
import Skill from '../Skills/Skill'
import SkillEdit from '../Skills/SkillEdit'
import SkillCreate from '../Skills/SkillCreate'
import MultiFight from '../Fight/MultiFight'
import MultiSelect from '../Fight/MultiSelect'
import Home from '../Home/Home'
import TeamFight from '../Fight/TeamFight'
import TeamFightSelect from '../Fight/TeamFightSelect'
import SingleFightSelect from '../Fight/SingleFightSelect'
import MultiTeamFightSelect from '../Fight/MultiTeamFightSelect'
// import Home from '../Home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      selected: null,
      selectedSkill: null,
      fighter: null,
      opponent: null,
      fighterSkill: null,
      opponentSkill: null,
      fighter1: null,
      fighter2: null,
      fighter1Skill: null,
      fighter2Skill: null,
      team1: [],
      team2: [],
      tem1: [],
      tem2: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setSelected = (id, sId) => {
    this.setState({ selected: id })
    this.setState({ selectedSkill: sId })
  }

  setFighter = (id, sId) => {
    this.setState({ fighter: id })
    this.setState({ fighterSkill: sId })
  }

  setOpponent = (id, sId) => {
    this.setState({ opponent: id })
    this.setState({ opponentSkill: sId })
  }

  setFighter1 = (id, sId) => {
    this.setState({ fighter1: id })
    this.setState({ fighter1Skill: sId })
  }

  setFighter2 = (id, sId) => {
    this.setState({ fighter2: id })
    this.setState({ fighter2Skill: sId })
  }

  setTeam1 = (arr) => {
    this.setState({
      team1: arr
    })
  }

  setTeam2 = (arr) => {
    this.setState({
      team2: arr
    })
  }

  setTem1 = (arr) => {
    this.setState({
      tem1: arr
    })
  }

  setTem2 = (arr) => {
    this.setState({
      tem2: arr
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container" id='mainContainer'>
          <Route user={user} exact path='/home' render={() => (
            <Home msgAlert={this.msgAlert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/foragers' render={() => (
            <Foragers msgAlert={this.msgAlert} user={user} setSelected={this.setSelected} selected={this.state.selected} />
          )} />
          <Route exact path='/foragers/:id' render={({ match }) => (
            <Forager match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/forager-create' render={() => (
            <ForagerCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/foragers/:id/edit' render={({ match }) => (
            <ForagerEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/singlefight' render={() => (
            <SingleFight msgAlert={this.msgAlert} user={user} fighter={this.state.fighter} opponent={this.state.opponent} fighterSkill={this.state.fighterSkill} enemySkill={this.state.opponentSkill} />
          )} />
          <Route exact user={user} path='/skills' render={() => (
            <Skills msgAlert={this.msgAlert} user={user} selected={this.state.selected} />
          )} />
          <Route exact path='/skills/:id' render={({ match }) => (
            <Skill match={match} msgAlert={this.msgAlert} user={user} selected={this.state.selected} />
          )} />
          <AuthenticatedRoute exact user={user} path='/skills/:id/edit' render={({ match }) => (
            <SkillEdit match={match} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/skill-create' render={() => (
            <SkillCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/games/:id/multi-fight' render={({ match }) => (
            <MultiFight match={match} msgAlert={this.msgAlert} user={user} fighter1={this.state.fighter1} fighter1Skill={this.state.fighter1Skill} fighter2={this.state.fighter2} fighter2Skill={this.state.fighter2Skill} />
          )} />
          <AuthenticatedRoute exact user={user} path='/games/:id/select' render={({ match }) => (
            <MultiSelect match={match} msgAlert={this.msgAlert} user={user} setFighter1={this.setFighter1} setFighter2={this.setFighter2} />
          )} />
          <AuthenticatedRoute exact user={user} path='/teamfight/select' render={() => (
            <TeamFightSelect msgAlert={this.msgAlert} user={user} setTeam1={this.setTeam1} setTeam2={this.setTeam2} team1={this.state.team1} team2={this.state.team2} />
          )} />
          <AuthenticatedRoute exact user={user} path='/teamfight' render={() => (
            <TeamFight msgAlert={this.msgAlert} user={user} team1={this.state.team1} team2={this.state.team2}/>
          )} />
          <AuthenticatedRoute exact user={user} path='/singlefight/select' render={() => (
            <SingleFightSelect msgAlert={this.msgAlert} user={user} setFighter={this.setFighter} setOpponent={this.setOpponent} fighter={this.state.fighter} opponent={this.state.opponent} />
          )} />
          <AuthenticatedRoute exact user={user} path='/games/:id/teamselect' render={({ match }) => (
            <MultiTeamFightSelect match={match} msgAlert={this.msgAlert} user={user} setTem1={this.setTem1} setTem2={this.setTem2} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
