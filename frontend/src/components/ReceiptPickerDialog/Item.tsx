import React, { useMemo } from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import moment from 'moment-timezone'
import { Receipt } from '../../api/graphql'
import FileTypeIcon from '../Receipts/FileTypeIcon'
import styled from 'styled-components/native'

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemLink = styled(TouchableRipple)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 25px 10px 20px;
  flex-shrink: 1;
  flex-grow: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.itemBorderColor};
`

const ItemCover = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const ItemDetails = styled.View`
  flex: 1;
  flex-shrink: 1;
`

const PublishedAtText = styled(Text)`
  opacity: 0.4;
  text-transform: uppercase;
`

const TitleText = styled(Text)`
  font-weight: bold;
`

interface ICategoryTextProp {
  color: string;
}

const CategoryText = styled(Text)`
  color: ${(prop : ICategoryTextProp) => prop.color ? prop.color : '#fff'};
`

export interface IItemProps {
  receipt: Receipt
  onReceiptSelect(receipt : Receipt)
}

export default function Item(props : IItemProps) {
  const {
    receipt,
    onReceiptSelect
  } = props
  const publishedAt = useMemo(() => moment(receipt.createdAt).format('D/MM/YYYY H:mm'), [receipt.createdAt])

  return (
    <ItemLink onPress={() => onReceiptSelect(receipt)}>
      <ItemContainer>
        <ItemCover>
          <FileTypeIcon type={receipt.mimeType} size={48} />
        </ItemCover>
        <ItemDetails>
          <PublishedAtText>{publishedAt}</PublishedAtText>
          <TitleText lineBreakMode="tail" numberOfLines={2}>{receipt.name}</TitleText>
          {receipt.category && <CategoryText color={receipt.category.color}>in {receipt.category.name}</CategoryText>}
        </ItemDetails>
      </ItemContainer>
    </ItemLink>
  )
}