import React, { useEffect, useCallback, useRef, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { useIsFocused } from 'react-navigation-hooks'
import styled from 'styled-components/native'
import { Moment } from 'moment-timezone'

import Desktop from '../../components/responsive/Desktop'
import createLogger from '../../helpers/logger'
import { useModalScreenBar } from '../../helpers/useSetNavBarColor'
import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'
import ScheduleList from '../../components/ScheduleList'
import Calendar from '../../components/Calendar'
import CategoryFilter from '../../components/CategoryFilter'

import Header from './Header'
import ShareCalendarButton from './ShareCalendarButton'
import { useSeriesStore } from './hooks'

const log = createLogger('SeriesScreen')

const CategoriesList = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const ColumnWideContainer = styled(WideContainer)`
  flex-direction: row;
`

const RightFilter = styled.View`
  flex-direction: column;
  flex: 0.3;
  min-width: 450px;
  max-width: 480px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

const Container = styled.View`
  flex: 1;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

function SeriesScreen({ navigation } : NavigationInjectedProps) {
  const {
    loading,
    currentMonth,
    refreshing,
    groupedByDate,
    scrollIndex,
    markedDates,
    categoryOptions,
    selectedCategoriesIds,

    toggleCategory,
    changeMonth,
    reload,
    selectOnlyCategory,
    showCalendarUrl
  } = useSeriesStore()

  const isFocused = useIsFocused()
  const ref = useRef<FlatList>()
  const currentMonthParam = navigation.getParam('date')

  const handleMonthChange = useCallback((date : Moment) => {
    navigation.setParams({ date: date.format('YYYY-MM-DD') })
  }, [navigation])

  useEffect(() => {
    log('Month has changed', currentMonthParam)
    changeMonth(currentMonthParam)
  }, [changeMonth, currentMonthParam])

  useEffect(() => {
    if (isFocused) {
      log('Screen focused reloading...')
      reload()
    }
  }, [reload, isFocused])

  useLayoutEffect(() => {
    log('Scroll to', scrollIndex)
    if (scrollIndex != -1) {
      ref.current?.scrollToIndex({
        animated: true,
        index: scrollIndex,
        viewPosition: 0
      })
    }
  }, [ref.current, scrollIndex])

  useModalScreenBar()

  return (
    <ColumnWideContainer navbar>
      <Container>
        {loading && <FullPageLoader />}
        <ScheduleList
          ref={ref}
          refreshing={loading}
          reload={reload}
          items={groupedByDate} />
      </Container>
      <Desktop>
        <RightFilter>
          <Calendar
            markedDates={markedDates}
            loading={refreshing}
            onMonthChange={handleMonthChange}
            onDateChange={handleMonthChange}
            date={currentMonth} />
          <CategoriesList>
            <CategoryFilter
              selectedCategoriesIds={selectedCategoriesIds}
              options={categoryOptions}
              toggleCategory={toggleCategory}
              selectOnlyCategory={selectOnlyCategory} />
          </CategoriesList>
          <ShareCalendarButton onPress={showCalendarUrl} />
        </RightFilter>
      </Desktop>
    </ColumnWideContainer>
  );
}

// @ts-ignore
SeriesScreen.navigationOptions = props => ({
  title: 'pages.series.title',
  header: (props) => <Header title="pages.series.title" {...props} />,
})

export default SeriesScreen