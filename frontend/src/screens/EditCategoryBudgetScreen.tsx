import React, { useEffect, useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components/native'

import Calculator from '../components/TransactionForm/Calculator'
import Amount from '../components/TransactionForm/Amount'
import CategorySummary from '../components/CategoryBudgetForm/CategorySummary'

import { useModalScreenBar } from '../helpers/useSetNavBarColor'
import WideContainer from '../components/layout/WideContainer'
import FullPageLoader from '../components/layout/FullPageLoader'
import BottomScroll from '../components/layout/BottomScroll'
import BudgetActionDialog from '../components/ActionDialog'
import ErrorMessageContent from '../components/ErrorMessageContent'
import { useCategoryBudgetAction } from '../components/BudgetActionDialog'

import { useStoreData } from '../stores'

const Gap = styled.View`
  flex: 1;
`

const FormContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
  flex: 1;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

const CalculatorContainer = styled.View`
  flex: 1;
  max-width: 600px;
  min-width: 320px;
  flex-direction: column;
  margin: 0 auto;
`

function useEditCategoryBudget() {
  return useStoreData(({ settings, screens: { editCategoryBudget } }) => ({
    notFound: editCategoryBudget.isNotFound,
    loading: editCategoryBudget.isLoading,
    summary: editCategoryBudget.summary,
    date: editCategoryBudget?.budget?.date,
    calculator: editCategoryBudget.calculator,
    amount: editCategoryBudget.amount,
    kind: editCategoryBudget.kind,
    saving: editCategoryBudget.isSaving,

    load: editCategoryBudget.load,
    submit: editCategoryBudget.submit,
    calculate: editCategoryBudget.calculator.calculate,
    changeAmount: editCategoryBudget.changeAmount
  }))
}

function EditBudgetScreen({ navigation } : NavigationStackScreenProps) {
  const categoryIdParam = navigation.getParam('categoryId')
  const kindParam = navigation.getParam('kind')
  const budgetIdParam = navigation.getParam('budgetId')
  const budgetActions = useCategoryBudgetAction()

  useModalScreenBar()

  const { t } = useTranslation()

  const {
    notFound,
    loading,
    summary,
    calculator,
    amount,
    date,
    kind,

    load,
    submit,
    changeAmount,
    calculate
  } = useEditCategoryBudget()

  useEffect(() => {
    load(budgetIdParam, categoryIdParam, kindParam)
  }, [budgetIdParam, categoryIdParam, kindParam])

  const onSubmitPress = useCallback(async () => {
    if (await submit()) {
      navigation.pop()
    }
  }, [submit])

  if (loading) {
    return <FullPageLoader />
  }

  if (notFound) {
    return <ErrorMessageContent message={t('pages.edit_budget_screen.not_found')} />
  }

  return (
    <WideContainer navbar>
      <BottomScroll>
        <BudgetActionDialog
          visible={budgetActions.visible}
          items={budgetActions.items}
          onDismiss={budgetActions.hide}
          title={t('dialogs.budget_actions.title')} />
        <FormContainer>
          <CalculatorContainer>
            <Gap />
            <CategorySummary
              date={date}
              kind={kind}
              categoryBudget={summary} />
            <Amount
              amount={amount}
              onBeginChange={calculate}
              onChangeAmount={changeAmount}
              type={kind}
              currency={summary.category.currency} />
            <Calculator
              mode="budget"
              valid={true}
              hasOperation={calculator.hasOperation}
              primaryColor={summary.category.color}
              onBackspacePress={calculator.delete}
              onDigitPress={calculator.pushDigit}
              onMagicWandPress={budgetActions.show}
              onSumOrAcceptPress={onSubmitPress}
              onOperatorPress={calculator.pushOperator}
              currency={summary.category.currency}
            />
          </CalculatorContainer>
        </FormContainer>
      </BottomScroll>
    </WideContainer>
  )
}

// @ts-ignore
EditBudgetScreen.navigationOptions = props => ({
  title: 'pages.edit_budget_screen.title'
})


export default EditBudgetScreen