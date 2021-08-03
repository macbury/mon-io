import React from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-navigation'
import { TouchableRipple } from 'react-native-paper'
import { useMediaQuery } from 'react-responsive'

interface IDesktopScrollContainerProps {
  last?: boolean
  border?: boolean
}

export const SummaryAndCategories = styled.View`
  flex: 1;
`

const DesktopScrollContainer = styled(ScrollView)`
  flex: ${({ last } : IDesktopScrollContainerProps) => last ? 0.9 : 1};
  border-left-width: ${({ border } : IDesktopScrollContainerProps) => border ? '2px' : '0'};
  border-left-color: ${({ theme }) => theme.headerBorderColor};
  max-width: ${({ last } : IDesktopScrollContainerProps) => last ? '400px' : 'auto'};
`

const DesktopContainerView = styled.View`
  flex-direction: row;
  flex: 1;
`

const MobileScrollContainer = styled(ScrollView)`
  flex: 1;
`

const MobileContainerView = styled.View`
  flex-direction: column;
`

function useDesktop() {
  return useMediaQuery({ minWidth: 960 })
}

export function Container({ children }) {
  const isDesktop = useDesktop()

  if (isDesktop) {
    return (
      <DesktopContainerView>
        {children}
      </DesktopContainerView>
    )
  } else {
    // add pull to refresh here!
    return (
      <MobileScrollContainer>
        {children}
      </MobileScrollContainer>
    )
  }
}

interface IColumnProps {
  children: any;
  last?: boolean
  border?: boolean
}

export function Column({ children, last, border } : IColumnProps) {
  const isDesktop = useDesktop()

  if (isDesktop) {
    return (
      <DesktopScrollContainer border={border} last={last}>
        {children}
      </DesktopScrollContainer>
    )
  } else {
    return (
      <MobileContainerView>
        {children}
      </MobileContainerView>
    )
  }
}