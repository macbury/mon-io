import React, { useState, useEffect, useCallback } from 'react'
import { Moment } from 'moment-timezone'
import { Dialog, Portal, Button } from 'react-native-paper'
import styled from 'styled-components/native'
import Calendar from '../Calendar'

const Container = styled(Dialog)`
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
  margin-right: 15px;
  min-width: 100px;
`

const CancelButton = styled(Button)`
  min-width: 100px;
`

interface IDatePickerDialogProps {
  date?: Moment
  visible: boolean
  onSuccess(newDate : Moment)
  onDismiss()
}

export default function DatePickerDialog({ visible, onDismiss, onSuccess, date } : IDatePickerDialogProps) {
  const [selectedDate, setSelectedDate] = useState(date)
  const onSaveDatePress = useCallback(() => {
    onSuccess(selectedDate)
    onDismiss()
  }, [selectedDate, onDismiss, onSuccess])

  useEffect(() => setSelectedDate(date), [date, visible])

  return (
    <Portal>
      <Container visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Calendar
            date={selectedDate}
            onDateChange={setSelectedDate} />
        </Dialog.Content>
        <Actions>
          <SaveButton disabled={!selectedDate} mode="contained" onPress={onSaveDatePress}>Save</SaveButton>
          <CancelButton onPress={onDismiss}>Cancel</CancelButton>
        </Actions>
      </Container>
    </Portal>
  )
}