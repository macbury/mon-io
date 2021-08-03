import React, { useCallback } from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import styled, { DefaultTheme } from 'styled-components/native'

interface IButtonProps {
  state: 'today' | 'selected' | 'disabled' | ''
  selected: boolean
  theme?: DefaultTheme
}

const Button = styled(TouchableRipple)`
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  background: ${({ theme, selected } : IButtonProps) => selected ? theme.colors.accent : 'transparent' };
  opacity: ${({ state } : IButtonProps) => state === 'disabled' ? 0.3 : 1.0};
  border-radius: 50px;
`

const Inner = styled.View`

`

const Dots = styled.View`
  flex-direction: row;
  margin-top: 2px;
  justify-content: space-around;
`

interface IDotProps {
  color: string;
  selected: boolean
}

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background: ${({ color, selected } : IDotProps) => selected ? '#fff' : color};
`

const DayText = styled(Text)`
  align-self: center;
  font-weight: ${({ selected, state } : IButtonProps) => selected || state === 'today' ? 'bold' : 'normal' };
  color: ${({ theme, selected, state }) => !selected && state === 'today' ? theme.colors.primary : theme.colors.text};
`

type TDot = {
  color: string
  key: string
}

type TMarkings = {
  dots: TDot[]
}

interface IDayProps extends IButtonProps {
  onPress(day : any)
  onLongPress(day : any)
  date: any
  marking: TMarkings
}

/**
 * Calendar days are not working in some aspects in web version. This components fixes for example date rendering
 */
export default function Day(props : IDayProps) {
  const {
    date,
    marking,
    state,
    selected,

    onPress,
    onLongPress
  } = props

  const handlePress = useCallback(() => onPress(date), [date, onPress])
  const handleLongPress = useCallback(() => onLongPress(date), [date, onLongPress])

  const dots = marking?.dots?.length > 0 ? marking.dots.map(({ key, color }) => <Dot selected={selected} key={key} color={color} />) : null

  return (
    <Button onPress={handlePress} onLongPress={handleLongPress} selected={selected} state={state}>
      <Inner>
        <DayText selected={selected} state={state}>{date.day}</DayText>
        {dots && <Dots>{dots}</Dots>}
      </Inner>
    </Button>
  )
}