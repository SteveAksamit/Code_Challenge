import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { AllPatients } from '../components'
import { fetchSingleDoctor } from '../store'

class DoctorView extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    const { user } = this.props
    this.props.loadInitialData(user.id)
  }

  render() {
    return (
      Object.keys(this.props.loggedInDoctor).length > 0 &&
      <div>
        <AllPatients doctorId={this.props.loggedInDoctor.id} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    loggedInDoctor: state.loggedInDoctor

  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userId) {
      dispatch(fetchSingleDoctor(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(DoctorView)
