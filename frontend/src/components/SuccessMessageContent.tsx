import React from 'react'
import styled from 'styled-components/native'
import { Headline, Subheading } from 'react-native-paper'

export interface ISuccessMessageContentProps {
  message: string
}

const EMOJIS = [
  '(͠≖ ͜ʖ͠≖)👌',
  '💓(ˆ‿ˆԅ)',
  '(っ◔◡◔)っ💓',
  '★≡≡\(▀̿Ĺ̯▀̿\)',
  '٩(▀̿Ĺ̯▀̿ ̿٩)三',
  'ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ',
  '(ง⌐□ل͜□)ง'
]

const SuccessContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.background};
`

const Description = styled(Subheading)`
  text-align: center;
  margin-top: 10px;
`

/**
 * Display centered success message with random emoji
 */
export default function SuccessMessageContent({ message } : ISuccessMessageContentProps) {
  const emoji = EMOJIS[Math.floor(EMOJIS.length * Math.random())]

  return (
    <SuccessContainer>
      <Headline>{emoji}</Headline>
      <Description>{message}</Description>
    </SuccessContainer>
  )
}