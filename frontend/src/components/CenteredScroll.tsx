import React, { forwardRef } from 'react'
import { ScrollView } from 'react-navigation'
import styled, { DefaultTheme } from 'styled-components/native'

interface ICenteredScrollProps {
  children?: any
  wide?: boolean
  fab?: boolean
}

interface IResponsiveContainer {
  wide?: boolean
  theme?: DefaultTheme
}

const Container = styled(ScrollView)`
  min-width: 300px;
  width: 100%;
  flex: 1;
`

const ScrollCenter = styled.View`
  flex: 1;
  width: ${({ wide, theme } : IResponsiveContainer) => theme.device === 'desktop' ? (wide ? '80%' : '60%') : '100%'};
  min-width: ${({ wide, theme } : IResponsiveContainer) => theme.device === 'desktop' ? (wide ? '980px' : '640px') : 'auto'};
  margin: ${({ theme } : IResponsiveContainer) => theme.device === 'desktop' ? '0 auto' : '0px'};
  margin-top: ${({ theme } : IResponsiveContainer) => theme.device === 'desktop' ? '70px' : 0};
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

const FabGap = styled.View`
  height: 90px;
`

const CenteredScroll = forwardRef(({ children, fab, wide, ...props } : ICenteredScrollProps, ref : any) => {
  return (
    <Container {...props} ref={ref}>
      <ScrollCenter wide={wide}>
        {children}
        {fab && <FabGap />}
      </ScrollCenter>
    </Container>
  )
})

export default CenteredScroll