import React, { useCallback, useEffect } from 'react'
import moment from 'moment-timezone'
import { NavigationInjectedProps, ScrollView } from 'react-navigation'
import styled from 'styled-components/native'

import { useIsFocused } from 'react-navigation-hooks'
import { Category, TransactionCategoryKind } from '../../api/graphql'
import { newSummaryTransactionPath, transactionsPath } from '../../helpers/urls'
import { useSummary } from './hooks'

import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'
import WideContainer from '../../components/layout/WideContainer'
import CategorySummaryCircle from '../../components/CategorySummaryCircle'
import CategorySummaryGrid from '../../components/CategorySummaryGrid'
import FullPageLoader from '../../components/layout/FullPageLoader'
import Desktop from '../../components/responsive/Desktop'
import Mobile from '../../components/responsive/Mobile'
import TransactionList from '../../components/TransactionList'
import SummaryHeader from './Header'
import SummaryMenu from './Menu'

const StyledTransactionList = styled(TransactionList)`
  flex: 1;
`

const MobileContainer = styled(ScrollView)`

`

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`

const DesktopSummaryContainer = styled(ScrollView)`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 480px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

function SummaryScreen({ navigation } : NavigationInjectedProps) {
  const {
    type,
    summaryForCategories,
    transactions,
    loading,
    sumOfCategoriesInCents,
    currentDate,
    mainCurrency,

    changeDate,
    refresh
  } = useSummary()

  const isFocused = useIsFocused()
  const dateParam = navigation.getParam('date')
  const typeParam = navigation.getParam('type')

  useEffect(() => {
    changeDate(dateParam, typeParam)
  }, [dateParam, typeParam])

  useEffect(() => {
    if (isFocused) {
      refresh()
    }
  }, [isFocused, refresh])

  useDefaultScreenBar()

  const newTransactionWithCategoryPress = useCallback((category : Category, kind: TransactionCategoryKind) => {
    const today = moment()
    if (currentDate.isSame(today, 'month')) {
      navigation.navigate(newSummaryTransactionPath(category.id, today.toISOString(), kind))
    } else if (currentDate) {
      navigation.navigate(newSummaryTransactionPath(category.id, currentDate.toISOString(), kind))
    }
  }, [currentDate, navigation])

  const onShowTransactionsPress = useCallback(() => {
    navigation.navigate(transactionsPath(currentDate, type))
  }, [currentDate, navigation, type])

  if (loading) {
    return <FullPageLoader />
  }

  const CategorySummary = type === TransactionCategoryKind.IncomeOrSaving ? (
    <CategorySummaryGrid
      onPress={onShowTransactionsPress}
      mainCurrency={mainCurrency}
      categories={summaryForCategories}
      currentDate={currentDate}
      sumOfCategoriesInCents={sumOfCategoriesInCents}
      onCategoryPress={newTransactionWithCategoryPress} />
  ) : (
    <CategorySummaryCircle
      onPress={onShowTransactionsPress}
      mainCurrency={mainCurrency}
      categories={summaryForCategories}
      currentDate={currentDate}
      sumOfCategoriesInCents={sumOfCategoriesInCents}
      onCategoryPress={newTransactionWithCategoryPress} />
  )

  return (
    <WideContainer>
      <Container>
        <Desktop>
          <StyledTransactionList transactions={transactions} />
          <DesktopSummaryContainer>
            {CategorySummary}
          </DesktopSummaryContainer>
        </Desktop>
        <Mobile>
          <MobileContainer>
            {CategorySummary}
          </MobileContainer>
        </Mobile>
      </Container>
    </WideContainer>
  )
}

// @ts-ignore
SummaryScreen.navigationOptions = props => ({
  title: 'pages.summary.title',
  header: (props) => <SummaryHeader {...props} />,
  menu: () => <SummaryMenu />
})

export default SummaryScreen