import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ActivityIndicator, View } from 'react-native'

const IndicatorContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  background: ${(props) => props.theme.windowBackground};
`

/**
 * Displays centered on screen activity indicator
 */
export default function FullPageLoader () {
  const theme = useTheme()
  return (
    <IndicatorContainer>
      <ActivityIndicator size={90} color={theme?.colors?.activityIndicator} />
    </IndicatorContainer>
  )
}