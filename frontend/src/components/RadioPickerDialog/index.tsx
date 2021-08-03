import React, { useCallback } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper'
import styled from 'styled-components/native'
import { RadioOption } from '../../stores/UI/RadioPickerDialogStore'
import { useStoreData } from '../../stores'
import Item from './Item'
import DialogContainer from '../DialogContainer'

const Container = styled(DialogContainer)`
  margin-left: auto;
  margin-right: auto;
  max-width: 900px;
  align-self: center;
`

const ListContainer = styled.ScrollView`
  min-height: 300px;
  padding-left: 0px;
  padding-right: 0px;
  max-height: 400px;
  min-width: 300px;
`

const ActionButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 80px;
`

function useRadioPickerDialogStore() {
  return useStoreData(({ ui: { radioPicker } }) => ({
    title: radioPicker.title,
    visible: radioPicker.visible,
    refreshing: radioPicker.isRefreshing,
    options: radioPicker.options,
    current: radioPicker.current,
    respondWith: radioPicker.respondWith
  }))
}

export default function RadioPickerDialog() {
  const {
    visible,
    title,
    current,
    options,
    respondWith
  } = useRadioPickerDialogStore()

  const cancel = useCallback(() => {
    respondWith(null)
  }, [respondWith])

  const confirm = useCallback((option : RadioOption) => {
    respondWith(option)
  }, [respondWith])

  const items = options.map((option : RadioOption) => (
    <Item
      key={option.value}
      onSelect={confirm}
      option={option}
      selected={option.value === current} />
  ))

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <ListContainer>
          {items}
        </ListContainer>
      </Container>
    </Portal>
  )
}