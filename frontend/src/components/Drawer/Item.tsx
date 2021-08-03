import React, { useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { TouchableOpacity } from 'react-native'
import { NavigationNavigateAction, StackActions } from 'react-navigation'
import { List, Text } from 'react-native-paper'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import Link from '../Link'

import { useTranslation } from 'react-i18next'

interface IStyleProps {
  collapsed?: boolean
  selected?: boolean
  theme?: DefaultTheme
}

const ItemLink = styled(Link)`

`

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px;
  padding: ${({ collapsed } : IStyleProps) => collapsed ? '0px' : '5px'};
  background: ${({ theme, selected } : IStyleProps) => selected ? theme.colors.primary+'15' : 'transparent'};
  border-radius: 5px;
`

const Icon = styled(List.Icon)`
  flex: 1;
  min-width: 40px;
  max-width: ${({ collapsed } : IStyleProps) => collapsed ? '100%' : '40px'};
  height: 40px;
  padding: 2px;
  margin: 0px;
`

const Label = styled(Text)`
  font-size: 16px;
  flex: 1;
  margin-left: 10px;
  color: ${({ theme, selected } : IStyleProps) => selected ? theme.colors.primary : theme.colors.text};
`

export interface IItemProps {
  collapsed?: boolean;
  selected?: boolean;
  /** I18n key */
  titleKey: string;
  icon: string;
  action?: NavigationNavigateAction;
  onPress?();
}

export default function Item({ selected, collapsed, action, titleKey, onPress, icon } : IItemProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const Wrapper : any = !action || selected ? TouchableOpacity : ItemLink

  const executePressLogic = useCallback(() => {
    if (action && selected) {
      navigation.dispatch(StackActions.popToTop())
    } else if (onPress) {
      onPress()
    }
  }, [onPress, action, selected, navigation])

  return (
    <Wrapper ripple={false} action={action} onPress={executePressLogic} title={t(titleKey)}>
      <Content selected={selected}>
        <Icon
          color={selected ? theme.colors.primary : theme.colors.text}
          collapsed={collapsed}
          icon={icon} />
        {!collapsed && <Label selected={selected}>{t(titleKey)}</Label>}
      </Content>
    </Wrapper>
  )
}