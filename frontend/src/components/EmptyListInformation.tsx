import React from 'react'
import { View } from 'react-native'
import { Caption } from 'react-native-paper'
import styled from 'styled-components/native'

interface IEmptyListInformation {
  items: Array<any>;
  title: String;
}

const Container = styled(View)`
  display: flex;
  flex: 1;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-height: 200px;
`

export default function EmptyListInformation(props : IEmptyListInformation) {
  const { items, title } = props

  if (items != null && items.length > 0) {
    return null
  }

  return (
    <Container>
      <Caption>{title}</Caption>
    </Container>
  )
}