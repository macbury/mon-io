import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

interface IItemPlaceholderProps {
  style? : any
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  align-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
  align-items: center;
  height: 69px;
`

const Details = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Icon = styled.View`
  margin-bottom: 0px;
  margin-right: 15px;
  border-radius: 50px;
  width: 48px;
  height: 48px;
  background: ${(prop) => prop.theme.itemBorderColor};
`

const DetailsRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 3px;
  max-width: 100px;
  background: ${(prop) => prop.theme.itemBorderColor};
  height: 16px;
`

const WideDetailsRow = styled(DetailsRow)`
  max-width: 150px;
`

export default function ItemPlaceholder(props : IItemPlaceholderProps) {
  return (
    <Container {...props}>
      <Icon />
      <Details>
        <WideDetailsRow />
        <DetailsRow />
      </Details>
    </Container>
  )
}