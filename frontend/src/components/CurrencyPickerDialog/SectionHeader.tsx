import React from 'react'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

const SectionContainer = styled.View`
  display: flex;
  flex: 1;
  height: 60px;
  justify-content: center;
  padding-left: 25px;
`

const HeaderTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`

interface ISectionHeader {
  title : string
}

export default function SectionHeader({ title } : ISectionHeader) {
  return (
    <SectionContainer>
      <HeaderTitle numberOfLines={1}>
        {title}
      </HeaderTitle>
    </SectionContainer>
  )
}