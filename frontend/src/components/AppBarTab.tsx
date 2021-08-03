import React from 'react'
import { NavigationNavigateAction } from 'react-navigation'
import styled from 'styled-components/native'
import Link from './Link'
import Icon from './Icon'

interface IButtonInnerProps {
  current: boolean
}

const LinkContainer = styled(Link)<IButtonInnerProps>`
  display: flex;
  justify-content: center;
  padding-top: 3px;
  height: 50px;
  padding-bottom: ${({ current }) => current ? 0 : 3};
  border-bottom-width: ${({ current }) => current ? 3 : 0};
  border-bottom-color: ${(props) => props.theme.headerItemBottomColor};
`

const ButtonInner = styled.View<IButtonInnerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${({ current }) => current ? 1.0 : 0.6};
  padding: 0px 15px;
`

export interface IAppBarTab {
  icon: string
  current?: boolean
  action: NavigationNavigateAction
}

export default function AppBarTab(props: IAppBarTab) {
  const { icon, current, action }  = props
  return (
    <LinkContainer action={action} ripple current={current}>
      <ButtonInner current={current}>
        <Icon name={icon} size={28} />
      </ButtonInner>
    </LinkContainer>
  )
}
