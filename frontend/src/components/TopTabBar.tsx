import React from 'react'
import { MaterialTopTabBar } from 'react-navigation-tabs'
import { useTheme } from 'styled-components/native'

export default function TabBar(props) {
  const theme = useTheme()

  const style = theme.device === 'desktop' ? { height: '56px', borderBottomWidth: '1px', borderBottomColor: theme.headerBorderColor } : {}

  return (
    <MaterialTopTabBar
      style={{ backgroundColor: theme.headerBackground, ...style }}
      inactiveTintColor={theme.colors.text}
      activeTintColor={theme.colors.primary}
      tabStyle={{ flexDirection: 'row' }}
      indicatorStyle={{
        backgroundColor: theme.colors.primary
      }}
      {...props}/>
  )
}