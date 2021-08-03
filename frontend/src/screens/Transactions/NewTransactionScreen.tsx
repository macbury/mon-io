import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'

import { useModalScreenBar } from '../../helpers/useSetNavBarColor'
import { useRequestGeolocation } from '../../helpers/geolocation'
import { useNewTransaction, useNewTransactionParams } from './hooks'
import Form from './Form'
import NewTransactionHeader from './NewTransactionHeader'

function NewTransactionScreen({ navigation } : NavigationStackScreenProps) {
  const {
    receiptId, categoryId, createdAt, seriesId, kind, recurrence
  } = useNewTransactionParams()

  const state = useNewTransaction(receiptId, categoryId, createdAt, seriesId, kind, recurrence)

  useRequestGeolocation()
  useModalScreenBar()

  return (
    <Form onSave={() => navigation.popToTop()} {...state} />
  )
}

// @ts-ignore
NewTransactionScreen.navigationOptions = props => ({
  title: 'pages.new_transaction.title',
  header: (props) => <NewTransactionHeader {...props} />
})


export default NewTransactionScreen