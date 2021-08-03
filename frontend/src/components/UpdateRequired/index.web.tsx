import React from 'react'
import logger from '../../helpers/logger'

const log = logger('UpdateRequired')

export default function UpdateRequired({ children }) {
  log('is disabled for web')
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}