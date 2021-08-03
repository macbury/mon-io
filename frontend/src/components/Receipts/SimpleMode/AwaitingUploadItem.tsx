import React, { useMemo, useCallback } from 'react'
import path from 'path'
import useActionSheet from '../../../helpers/useActionSheet'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import styled from 'styled-components/native'

import moment from 'moment-timezone'
import { IAwaitingUploadItemProps } from './types'

const ItemContainer = styled(TouchableRipple)`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.itemBorderColor};
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ItemLink = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 25px 10px 20px;
  flex-shrink: 1;
  flex-grow: 1;
`

const ItemCover = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 5px;
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

export default function AwaitingUploadItem(props : IAwaitingUploadItemProps) {
  const showActionSheetWithOptions = useActionSheet()
  const { item, onDestroyReceiptPress } = props
  const publishedAt = useMemo(() => moment(item.createdAt).format('D/MM/YYYY H:mm'), [item.createdAt])
  const name = useMemo(() => {
    return path.basename(item.fileUri)
  }, [item])

  const showActions = useCallback(() => {
    showActionSheetWithOptions({
      options: [
        'Delete',
        'Cancel'
      ],
      cancelButtonIndex: 1,
      title: name,
      showSeparators: true
    }, (option) => {
      switch(option) {
        case 0:
          onDestroyReceiptPress(item.clientMutationId, true)
        break;
      }
    })
  }, [showActionSheetWithOptions, onDestroyReceiptPress])

  return (
    <ItemContainer onPress={showActions} onLongPress={showActions}>
      <ItemLink>
        <ItemCover source={{ uri: item.fileUri }} />
        <ItemDetails>
          <PublishedAtText>{publishedAt}</PublishedAtText>
          <TitleText lineBreakMode="tail" numberOfLines={2}>{name}</TitleText>
        </ItemDetails>
      </ItemLink>
    </ItemContainer>
  )
}