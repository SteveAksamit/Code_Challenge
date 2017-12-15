import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Button, Form, Message, Segment } from 'semantic-ui-react'

const AuthForm = (props) => {
  const { handleSubmit, error } = props

  return (
    <div style ={{'display': 'flex'}}>
    <Segment compact style={{'margin': 'auto'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input name="username" label='Username' placeholder='Username' required />
          <Form.Input name="password" label='Password' placeholder='Password' required style={{'paddingRight': '1.5em'}} />
        </Form.Group>
        <div>
          <Button type="submit">Login</Button>
        </div>
      </Form>
      {error && error.response &&
        <Message color='red'> {error.response.data}</Message>
      }
      <Message>
        <Message.Header>Test User Credentials</Message.Header>
        <Message.List>
          <Message.Item>Sample Doctor - Username: doctor  /  Password: 123</Message.Item>
          <Message.Item>Sample Patient - Username: patient  /  Password: 123</Message.Item>
        </Message.List>
      </Message>
      </Segment>
    </div>

  )
}

const mapLogin = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(auth(username, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
