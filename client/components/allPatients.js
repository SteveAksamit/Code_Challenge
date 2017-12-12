import React, { Component } from 'react'
import { List, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchAllPatients, fetchAllApptsForDoc } from '../store'

class AllPatients extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    let allPatients = this.props.allPatients.length > 0 ? this.props.allPatients : []
    return (
      <List divided verticalAlign='middle'>
        {allPatients.map(patient => {
          return (
            <List.Item key={patient.id} animated='true'>
              <List.Content floated='right'>
                <Button onClick={this.props.handleClick} value={patient.id}>View Patient</Button>
              </List.Content>
              <List.Content>
                {patient.fullName}
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    )
  }
}

const mapState = (state) => {
  return {
    allPatients: state.allPatients
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(fetchAllPatients())
    },
    handleClick(evt) {
      ownProps.history.push(`/patient/${evt.target.value}`)
    }
  }
}

export default connect(mapState, mapDispatch)(AllPatients)
