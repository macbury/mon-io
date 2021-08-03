import React, { useEffect, useState } from 'react'
import { Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'
import { useIsFocused } from 'react-navigation-hooks'
import CenteredScroll from '../../components/CenteredScroll'
import MonthLineChart from '../../components/Charts/MonthLineChart'
import FullPageLoader from '../../components/layout/FullPageLoader'
import WideContainer from '../../components/layout/WideContainer'
import { useStoreData } from '../../stores'

const CenteredContent = styled.View`
  margin-top: 0px;
  flex: 1;
`

const Heading = styled(Subheading)`
  margin: 20px 25px 20px 25px;
`

function useSavingTabStore() {
  return useStoreData(({ screens: { charts: { savings } } }) => ({
    loading: savings.isLoading,
    chartData: savings.chartData,
    currency: savings.currency,
    refresh: savings.refresh
  }))
}

export default function SavingsTab() {
  const { t } = useTranslation()
  const {
    currency,
    loading,
    chartData,
    refresh,
  } = useSavingTabStore()

  const theme = useTheme()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      refresh()
    }
  }, [refresh, isFocused])

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <Heading>{t('pages.savings_tab.heading')}</Heading>
      <CenteredContent>
        <MonthLineChart
          backgroundColor={theme.savingBackgroundColor}
          lineColor={theme.savingColor}
          data={chartData}
          currency={currency} />
      </CenteredContent>
    </WideContainer>
  )
}