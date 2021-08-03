import React, { useState, useEffect } from 'react'
import { List, IconButton } from 'react-native-paper'
import { useTheme } from 'styled-components/native'

export interface IRowPickerProps {
  title: string
  icon: string
  value: number
  onValueUpdated(newValue: number)
}

export default function RowPicker(props : IRowPickerProps) {
  const { colors } = useTheme()

  const {
    title,
    value,
    icon,

    onValueUpdated
  } = props

  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => setCurrentValue(value), [setCurrentValue, value])
  useEffect(() => {
    const fallbackHandler = setTimeout(() => {
      onValueUpdated(currentValue)
    }, 500)

    return () => {
      clearTimeout(fallbackHandler)
    }
  }, [onValueUpdated, currentValue])

  return (
    <List.Item
      title={title}
      description={currentValue.toString()}
      left={() => <List.Icon color={colors.text} icon={icon} />}
      right={() => {
        return (
          <React.Fragment>
            <IconButton color={colors.text} icon="minus" onPress={() => setCurrentValue(currentValue - 1)} />
            <IconButton color={colors.text} icon="plus" onPress={() => setCurrentValue(currentValue + 1)} />
          </React.Fragment>
        )
      }} />
  )
}