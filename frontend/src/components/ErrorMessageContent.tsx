import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Headline, Subheading } from 'react-native-paper'

export interface IErrorMessageContentProps {
  message: string
}

const EMOJIS = [
  '(╯°□°）╯︵ ┻━┻',
  '(┛◉Д◉)┛彡┻━┻',
  '(ﾉ≧∇≦)ﾉ ﾐ ┸━┸',
  '(ノಠ益ಠ)ノ彡┻━┻',
  '(╯ರ ~ ರ）╯︵ ┻━┻',
  '(┛ಸ_ಸ)┛彡┻━┻',
  '(ﾉ´･ω･)ﾉ ﾐ ┸━┸',
  '(ノಥ,_｣ಥ)ノ彡┻━┻',
  '(┛✧Д✧))┛彡┻━┻',
  'ﾐ┻┻(ﾉ>｡<)ﾉ'
]

const ErrorContainer = styled.View`
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
 * Display centered error message with random table flip emoji
 */
export default function ErrorMessageContent({ message } : IErrorMessageContentProps) {
  const emoji = useMemo(() => EMOJIS[Math.floor(EMOJIS.length * Math.random())], [])

  return (
    <ErrorContainer>
      <Headline>{emoji}</Headline>
      <Description>{message}</Description>
    </ErrorContainer>
  )
}