import React from 'react'
import { Headline } from 'react-native-paper'
import styled from 'styled-components/native'
import Desktop from './responsive/Desktop'
import Mobile from './responsive/Mobile'

interface IEmptySetProps {
  /**
   * Text to display on mobile device
   */
  mobile: string;
  /**
   * Text to display on desktop. If you leave this only mobile text will be used
   */
  desktop?: string;
}

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  min-height: 320px;
`

export default function EmptySet({ mobile, desktop } : IEmptySetProps) {
  return (
    <Container>
      <Desktop>
        <Headline>{desktop || mobile}</Headline>
      </Desktop>
      <Mobile>
        <Headline>{mobile}</Headline>
      </Mobile>
    </Container>
  )
}