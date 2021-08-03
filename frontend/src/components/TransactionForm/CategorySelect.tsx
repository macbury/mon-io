import React from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components/native'

import { Text, TouchableRipple } from 'react-native-paper'
import { Category } from '../../api/graphql'
import Icon from '../Icon'

const artBackground = require('../../assets/art-dark.png')

interface ICategorySelectProps {
  category: Category;
  onPress();
}

const CategoryView = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`

const CategoryIcon = styled(Icon)`
  margin-right: 10px;
`

const Container = styled.ImageBackground`
  background-color: ${({ category } : { category: Category }) => category ? category.color : '#607d8b' };
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

interface ICategoryNameProps {
  isBigScreen: boolean
}

const CategoryName = styled(Text)`
  font-size: ${(props : ICategoryNameProps) => props.isBigScreen ? 24 : 18}px;
  font-weight: bold;
  color: #fff;
`

export default function CategorySelect({ category, onPress } : ICategorySelectProps) {
  const icon = category ? category.icon : 'MaterialIcons:folder'
  const name = category ? category.name : 'Select Category'
  const isBigScreen = useMediaQuery({ minWidth: 480 })

  return (
    <Container source={artBackground} resizeMode="cover" category={category}>
      <TouchableRipple onPress={onPress}>
        <CategoryView>
          <CategoryIcon name={icon} color={'#fff'} size={isBigScreen ? 48 : 30} />
          <CategoryName isBigScreen={isBigScreen}>{name}</CategoryName>
        </CategoryView>
      </TouchableRipple>
    </Container>

  )
}
