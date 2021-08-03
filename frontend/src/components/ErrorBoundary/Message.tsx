import React, { useEffect, useMemo } from 'react'
import { Button, Headline, Paragraph } from 'react-native-paper'
import styled from 'styled-components/native'

import { useStoreData } from '../../stores'

const Container = styled.View`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.windowBackground};
`

const Inner = styled.View`
  align-items: center;
`

interface IMessageProps {
  error: Error
  children: any
  onRestart()
}

export default function Message({ error, onRestart, children } : IMessageProps) {
  const { error: apiError } = useStoreData(({ error }) => ({ error }))
  const e = apiError || error

  if (e) {
    console.log('e', e)
    return (
      <Container>
        <Inner>
          <Headline>Oops!</Headline>
          <Paragraph>There's an error</Paragraph>
          <Paragraph numberOfLines={10}>{e?.message?.toString()}</Paragraph>
          <Button onPress={onRestart}>Restart app</Button>
        </Inner>
      </Container>
    )
  }

  return children
}