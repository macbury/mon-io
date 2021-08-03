import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import { TabView, SceneMap } from 'react-native-tab-view'

import Tabs from '../Tabs'

import DialogContainer from '../DialogContainer'
import useCategories from './useCategories'
import {
  DepositKindTab,
  ExpensesKindTab,
  IncomeKindTab,
  WithdrawKindTab,
  SavingsKindTab,
  LoansKindTab
} from './CategoriesTab'

const Container = styled(DialogContainer)`
  width: ${({ theme }) => theme.device === "desktop" ? '700px' : '95%'};
  display: flex;
  align-self: center;
  flex-shrink: 1;
  height: 80%;
`

const Actions = styled(Dialog.Actions)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
`

interface ICategoryPickerDialogProps {
}

export default function CategoryPickerDialog(props : ICategoryPickerDialogProps) {
  const { t } = useTranslation()
  const {
    tabIndex,
    visible,
    routes,

    cancel,
    setTabIndex
  } = useCategories()

  const renderScene = SceneMap({
    expenses: ExpensesKindTab,
    income: IncomeKindTab,
    deposit: DepositKindTab,
    withdraw: WithdrawKindTab,
    savings: SavingsKindTab,
    loans: LoansKindTab
  })

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <TabView
          renderTabBar={(props) => <Tabs {...props} />}
          navigationState={{ index: tabIndex, routes }}
          renderScene={renderScene}
          onIndexChange={setTabIndex} />

        <Actions>
          <Button onPress={cancel}>{t('dialogs.categories.cancel')}</Button>
        </Actions>
      </Container>
    </Portal>
  )
}