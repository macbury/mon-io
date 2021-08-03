import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useScreenHeight, useScrollDown } from '../../helpers/useScreenHeight'

const ScrollContainer = styled.ScrollView`
  flex: 1;
`

export default function BottomScroll({ children, ...props }) {
  const minHeight = useScreenHeight()
  const scrollRef = useScrollDown()

  return (
    <ScrollContainer ref={scrollRef as any} {...props}>
      <View style={{ minHeight }}>
        {children}
      </View>
    </ScrollContainer>
  )
}