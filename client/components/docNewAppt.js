import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const DocNewAppt = (props) => {
  const {allPatients} = props

  return (
    <div>
      <h3>New appt form</h3>
    </div>
  )
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients
  }
}

const mapDispatch = (dispatch) => {
  return {
    // handleSubmit (evt) {
    //   evt.preventDefault()
    //   const formName = evt.target.name
    //   const username = evt.target.username.value
    //   const password = evt.target.password.value
    //   dispatch(auth(username, password, formName))
    // }
  }
}

export default connect(mapState, mapDispatch)(DocNewAppt)
