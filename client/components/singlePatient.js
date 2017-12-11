import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const SinglePatient = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Single Patient</h3>
    </div>
  )
}

const mapState = (state) => {
  return {
    singlePatient: state.singlePatient
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

export default connect(mapLogin, mapDispatch)(SinglePatient)
