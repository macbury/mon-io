import React from 'react'
import { Text } from 'react-native-paper'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'
import { TabBar } from 'react-native-tab-view'

interface ILabelProps {
  focused?: boolean
  theme?: DefaultTheme
}

const Label = styled(Text)`
  color: ${({ focused, theme } : ILabelProps) => focused ? theme.colors.primary : theme.colors.text};
  text-transform: uppercase;
`

export default function Tabs(props) {
  const theme = useTheme()

  return (
    <TabBar
      scrollEnabled={theme.device === 'mobile'}
      style={{ backgroundColor: theme.headerBackground }}
      inactiveTintColor={theme.colors.text}
      activeTintColor={theme.colors.primary}
      renderLabel={({ route: { title }, focused }) => <Label focused={focused}>{title}</Label>}
      indicatorStyle={{
        backgroundColor: 'transparent'
      }}
      {...props}/>
  )
}