import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { useIsFocused } from 'react-navigation-hooks'
import moment, { Moment } from 'moment-timezone'
import { Menu, IconButton, Divider } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { StatusBar } from 'react-native'

import tabBarIcon from '../hoc/tabBarIcon'
import WideContainer from '../components/layout/WideContainer'
import FullPageLoader from '../components/layout/FullPageLoader'
import DateNavigation from '../components/DateNavigation'
import DateNavigationHeader from '../components/layout/DateNavigationHeader'
import ErrorMessageContent from '../components/ErrorMessageContent'
import { useDefaultScreenBar } from '../helpers/useSetNavBarColor'
import { useStoreData } from '../stores'

import BudgetList from '../components/BudgetList'
import Summary from '../components/BudgetList/Summary'
import { editCategoryBudgetPath, budgetPath } from '../helpers/urls'

function useBudget() {
  return useStoreData(({ screens: { budget } }) => ({
    changeDate: budget.changeDate,
    update: budget.update,
    copyLastMonth: budget.copyLastMonth,
    copyMissingFromLastMonth: budget.copyMissingFromLastMonth,
    clearBudget: budget.clearBudget,

    currentDate: budget.currentDate,
    period: budget.current,
    loading: budget.isLoading,
    budgetId: budget.id
  }))
}

function useCurrentBudget() {
  return useStoreData(({ settings, screens: { budget: { current } } }) => {
    return {
      refreshBudget: current?.refresh,

      currency: settings.mainCurrency,
      totalPlanned: current?.totalPlanned,
      totalSpend: current?.totalSpend,
      left: current?.left,
      date: current?.date,
      missing: current?.missing,
      notBudgeted: current?.notBudgeted,
      refreshing: current?.isRefreshing,
      allIncomes: current?.allIncomes,
      allExpenses: current?.allExpenses,
      allDeposits: current?.allDeposits,
      allWithdraws: current?.allWithdraws,
      allLoans: current?.allLoans,
      loansBudgetCategories: current?.loansBudgetCategories,
      expensesBudgetCategories: current?.expensesBudgetCategories,
      depositBudgetCategories: current?.depositBudgetCategories,
      withdrawBudgetCategories: current?.withdrawBudgetCategories,
      incomeBudgetCategories: current?.incomeBudgetCategories,
      expensesMissingCategories: current?.expensesMissingCategories,
      incomeMissingCategories: current?.incomeMissingCategories,
      depositMissingCategories: current?.depositMissingCategories,
      loansMissingCategories: current?.loansMissingCategories,
      withdrawMissingCategories: current?.withdrawMissingCategories,
    }
  })
}

//TODO: Move this to separate components
function BudgetActionMenu() {
  const {
    update,
    copyLastMonth,
    copyMissingFromLastMonth,
    clearBudget
  } = useBudget()

  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const showMenu = useCallback(() => setVisible(true), [setVisible])

  const onReloadPress = useCallback(() => {
    update()
    hideMenu()
  }, [hideMenu, update])

  const onCopyLastMonth = useCallback(() => {
    hideMenu()
    copyLastMonth()
  }, [hideMenu, copyLastMonth])

  const onCopyMissingFromLastMonth = useCallback(() => {
    hideMenu()
    copyMissingFromLastMonth()
  }, [hideMenu, copyMissingFromLastMonth])

  const onClearBudget = useCallback(() => {
    hideMenu()
    clearBudget()
  }, [hideMenu, clearBudget])

  return (
    <Menu statusBarHeight={StatusBar.currentHeight} onDismiss={hideMenu} visible={visible} anchor={<IconButton icon="dots-vertical" onPress={showMenu} />}>
      <Menu.Item icon="content-duplicate" title={t('pages.budget.menu.copy_last_month')} onPress={onCopyLastMonth} />
      <Menu.Item icon="content-copy" title={t('pages.budget.menu.fill_last_month')} onPress={onCopyMissingFromLastMonth} />
      <Divider />
      <Menu.Item icon="trash-can" title={t('pages.budget.menu.clear_budget')} onPress={onClearBudget} />
      <Divider />
      <Menu.Item icon="reload" title={t('pages.budget.menu.reload')} onPress={onReloadPress} />
    </Menu>
  )
}

function BudgetHeader(props) {
  const { currentDate } = useBudget()
  const isToday = useMemo(() => (currentDate.isSame(moment(), 'month')), [currentDate])
  const budgetNavigationAction = useCallback((date : Moment) => (budgetPath(date)), [currentDate])

  return (
    <DateNavigationHeader
      active={isToday}
      currentDate={currentDate}
      onChangeDate={budgetNavigationAction}
      {...props}>
      <BudgetActionMenu />
    </DateNavigationHeader>
  )
}


function BudgetMenu() {
  const {
    currentDate
  } = useBudget()

  const isToday = useMemo(() => (currentDate.isSame(moment(), 'month')), [currentDate])
  const budgetNavigationAction = useCallback(budgetPath, [currentDate])

  return (
    <React.Fragment>
      <DateNavigation
        today={isToday}
        currentDate={currentDate}
        onChangeDate={budgetNavigationAction} />
      <BudgetActionMenu />
    </React.Fragment>
  )
}

function BudgetScreen({ navigation } : NavigationInjectedProps) {
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const {
    changeDate,
    update,

    loading,
    period,
    budgetId
  } = useBudget()

  useDefaultScreenBar()

  useEffect(() => {
    if (isFocused) {
      update()
    }
  }, [update, isFocused])

  const dateParam = navigation.getParam('date')

  const onAddCategoryPress = useCallback(({ id }, type) => {
    navigation.navigate(editCategoryBudgetPath(budgetId, id, type))
  }, [budgetId, navigation])

  const {
    currency,
    totalSpend,
    totalPlanned,
    left,
    missing,
    allDeposits,
    expensesBudgetCategories,
    incomeBudgetCategories,
    expensesMissingCategories,
    incomeMissingCategories,
    depositMissingCategories,
    withdrawMissingCategories,
    loansBudgetCategories,
    loansMissingCategories,
    depositBudgetCategories,
    withdrawBudgetCategories,
    allExpenses,
    allIncomes,
    allLoans,
    allWithdraws,
    notBudgeted,
    refreshing,
    date,

    refreshBudget
  } = useCurrentBudget()

  useEffect(() => {
    changeDate(dateParam)
  }, [dateParam, changeDate])

  if (loading || !period) {
    return <FullPageLoader />
  }

  const isEmptyList = allExpenses.length === 0 && allIncomes.length === 0

  if (isEmptyList) {
    return (
      <WideContainer>
        <ErrorMessageContent message={t('pages.budget.empty')} />
      </WideContainer>
    )
  }

  return (
    <WideContainer>
      <BudgetList
        onRefresh={refreshBudget}
        onAddCategoryPress={onAddCategoryPress}
        refreshing={refreshing}
        budgetId={budgetId}
        allWithdraws={allWithdraws}
        allIncomes={allIncomes}
        allExpenses={allExpenses}
        allLoans={allLoans}
        allDeposits={allDeposits}
        loansBudgetCategories={loansBudgetCategories}
        depositBudgetCategories={depositBudgetCategories}
        withdrawBudgetCategories={withdrawBudgetCategories}
        expensesBudgetCategories={expensesBudgetCategories}
        incomeBudgetCategories={incomeBudgetCategories}
        expenseCategories={expensesMissingCategories}
        incomeCategories={incomeMissingCategories}
        depositCategories={depositMissingCategories}
        withdrawCategories={withdrawMissingCategories}
        loansCategories={loansMissingCategories}>
          <Summary
            date={date}
            currency={currency}
            totalLeft={left}
            totalMissing={missing}
            totalPlanned={totalPlanned}
            totalSpend={totalSpend}
            notBudgeted={notBudgeted} />
      </BudgetList>
    </WideContainer>
  )
}

// @ts-ignore
BudgetScreen.navigationOptions = props => ({
  title: 'pages.budget.title',
  inTopMenu: true,
  header: (props) => <BudgetHeader {...props} />,
  tabBarIcon: tabBarIcon('chart-bar-stacked'),
  menu: () => <BudgetMenu />
})

export default BudgetScreen