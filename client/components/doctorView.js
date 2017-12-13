import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { AllPatients } from '../components'
import { fetchSinglePatient, fetchSinglePatApptsForDoc } from '../store'

const DoctorView = () => {

  return (
    <div>
      <AllPatients />
    </div>
  )

}

export default DoctorView
