import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

class TimeSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTime: '08:00:00-00'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt, data) {
    this.setState({selectedTime: data.value})
    this.props.handleTime(data.value)
  }

  render() {
    const times = [
      { text: '8:00AM', value: '08:00:00-00' },
      { text: '8:30AM', value: '08:30:00-00' },
      { text: '9:00AM', value: '09:00:00-00' },
      { text: '9:30AM', value: '09:30:00-00' },
      { text: '10:00AM', value: '10:00:00-00' },
      { text: '10:30AM', value: '10:30:00-00' },
      { text: '11:00AM', value: '11:00:00-00' },
      { text: '11:30AM', value: '11:30:00-00' },
      { text: '12:00PM', value: '12:00:00-00' },
      { text: '12:30PM', value: '12:30:00-00' },
      { text: '1:00PM', value: '13:00:00-00' },
      { text: '1:30PM', value: '13:30:00-00' },
      { text: '2:00PM', value: '14:00:00-00' },
      { text: '2:30PM', value: '14:30:00-00' },
      { text: '3:00PM', value: '15:00:00-00' },
      { text: '3:30PM', value: '15:30:00-00' },
      { text: '4:00PM', value: '16:00:00-00' },
      { text: '4:30PM', value: '16:30:00-00' },
      { text: '5:00PM', value: '17:00:00-00' }
    ]
    return (
      <Dropdown placeholder='Select Time...' fluid selection options={times} onChange={this.handleChange} value={this.state.selectedTime} />
    )
  }
}

export default TimeSelector

