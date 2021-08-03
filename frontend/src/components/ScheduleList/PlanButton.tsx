import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { Moment } from 'moment-timezone'
import { useNavigation } from 'react-navigation-hooks'
import { TouchableRipple } from 'react-native-paper'
import { newSeriesPath } from '../../helpers/urls'

const PlanTransactionButton = styled(TouchableRipple)`
  opacity: 0.4;
`

const Inner = styled.View`
  display: flex;
  flex-direction: row;
  padding: 13px 15px;
  align-content: center;
  align-items: center;
  justify-content: center;
  min-height: 75px;
`

export interface IPlayButtonProps {
  date: Moment
}

export default function PlayButton({ date } : IPlayButtonProps) {
  const navigation = useNavigation()
  const openNewSeriesScreen = useCallback(() => {
    navigation.dispatch(newSeriesPath(date.format('YYYY-MM-DD')))
  }, [navigation, date])

  return (
    <PlanTransactionButton onPress={openNewSeriesScreen}>
      <Inner>
      </Inner>
    </PlanTransactionButton>
  )
}