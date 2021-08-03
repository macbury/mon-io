import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationStackScreenProps } from 'react-navigation-stack'

import ErrorMessageContent from '../../components/ErrorMessageContent'
import { useModalScreenBar } from '../../helpers/useSetNavBarColor'
import AppHeader from '../../components/layout/AppHeader'
import { EditTransactionMenu } from '../../components/TransactionForm/EditMenu'

import { useEditTransaction, useEditStore } from './hooks'
import Form from './Form'

function EditTransactionScreen({ navigation } : NavigationStackScreenProps) {
  const { t } = useTranslation()
  const transactionId = navigation.getParam('transactionId')
  const state = useEditTransaction(transactionId)

  useModalScreenBar()

  if (state.notFound) {
    return <ErrorMessageContent message={t('pages.edit_transaction.not_found')} />
  }

  return (
    <Form onSave={() => navigation.popToTop()} {...state} />
  )
}

function EditHeader(props) {
  const { navigation } = props
  const { transaction } = useEditStore()

  return (
    <AppHeader {...props}>
      <EditTransactionMenu
        transaction={transaction}
        onHideScreen={() => navigation.pop()} />
    </AppHeader>
  )
}

// @ts-ignore
EditTransactionScreen.navigationOptions = props => ({
  title: 'pages.edit_transaction.title',
  header: (props) => <EditHeader {...props} />
})


export default EditTransactionScreen