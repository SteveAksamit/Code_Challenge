import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../store'
import { Button, Segment, Header } from 'semantic-ui-react'

const Main = (props) => {
  const { children, handleClick, isLoggedIn, isDoctor, user } = props
  const view = isDoctor ? 'Doctor View - ' + user.username : 'Patient View - ' + user.username
  return (
    <div>
        <Segment color='grey' inverted>
          <Header textAlign='center' size='large'>Code Challenge - Steve Aksamit</Header>
          {
            isLoggedIn &&
            <Button floated='right' size='tiny' onClick={handleClick}>Logout</Button>
          }
          {isLoggedIn && <Header>{view}</Header>}
        </Segment>
      {children}
    </div>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isDoctor: state.user.isDoctor,
    user: state.user
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
