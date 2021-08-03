import React from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'

interface IButtonInnerProps {
  tabWidth: number;
  current: boolean;
}

const ButtonInner = styled.View<IButtonInnerProps>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 56px;
  width: ${({ tabWidth }) => tabWidth};
  align-items: center;
  justify-content: center;
  opacity: ${({ current }) => current ? 1.0 : 0.6};
`

interface IBottomTabItem {
  title: string
  tabWidth: number
  current: boolean
  tabBarIcon: ({ tintColor, size } : { tintColor : string, size : number }) => any
  onTabPress: () => any
}

export default function BottomTabItem({ title, tabBarIcon, onTabPress, current, tabWidth } : IBottomTabItem) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <TouchableRipple onPress={onTabPress}>
      <ButtonInner tabWidth={tabWidth} current={current}>
        {tabBarIcon({ tintColor: theme.colors.text, size: current ? 24 : 32 })}
        {current && <Text>{t(title)}</Text>}
      </ButtonInner>
    </TouchableRipple>
  )
}
