import React, { useEffect, useState } from 'react'
import { Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { useIsFocused } from 'react-navigation-hooks'
import { useStoreData } from '../../stores'
import FullPageLoader from '../../components/layout/FullPageLoader'
import WideContainer from '../../components/layout/WideContainer'
import MonthLineChart from '../../components/Charts/MonthLineChart'
import styled, { useTheme } from 'styled-components/native'

const CenteredContent = styled.View`
  margin-top: 0px;
  flex: 1;
`

const Heading = styled(Subheading)`
  margin: 20px 25px 20px 25px;
`
function useLoans() {
  return useStoreData(({ screens: { charts: { loans } } }) => ({
    chartData: loans.chartData,
    loading: loans.isLoading,
    currency: loans.currency,

    refresh: loans.refresh,
  }))
}

export default function LoansTab() {
  const theme = useTheme()
  const {
    chartData,
    currency,
    loading,

    refresh
  } = useLoans()

  const { t } = useTranslation()
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
      <Heading>{t('pages.loans_tab.heading')}</Heading>
      <CenteredContent>
        <MonthLineChart
          backgroundColor={theme.loanBackgroundColor}
          lineColor={theme.loanColor}
          data={chartData}
          currency={currency} />
      </CenteredContent>
    </WideContainer>
  )
}