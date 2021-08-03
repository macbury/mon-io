import React from 'react'
import { Headline } from 'react-native-paper'
import styled from 'styled-components/native'

interface IDesktopHeader {
  title : string
}

const Container = styled.View`
  padding: 40px 20px 20px 20px;
  border-bottom-width: 1px;
  background: ${(props) => props.theme.headerBackground};
  border-bottom-color: ${(props) => props.theme.headerBorderColor};
`

const Header = styled(Headline)`
  font-size: 32px;
`

export default function DesktopHeader({ title } : IDesktopHeader) {
  return (
    <Container>
      <Header>{ title }</Header>
    </Container>
  )
}