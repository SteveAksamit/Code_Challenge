import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postNewApptFromDoc} from './store'
import { Table, Form, Button, Message, Input } from 'semantic-ui-react'

export const DocNewAppt = (props) => {
  const {allPatients} = props

  return (
    <Segment>
    <Form>
      <Form.Group widths={2}>
        <Form.Input label='First Name' placeholder='First Name' />
        <Form.Input label='Last Name' placeholder='Last Name' />
      </Form.Group>
      <Accordion as={Form.Field} panels={panels} />

      <Button secondary>Sign Up</Button>
    </Form>
  </Segment>
  )
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(postNewApptFromDoc(date, patientId, purpose))
    }
  }
}

export default connect(mapState, mapDispatch)(DocNewAppt)
