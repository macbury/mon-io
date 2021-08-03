import React, { useMemo } from 'react'
import moment from 'moment-timezone'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled, { useTheme } from 'styled-components/native'
import { NavigationNavigateAction } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native-paper'
import { Import } from '../../api/graphql'
import Link from '../Link'

const Inner = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  align-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
  align-items: center;
`

const Details = styled.View`
  display: flex;
  flex-direction: ${({ theme }) => theme.device === 'desktop' ? 'row' : 'column'};
  flex: 1;
`

const DetailsIcon = styled(MaterialIcons)`
  margin-right: 10px;
`

const CategoryName = styled(Text)`
  font-size: 16px;
  flex: 1;
`

const PublishedAtText = styled(Text)`
  opacity: 0.4;
  text-transform: uppercase;
  width: 120px;
  text-align: ${({ theme }) => theme.device === 'desktop' ? 'center' : 'left'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ theme }) => theme.device === 'desktop' ? 'center' : 'flex-start'};
  align-items: ${({ theme }) => theme.device === 'desktop' ? 'center' : 'flex-start'};
`


export interface IImportItemProps {
  importData: Import
  action: NavigationNavigateAction
}

export default function ImportItem({ importData, action } : IImportItemProps) {
  const theme = useTheme()
  const publishedAt = useMemo(() => moment(importData.createdAt).format('D/MM/YYYY H:mm'), [importData.createdAt])

  return (
    <Link ripple action={action}>
      <Inner>
        <DetailsIcon>
          <Icon name="database" size={32} color={theme.colors.icon} />
        </DetailsIcon>
        <Details>
          <CategoryName>{importData.name}</CategoryName>
          <PublishedAtText>{publishedAt}</PublishedAtText>
        </Details>
      </Inner>
    </Link>
  )
}