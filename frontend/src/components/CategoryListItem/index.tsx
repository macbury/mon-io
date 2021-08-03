import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styled, { useTheme } from 'styled-components/native'
import { NavigationNavigateAction } from 'react-navigation'
import { Text } from 'react-native-paper'
import { Category } from '../../api/graphql'
import CategoryIcon from '../CategoryIcon'
import Link from '../Link'

const Icon = styled(CategoryIcon)`
  margin-bottom: 0px;
  margin-right: 15px;
`

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
  flex-direction: row;
  flex: 1;
`

const DetailsIcon = styled(MaterialIcons)`
  margin-left: 10px;
`

const CategoryName = styled(Text)`
  font-size: 16px;
`

export interface ICategoryListItemProps {
  category: Category
  action: NavigationNavigateAction
}

export default function CategoryListItem({ category, action } : ICategoryListItemProps) {
  const theme = useTheme()

  return (
    <Link ripple action={action}>
      <Inner>
        <Icon
          name={category.icon}
          color={category.color}
          size={48} />
        <Details>
          <CategoryName>{category.name}</CategoryName>
          {category.shared && <DetailsIcon name="share-variant" color={theme.colors.text} size={20} />}
          {category.archived && <DetailsIcon name="archive" color={theme.colors.text} size={20} />}
        </Details>
      </Inner>
    </Link>
  )
}