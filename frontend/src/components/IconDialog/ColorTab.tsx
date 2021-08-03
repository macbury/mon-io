import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import useIconStore from './useIconStore'

const Container = styled.View`
  flex: 1;
`

const Button = styled(TouchableRipple)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 5px;
`

const ColorIcon = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`

const SelectedIcon = styled.View`
  border-width: 4px;
  border-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`

const COLUMNS = 6

const COLORS = [
  '#E57373', '#D32F2F', '#C62828', '#B71C1C',
  '#F06292', '#C2185B', '#AD1457', '#880E4F',
  '#BA68C8', '#7B1FA2', '#6A1B9A', '#4A148C',
  '#9575CD', '#512DA8', '#4527A0', '#311B92',
  '#7986CB', '#303F9F', '#283593', '#1A237E',
  '#64B5F6', '#1976D2', '#1565C0', '#0D47A1',
  '#4FC3F7', '#0288D1', '#0277BD', '#01579B',
  '#4DD0E1', '#0097A7', '#00838F', '#006064',
  '#4DB6AC', '#00796B', '#00695C', '#004D40',
  '#81C784', '#388E3C', '#2E7D32', '#1B5E20',
  '#AED581', '#689F38', '#558B2F', '#33691E',
  '#DCE775', '#AFB42B', '#9E9D24', '#827717',
  '#FFF176', '#FBC02D', '#F9A825', '#F57F17',
  '#FFD54F', '#FFA000', '#FF8F00', '#FF6F00',
  '#FFB74D', '#F57C00', '#EF6C00', '#E65100',
  '#FF8A65', '#E64A19', '#D84315', '#BF360C',
  '#A1887F', '#5D4037', '#4E342E', '#3E2723',
  '#BDBDBD', '#616161', '#424242', '#212121'
]

export default function ColorTab() {
  const {
    color,
    setColor
  } = useIconStore()

  const renderItem = useCallback(({ item }) => {
    return (
      <Button centered onPress={() => setColor(item)}>
        <ColorIcon style={{ backgroundColor: item }}>
          {color === item && <SelectedIcon />}
        </ColorIcon>
      </Button>
    )
  }, [color, setColor])

  return (
    <Container>
      <FlatList
        numColumns={COLUMNS}
        data={COLORS}
        extraData={color}
        keyExtractor={(name) => name}
        renderItem={renderItem} />
    </Container>
  )
}