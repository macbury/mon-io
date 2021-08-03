import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

import moment from 'moment-timezone'
import Link from '../../Link'
import FileTypeIcon from '../FileTypeIcon'
import { previewReceiptPath } from '../../../helpers/urls'
import { IPendingItemProps } from './types'
import { useItemActionSheet } from '../Menu'

const ItemContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.itemBorderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  flex-shrink: 1;
  flex-grow: 1;
`

const ItemCover = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
`

const ItemDetails = styled(View)`
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

export default function PlaybackItem(props : IPendingItemProps) {
  const { item } = props
  const publishedAt = useMemo(() => moment(item.createdAt).format('D/MM/YYYY H:mm'), [item.createdAt])

  const showActions = useItemActionSheet(item, props)

  return (
    <ItemContainer>
      <ItemLink action={previewReceiptPath(item.id)} ripple grow onLongPress={showActions}>
        <ItemCover>
          <FileTypeIcon type={item.mimeType} size={48} />
        </ItemCover>
        <ItemDetails>
          <PublishedAtText>{publishedAt}</PublishedAtText>
          <TitleText lineBreakMode="tail" numberOfLines={2}>{item.name}</TitleText>
          {item.category && <CategoryText color={item.category.color}>in {item.category.name}</CategoryText>}
        </ItemDetails>
      </ItemLink>
    </ItemContainer>
  )
}