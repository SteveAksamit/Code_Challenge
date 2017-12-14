import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const SingleDocument = (props => {
  const { singleDocument, deleteDocument, viewDocument } = props
  const date = singleDocument.dateAdded.slice(0, singleDocument.dateAdded.indexOf('T'))
  const month = date.slice(5, 7)
  const day = date.slice(-2)
  const year = date.slice(0, 4)
  return (
      <Table.Row textAlign="center" key={singleDocument.id}>
        <Table.Cell>{singleDocument.title}</Table.Cell>
        <Table.Cell>{singleDocument.fileName}</Table.Cell>
        <Table.Cell>{month + '-' + day + '-' + year}</Table.Cell>
        <Table.Cell>
          <Button onClick={viewDocument} value={singleDocument.fileName} size="tiny" >View</Button>
          <Button onClick={deleteDocument} value={singleDocument.id} size="tiny" >Delete</Button></Table.Cell>
      </Table.Row>
  )
})

export default SingleDocument
