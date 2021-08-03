import React from 'react'
import { StatusBar  } from 'react-native'
import { Appbar } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import NetworkProgressBar from '../../UnstyledProgressBar/NetworkProgressBar'
import { AppHeaderProp } from './types'
import { getTitleFromNavigation } from './helpers'
import BackButton from './BackButton'
import MenuButton from './MenuButton'

const ProgressBar = styled(NetworkProgressBar)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 2;
`

const AppHeaderContainer = styled(Appbar.Header)`
  margin-top: ${StatusBar.currentHeight}px;
  background: ${(props) => props.theme.headerBackground};
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
  border-bottom-width: 1px;
`

export default function AppHeader(props : AppHeaderProp) {
  const theme = useTheme()
  const { hideTitle, tabs } = props
  const { t } = useTranslation()
  const goBack = () => {
    props.navigation.pop()
  }

  const appHeaderStyle = tabs ? { elevation: 0, borderBottomWidth: 0 } : { elevation: 0, borderBottomWidth: 1 }
  const canGoBack = props.navigation.state.routes.length > 1
  const title = getTitleFromNavigation(props)

  return (
    <AppHeaderContainer dark style={appHeaderStyle}>
      {canGoBack ? <BackButton onPress={goBack} /> : <MenuButton onPress={(props.navigation as any).toggleDrawer} />}
      {!hideTitle && <Appbar.Content title={t(title)} color={theme?.colors?.text} />}
      {props.children}
      <ProgressBar />
    </AppHeaderContainer>
  )
}