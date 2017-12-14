import React from 'react'
import { Table } from 'semantic-ui-react'

const SinglePatient = (props => {
    const {patient} = props
    let email = (Object.keys(patient).length > 0) ? patient.user.email : ''
    return (
      <div>
        <Table singleLine>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Patient Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>E-mail Address</Table.HeaderCell>
            <Table.HeaderCell>Mailing Address</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Zip</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row textAlign='center'>
            <Table.Cell>{patient.fullName}</Table.Cell>
            <Table.Cell>{patient.age}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{patient.address}</Table.Cell>
            <Table.Cell>{patient.city}</Table.Cell>
            <Table.Cell>{patient.state}</Table.Cell>
            <Table.Cell>{patient.zip}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </div>
    )
  })

export default SinglePatient
