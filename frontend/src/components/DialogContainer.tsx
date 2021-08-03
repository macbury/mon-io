import React from 'react'
import { Dialog } from 'react-native-paper'
import KeyboardShift from './KeyboardShift'

export interface IDialogContainer {
  visible: boolean
  children: any
  onDismiss?()
}

export default function DialogContainer({ visible, children, ...props } : IDialogContainer) {
  if (!visible) {
    return null
  }

  return (
    <KeyboardShift>
      <Dialog visible={visible} {...props}>
        {visible && children}
      </Dialog>
    </KeyboardShift>
  )
}