import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class DateSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    this.props.handleDate(date)
  }

  render() {
    const excludeDates = []
    for(let i = 1; i < 90; i++){
      excludeDates.push(moment().subtract(i, "days"))
    }
    return <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange}
      excludeDates={excludeDates}
    />;
  }
}

export default DateSelector
