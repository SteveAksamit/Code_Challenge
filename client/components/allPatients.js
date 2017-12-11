import React, { Component } from 'react'
import { List, Button, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchAllPatients } from '../store'

class AllPatients extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchComponentData()
  }

  render() {
    let allPatients = this.props.allPatients.length > 0 ? this.props.allPatients : []
    return (
      <List divided verticalAlign='middle'>
        {allPatients.map(patient => {
          return (
            <List.Item key={patient.id}>
              <List.Content floated='right'>
                <Button>View Patient</Button>
              </List.Content>
              <Image avatar src='/assets/images/avatar/small/lena.png' />
              <List.Content>
                {patient.name}
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

const mapDispatch = (dispatch) => {
  return {
    fetchComponentData() {
      dispatch(fetchAllPatients())
    }
  }
}

export default connect(mapState, mapDispatch)(AllPatients)
