import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, PatientView, DoctorView } from './components'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isDoctor } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/login" component={Login} />
            {
              isLoggedIn && isDoctor &&
              <Switch>
                <Route exact path="/" component={DoctorView} />
                <Route path="/doctor" component={DoctorView} />
              </Switch>
            }
            {
              isLoggedIn && !isDoctor &&
              <Switch>
                <Route exact path="/" component={PatientView} />
                <Route path="/patient" component={PatientView} />
              </Switch>
            }
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
