import React, { useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components/native'

import Mobile from '../../responsive/Mobile'
import Desktop from '../../responsive/Desktop'
import NetworkProgressBar from '../../UnstyledProgressBar/NetworkProgressBar'
import { AppHeaderProp } from './types'
import { getTitleFromNavigation } from './helpers'
import BackButton from './BackButton'
import MenuButton from './MenuButton'

const AppHeaderContainer = styled(Appbar.Header)`
  background: ${({ theme }) => theme.headerBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

const ProgressBar = styled(NetworkProgressBar)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  z-index: 2;
`

export default function AppHeader(props : AppHeaderProp) {
  const theme = useTheme()
  const { navigation, hideTitle, tabs } = props
  const { t } = useTranslation()

  const canGoBack = navigation.state?.routes?.length > 1
  const title = getTitleFromNavigation(props)
  const appHeaderStyle = tabs ? { elevation: 0, borderBottomWidth: 0 } : { elevation: 0, borderBottomWidth: 1 }
  const goBack = useCallback(() => {
    navigation.pop()
  }, [navigation, canGoBack])

  const { forceShowHeader } = props.scene.descriptor.options as any

  return (
    <React.Fragment>
      <Mobile>
        <AppHeaderContainer dark style={appHeaderStyle}>
          {canGoBack ? <BackButton onPress={goBack} /> : <MenuButton onPress={(navigation as any).toggleDrawer} />}
          {!hideTitle && <Appbar.Content title={t(title)} color={theme.colors.text} />}
          {props.children}
          <ProgressBar />
        </AppHeaderContainer>
      </Mobile>
      <Desktop>
        {(!props.topLevel && canGoBack || forceShowHeader) && (<AppHeaderContainer style={appHeaderStyle} dark>
          {!forceShowHeader && canGoBack && <BackButton onPress={goBack} />}
          {!hideTitle && <Appbar.Content color={theme.colors.text} title={t(title)} />}
          {props.children}
          <ProgressBar />
        </AppHeaderContainer>)}
      </Desktop>
    </React.Fragment>
  )
}