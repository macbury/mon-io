import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

const DesktopHeaderTitle = styled(Text)`
  padding: 25px 0px 10px 20px;
  font-size: 24px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

const MobileHeaderTitle = styled(Text)`
  padding: 20px 0px 10px 20px;
  font-size: 18px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

interface IHeaderProps {
  children: any
}

export default function ListHeader({ children } : IHeaderProps) {
  const isDesktop = useMediaQuery({ minWidth: 960 })

  if (isDesktop) {
    return (
      <DesktopHeaderTitle>
        {children}
      </DesktopHeaderTitle>
    )
  } else {
    return (
      <MobileHeaderTitle>
        {children}
      </MobileHeaderTitle>
    )
  }
}