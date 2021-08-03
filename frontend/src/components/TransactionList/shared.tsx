import React from 'react'
import { Headline } from 'react-native-paper'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'

import TransactionPeriod from '../../stores/Screens/SummaryStore/TransactionPeriod'
import { Category, Currency } from '../../api/graphql'

export interface ITransactionList {
  transactions: TransactionPeriod[]
  header?: any
  extraData?: any
}

const NoDataContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
`

const NoDataTitle = styled(Headline)`

` 

export function EmptyList() {
  const i18n = useTranslation()

  return (
    <NoDataContainer>
      <NoDataTitle>{i18n.t('pages.summary.transactions.empty')}</NoDataTitle>
    </NoDataContainer>
  )
}