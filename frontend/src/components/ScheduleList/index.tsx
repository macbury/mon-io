import React, { useCallback, forwardRef } from 'react'
import { Moment } from 'moment-timezone'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-navigation'
import { useNavigation } from 'react-navigation-hooks'
import { PlannedItems } from '../../stores/Screens/SeriesStore'
import { seriesPath } from '../../helpers/urls'
import usePlannedTransactionActionSheet from './usePlannedTransactionActionSheet'
import DayItem from './DayItem'

interface IScheduleListProps {
  items: PlannedItems[]
  refreshing: boolean
  reload()
}

const ScheduleList = forwardRef((props : IScheduleListProps, ref : any) => {
  const {
    items,
    refreshing,
    reload
  } = props

  const navigation = useNavigation()

  const onGoToDate = useCallback((date : Moment) => {
    navigation.navigate(seriesPath(date))
  }, [navigation])

  const showPlannedTransactionActions = usePlannedTransactionActionSheet()
  const renderItem = useCallback(({ item }) => (
    <DayItem
      plannedItems={item}
      onGoToDate={onGoToDate}
      onActionsShow={showPlannedTransactionActions} />
  ), [showPlannedTransactionActions])

  const tryToGoToIndex = useCallback(async (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      ref.current?.scrollToIndex({ index: info.index, animated: true });
    });
  }, [ref.current])

  if (refreshing) {
    return null
  }

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reload} />}
      ref={ref}
      refreshing={refreshing}
      onScrollToIndexFailed={tryToGoToIndex}
      data={items}
      keyExtractor={({ date }) => (date.toISOString())}
      renderItem={renderItem} />
  )
})

export default ScheduleList