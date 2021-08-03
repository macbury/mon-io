import React, { useMemo, useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import styled, { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { Text, TouchableRipple } from 'react-native-paper'
import { VictoryPie } from 'victory-native'
import { ICategoryChartProps } from './types'
import { TransactionCategoryKind, CategorySummary } from '../../api/graphql'
import Currency from '../Currency'

const MAX_CHART_WIDTH = 270

const Container = styled(TouchableRipple)`
  display: flex;
  position: relative;
  flex: 1;
  margin: 0px;
`

const InnerContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const InnerContent = styled.View`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderText = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`

function onlyExpenses({ category: { kind }, amount: { cents } }) {
  return kind === TransactionCategoryKind.Expense && Math.abs(cents) > 0
}

function categoryToChartData({ amount: { cents } }, index : number) {
  return {
    y: Math.abs(cents),
    x: index,
  }
}

function getCategoryColor({ category: { color } }) {
  return color
}

function EmptyLabel(props : any) {
  return null
}

function useChartData(categories : Array<CategorySummary>) {
  const theme = useTheme()
  const expenseCategories = useMemo(() => categories.filter(onlyExpenses), [categories])
  const chartData = useMemo(() => {
    if (expenseCategories.length > 0) {
      return expenseCategories.map(categoryToChartData)
    } else {
      return [
        {
          x: 0,
          y: 1,
        }
      ]
    }
  }, [expenseCategories])

  const colorScale = useMemo(() => {
    if (expenseCategories.length > 0) {
      return expenseCategories.map(getCategoryColor)
    } else {
      return [theme.itemBorderColor]
    }
  }, [expenseCategories, theme])

  return {
    chartData,
    colorScale
  }
}

function useContainerSize() {
  const [containerSize, setContainerSize] = useState(0)
  const updateChartSize = useCallback((e) => setContainerSize(Math.min(e.nativeEvent.layout.width, MAX_CHART_WIDTH)), [setContainerSize])

  useEffect(function restoreSizeFromCache() {
    if (containerSize === 0) {
      AsyncStorage.getItem('CategorySummaryCircleSize').then((size) => {
        setContainerSize(parseInt(size) || MAX_CHART_WIDTH)
      })
    } else {
      AsyncStorage.setItem('CategorySummaryCircleSize', containerSize.toString())
    }
  }, [containerSize, setContainerSize])

  return {
    containerSize,
    updateChartSize
  }
}

export default function Chart({ categories, sumOfCategoriesInCents, currency, onPress } : ICategoryChartProps) {
  const { containerSize, updateChartSize } = useContainerSize()
  const { t } = useTranslation()
  const { chartData, colorScale } = useChartData(categories)

  const money = {
    cents: sumOfCategoriesInCents,
    currency
  }

  return (
    <Container
      centered
      borderless
      onPress={onPress}>
      <InnerContainer onLayout={updateChartSize}>
        <VictoryPie
          labelComponent={<EmptyLabel />}
          colorScale={colorScale}
          height={containerSize}
          width={containerSize}
          innerRadius={containerSize * 0.5}
          padding={15}
          cornerRadius={10}
          labelRadius={0}
          padAngle={3}
          data={chartData}
        />
        <InnerContent>
          <HeaderText>{t('pages.summary.chart.expenses')}</HeaderText>
          <Currency
            amount={money}
            size={20} />
        </InnerContent>
      </InnerContainer>
    </Container>
  )
}