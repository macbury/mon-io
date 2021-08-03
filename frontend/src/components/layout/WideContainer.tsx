import React from 'react'
import styled from 'styled-components/native'
import { useIsFocused } from 'react-navigation-hooks'

import Notifications from '../Notifications'
import Mobile from '../responsive/Mobile'

const Content = styled.View`
  flex: 1 1 auto;
  display: flex;
  background: ${(props) => props.theme.colors.background};
  overflow: hidden;
`

const NavBar = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: ${({ theme }) => theme.insets.bottom}px;
  background: ${({ theme }) => theme.navbarColor};
  opacity: 0.8;
  z-index: 1000;
`

export interface IWideContainerProps {
  children: any
  navbar?: boolean
}

/**
 * Ensures that content will be always displayed in center on desktop
 */
export default function WideContainer({ children, navbar, ...props } : IWideContainerProps) {
  const isFocused = useIsFocused()

  return (
    <Content {...props}>
      <Mobile>
        {navbar && <NavBar />}
      </Mobile>
      {children}
      {isFocused && <Notifications navbar={navbar} />}
    </Content>
  )
}