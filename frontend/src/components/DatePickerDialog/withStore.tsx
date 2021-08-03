import React from 'react'
import { Dialog, Portal, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import DialogContainer from '../DialogContainer'
import { useStoreData } from '../../stores'
import Calendar from '../Calendar'

const Container = styled(DialogContainer)`
  min-width: 320px;
  display: flex;
  align-self: center;
`

const Actions = styled(Dialog.Actions)`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-top: 15px;
`

const SaveButton = styled(Button)`
  margin-left: 15px;
`

function useDatePicker() {
  return useStoreData(({ ui: { datePicker } }) => ({
    selectedDate: datePicker.selectedDate,
    visible: datePicker.visible,

    close: datePicker.close,
    respondWith: datePicker.respondWith,
  }))
}

export default function DatePickerDialog(props) {
  const {
    visible,
    selectedDate,

    close,
    respondWith
  } = useDatePicker()

  return (
    <Portal>
      <Container visible={visible} onDismiss={close}>
        <Dialog.Content>
          <Calendar
            date={selectedDate}
            onDateChange={respondWith} />
        </Dialog.Content>
        <Actions>
          <Button onPress={close}>Cancel</Button>
        </Actions>
      </Container>
    </Portal>
  )
}