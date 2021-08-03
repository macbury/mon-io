import React from 'react'
import { Moment } from 'moment-timezone'
import { StatusBar } from 'react-native'
import { Appbar } from 'react-native-paper'
import styled, { DefaultTheme, useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import NetworkProgressBar from '../../components/UnstyledProgressBar/NetworkProgressBar'
import Mobile from '../../components/responsive/Mobile'
import DateNavigation from '../../components/DateNavigation'
import { getTitleFromNavigation } from './AppHeader/helpers'
import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'
import { AppHeaderProp } from './AppHeader/types'

const ProgressBar = styled(NetworkProgressBar)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 2;
`

interface IHeaderProps {
  isToday?: boolean;
  theme: DefaultTheme
}

const AppHeaderContainer = styled(Appbar)`
  background: ${({ theme, isToday } : IHeaderProps) => theme.headerBackground};
  flex-direction: column;
  align-items: stretch;
  height: ${() => 104 + StatusBar.currentHeight}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

const HeaderContainer = styled.View`
  margin-top: ${StatusBar.currentHeight}px;
  height: 56px;
  flex-direction: row;
  background: transparent;
  align-items: center;
`

interface IDateNavigationHeader extends AppHeaderProp {
  active: boolean
  currentDate : Moment
  children?: any
  onChangeDate(date : Moment)
}

export default function DateNavigationHeader(props : IDateNavigationHeader) {
  const theme = useTheme()
  const { t } = useTranslation()
  const title = getTitleFromNavigation(props)

  const {
    navigation,
    active,
    currentDate,
    children,
    onChangeDate
  } = props

  useDefaultScreenBar()

  return (
    <Mobile>
      <AppHeaderContainer isToday={active} style={{ elevation: 0 }}>
        <HeaderContainer>
          <Appbar.Action icon="menu" onPress={(navigation as any).toggleDrawer} color={theme.colors.icon} />
          <Appbar.Content title={t(title)} color={theme.colors.text} />
          {children}
        </HeaderContainer>
        <DateNavigation
          today={active}
          onChangeDate={onChangeDate}
          currentDate={currentDate} />
        <ProgressBar />
      </AppHeaderContainer>
    </Mobile>
  )
}