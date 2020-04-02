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
import Fight from '../Fight/Fight'
import Skills from '../Skills/Skills'
import Skill from '../Skills/Skill'
import SkillEdit from '../Skills/SkillEdit'
import SkillCreate from '../Skills/SkillCreate'
import MultiFight from '../Fight/MultiFight'
// import Home from '../Home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      selected: null,
      opponent: null,
      selectedSkill: null,
      opponentSkill: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setSelected = (id, sId) => {
    this.setState({ selected: id })
    this.setState({ selectedSkill: sId })
  }

  setOpponent = (id, sId) => {
    this.setState({ opponent: id })
    this.setState({ opponentSkill: sId })
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
        <main className="container">
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
            <Foragers msgAlert={this.msgAlert} setSelected={this.setSelected} setOpponent={this.setOpponent} opponent={this.state.opponent} selected={this.state.selected} />
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
          <AuthenticatedRoute exact user={user} path='/fight' render={() => (
            <Fight msgAlert={this.msgAlert} user={user} selected={this.state.selected} opponent={this.state.opponent} fighterSkill={this.state.selectedSkill} enemySkill={this.state.opponentSkill} />
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
          <AuthenticatedRoute exact user={user} path='/multi-fight' render={() => (
            <MultiFight msgAlert={this.msgAlert} user={user} selected={this.state.selected} opponent={this.state.opponent} fighterSkill={this.state.selectedSkill} enemySkill={this.state.opponentSkill} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
