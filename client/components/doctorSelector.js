import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import { fetchDoctors } from '../store'
import { connect } from 'react-redux'

class DoctorSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDoctor: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.props.loadInitialData()
  }
  handleChange(evt, data) {
    this.setState({selectedDoctor: data.value})
    console.log(data.value)
    this.props.handleDoctor(data.value)
  }

  render() {
    const options = []
    const doctors = this.props.doctors
    doctors.forEach(singleDoctor =>{
      options.push({text: singleDoctor.name, value: singleDoctor.id})
    })

    return (
      <Dropdown placeholder='Select Doctor...' fluid selection options={options} onChange={this.handleChange} value={this.state.selectedDoctor} />
    )
  }
}

const mapState = (state) => {
  return {
    doctors: state.doctors,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchDoctors())
    }
  }
}

export default connect(mapState, mapDispatch)(DoctorSelector)

