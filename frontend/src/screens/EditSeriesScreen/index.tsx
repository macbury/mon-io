import React, { useEffect, useCallback } from 'react'
import { NavigationInjectedProps } from 'react-navigation'

import TransactionForm from '../../components/TransactionForm'
import FullPageLoader from '../../components/layout/FullPageLoader'
import WideContainer from '../../components/layout/WideContainer'
import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'

import {
  useEditSeriesParams,
  useEditSeriesStore
} from './hooks'

function EditSeriesScreen({ navigation } : NavigationInjectedProps) {
  const { 
    seriesId,
    date,
    updateType 
  } = useEditSeriesParams()

  const {
    load,
    save,
    loading,
    ...state
  } = useEditSeriesStore()

  useDefaultScreenBar()

  useEffect(() => {
    load(seriesId, date, updateType)
  }, [seriesId, date])

  const updateCurrentSeries = useCallback(async () => {
    if (await save()) {
      navigation.goBack()
    }
  }, [save, navigation])

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <TransactionForm
        mode="series"
        onSumOrAcceptPress={updateCurrentSeries}
        {...state} />
    </WideContainer>
  )
}

// @ts-ignore
EditSeriesScreen.navigationOptions = props => ({
  title: 'pages.edit_series.title',
})

export default EditSeriesScreen