import React from 'react'
import { IconButton, Portal } from 'react-native-paper'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
`

export default function CloseButton() {
  const navigation = useNavigation() as any

  return (
    <Portal>
      <Container>
        <IconButton icon="close" onPress={() => navigation.closeDrawer()} />
      </Container>
    </Portal>
  )
}