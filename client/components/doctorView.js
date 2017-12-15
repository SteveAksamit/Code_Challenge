import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AllPatients } from '../components'
import { fetchSingleDoctor } from '../store'

class DoctorView extends Component {

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
