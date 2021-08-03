import React from 'react'
import ConfirmDialog from '../dialogs/ConfirmDialog'
import ReceiptPickerDialog from '../ReceiptPickerDialog'
import CurrencyPickerDialog from '../CurrencyPickerDialog'
import CategoryPickerDialog from '../CategoryPickerDialog'
import RadioPickerDialog from '../RadioPickerDialog'
import ProgressDialog from '../dialogs/ProgressDialog'
import IconDialog from '../IconDialog'
import CopyContentDialog from '../CopyContentDialog'
import DatePickerDialog from '../DatePickerDialog/withStore'
import MenuActionDialog from '../MenuActionDialog'
import InputDialog from '../InputDialog'

export default function Dialogs() {
  return (
    <React.Fragment>
      <ProgressDialog />
      <RadioPickerDialog />
      <ConfirmDialog />
      <ReceiptPickerDialog />
      <CurrencyPickerDialog />
      <CategoryPickerDialog />
      <DatePickerDialog  />
      <IconDialog />
      <CopyContentDialog />
      <MenuActionDialog />
      <InputDialog />
    </React.Fragment>
  )
}