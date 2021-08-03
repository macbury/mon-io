import React, { useMemo, useCallback } from 'react'
import { Text, IconButton, TouchableRipple } from 'react-native-paper'
import FileTypeIcon from '../FileTypeIcon'
import styled from 'styled-components/native'

import moment from 'moment-timezone'
import Link from '../../Link'
import { previewReceiptPath } from '../../../helpers/urls'
import { IPendingItemProps } from './types'
import { ItemMenu } from '../Menu'

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
  padding: 10px 15px 10px 15px;
  flex-shrink: 1;
  flex-grow: 1;
`

const ItemDetails = styled.View`
  flex: 1;
  flex-shrink: 1;
  flex-direction: row;
  justify-content: center;
`

const PublishedAtText = styled(Text)`
  opacity: 0.4;
  text-transform: uppercase;
  width: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TitleText = styled(Text)`
  font-size: 18px;
  flex: 1;
`

const ActionsContainer = styled.View`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  margin-right: 20px;
`

const CategoryOption = styled.TouchableOpacity`
  margin: 0 10px;
  min-width: 200px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.background};
  border-width: 0px;
`

const IconContainer = styled.View`
  margin-right: 10px;
`

export default function PendingItem(props : IPendingItemProps) {
  const {
    item,
    onChangeCategoryPress,
    onRegisterPress
  } = props

  const changeCategoryPress = useCallback(() => onChangeCategoryPress(item, null), [item, onChangeCategoryPress])
  const publishedAt = useMemo(() => moment(item.createdAt).format('D/MM/YYYY H:mm'), [item.createdAt])
  const registerPress = useCallback(() => onRegisterPress(item.id), [onRegisterPress])

  return (
    <ItemContainer>
      <ItemLink action={previewReceiptPath(item.id)} ripple grow>
        <IconContainer>
          <FileTypeIcon type={item.mimeType} />
        </IconContainer>

        <ItemDetails>
          <TitleText lineBreakMode="tail" numberOfLines={2}>{item.name}</TitleText>
          <PublishedAtText>{publishedAt}</PublishedAtText>
        </ItemDetails>
      </ItemLink>
      <CategoryOption onPress={changeCategoryPress}>
        <Text>{item?.category?.name || '-'}</Text>
      </CategoryOption>
      <ActionsContainer>
        <ItemMenu item={item} {...props} />
        <IconButton icon="check-all" onPress={registerPress} />
      </ActionsContainer>
    </ItemContainer>
  )
}