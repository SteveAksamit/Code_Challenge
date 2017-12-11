import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

const Main = (props) => {
  const { children, handleClick, isLoggedIn, isDoctor } = props

  return (
    <div>
      <h1>Code Challenge - Steve Aksamit</h1>
      <nav>
        {
          isDoctor
            ? <div>
              <Link to="/allPatients">View All Patients</Link>
              <Link to="/docNewAppt">Schedule New Appointment</Link>
            </div>
            : <div>
              <Link to="/singlePatient">View My Details</Link>
              <Link to="/patNewAppt">Schedule New Appointment</Link>
            </div>
        }
        {
          isLoggedIn
            ? <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isDoctor: state.user.isDoctor
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
