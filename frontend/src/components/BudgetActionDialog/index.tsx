import React, { useMemo, useState, useCallback } from 'react'
import { IAction } from '../ActionDialog'
import { useTranslation } from 'react-i18next'
import { useStoreData } from '../../stores'
import { formatMoney } from '../../helpers/currency'

function useEditCategoryBudget() {
  return useStoreData(({ screens: { editCategoryBudget } }) => ({
    kind: editCategoryBudget.category?.kind,
    nextMonthAmount: editCategoryBudget.nextMonthAmount,
    currentMonthAmount: editCategoryBudget.currentMonthAmount,
    prevMonthPlannedAmount: editCategoryBudget.prevMonthPlannedAmount,
    prevMonthSpendAmount: editCategoryBudget.prevMonthSpendAmount,
    setAmount: editCategoryBudget.setAmount,
    forecast: editCategoryBudget.forecast
  }))
}

export function useCategoryBudgetAction() {
  const { t } = useTranslation()
  const [visible, setActionsVisible] = useState(false)
  const hide = useCallback(() => setActionsVisible(false), [setActionsVisible])

  const show = useCallback(() => {
    forecast()
    setActionsVisible(true)
  }, [setActionsVisible])

  const {
    kind,
    nextMonthAmount,
    currentMonthAmount,
    prevMonthPlannedAmount,
    prevMonthSpendAmount,
    forecast,
    setAmount
  } = useEditCategoryBudget()

  const items : Array<IAction> = useMemo(() => ([
    {
      title: t('dialogs.budget_actions.actions.projected'),
      subtitle: formatMoney(nextMonthAmount, true),
      icon: 'chart-donut',
      onPress: () => {
        setAmount(nextMonthAmount)
        hide()
      }
    },
    {
      title: t('dialogs.budget_actions.actions.last.budget'),
      subtitle: formatMoney(prevMonthPlannedAmount, true),
      icon: 'calendar-multiple',
      onPress: () => {
        setAmount(prevMonthPlannedAmount)
        hide()
      }
    },
    {
      title: t(`dialogs.budget_actions.actions.last.${kind}`),
      subtitle: formatMoney(prevMonthSpendAmount, true),
      icon: 'calendar-multiple-check',
      onPress: () => {
        setAmount(prevMonthSpendAmount)
        hide()
      }
    },
    {
      title: t(`dialogs.budget_actions.actions.current.${kind}`),
      subtitle: formatMoney(currentMonthAmount, true),
      icon: 'calendar-check',
      onPress: () => {
        setAmount(currentMonthAmount)
        hide()
      }
    }
  ]), [
    currentMonthAmount,
    prevMonthSpendAmount,
    prevMonthPlannedAmount,
    nextMonthAmount,
    setAmount
  ])

  return {
    items,
    show,
    hide,
    visible
  }
}