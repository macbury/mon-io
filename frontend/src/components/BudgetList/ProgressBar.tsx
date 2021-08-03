import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import styled, { DefaultTheme } from 'styled-components/native'
import { Category } from '../../api/graphql'

interface IColor {
  color?: string;
  theme?: DefaultTheme
}

interface IProgress extends IColor {
  last?: boolean;
}

export interface IProgressBarProps {
  category: Category
  myExecuted: number
  othersExecuted: number
}

const ProgressBarContainer = styled.View`
  margin: 0px 20px 5px 0px;
  height: 14px;
  background: ${(props : IColor) => props.theme.budgetProgressBackgroundColor};
  border-radius: 8px;
  border-width: 1px;
  overflow: hidden;
  flex-direction: row;
  border-color: ${({ color } : IColor) => color}77;
`

const ProgressValue = styled(Animated.View)`
  height: 14px;
  border-left-width: ${({ last } : IProgress) => last ? '2px' : '0px'};
  border-left-color: ${({ theme }) => theme.budgetSharedBorderColor};
  background: ${({ color } : IProgress) => color};
`

const ANIMATION_DURATION = 400

export default function ProgressBar({ category, myExecuted, othersExecuted } : IProgressBarProps) {
  const myExecutedValue = useRef(new Animated.Value(0)).current;
  const othersExecutedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(myExecutedValue, {
      toValue: myExecuted,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();
  }, [myExecuted, myExecutedValue])

  useEffect(() => {
    Animated.timing(othersExecutedValue, {
      toValue: othersExecuted,
      duration: ANIMATION_DURATION,
      useNativeDriver: false
    }).start();
  }, [othersExecuted, othersExecutedValue])

  return (
    <ProgressBarContainer color={category.color}>
      <ProgressValue
        style={[{ flex: myExecutedValue }]}
        color={category.color} />
      <ProgressValue
        last={othersExecuted > 0.0}
        style={[{ flex: othersExecutedValue }]}
        color={category.color+'99'} />
    </ProgressBarContainer>
  )
}