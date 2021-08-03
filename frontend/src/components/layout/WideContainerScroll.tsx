import React from 'react'
import styled from 'styled-components/native'

const OuterContainer = styled.ScrollView`
  flex: 1 1 auto;
  display: flex;
  background: ${(props) => props.theme.colors.background};
`
/**
 * Ensures that content will be always displayed in center on desktop
 */
export default function WideContainerScroll({ children, ...rest }) {
  return (
    <OuterContainer {...rest}>
      {children}
    </OuterContainer>
  )
}