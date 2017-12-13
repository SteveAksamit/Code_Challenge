import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, AllPatients, SinglePatient, DocNewAppt, PatNewAppt, DoctorView} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isDoctor} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/login" component={Login} />
            {
              isLoggedIn && isDoctor &&
                <Switch>
                  <Route exact path="/" component={DoctorView} />
                  <Route path="/DoctorView" component={DoctorView} />
                  <Route path="/docNewAppt" component={DocNewAppt} />
                  <Route path="/patient/:patientId" component={SinglePatient} />
                </Switch>
            }
            {
              isLoggedIn && !isDoctor &&
                <Switch>
                  <Route path="/singlePatient" component={SinglePatient} />
                  <Route path="/patNewAppt" component={PatNewAppt} />
                </Switch>
            }
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
