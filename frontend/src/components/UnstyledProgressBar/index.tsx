import React from 'react'
import { ProgressBar as NativeProgressBar, Colors } from 'react-native-paper'
import Fade from './Fade'
import styled, { useTheme } from 'styled-components/native'
import { IProgressBarProps } from './types'

const StyledProgressBar = styled(NativeProgressBar)`
  padding: 0px;
  opacity: 0.3;
  height: 3px;
`

export default function ProgressBar({ loading = true, ...props } : IProgressBarProps) {
  const theme = useTheme()

  return (
    <Fade visible={loading} {...props}>
      <StyledProgressBar indeterminate color={theme.colors.progress} />
    </Fade>
  )
}