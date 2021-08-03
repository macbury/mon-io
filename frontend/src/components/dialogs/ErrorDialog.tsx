import React, { useEffect, useState, useCallback } from 'react'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper'

interface IErrorDialogProps {
  error: string;
}

export default function ErrorDialog({ error } : IErrorDialogProps) {
  const [visible, setVisible] = useState(false)
  const hide = useCallback(() => setVisible(false))

  useEffect(() => {
    if (error) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [error, setVisible])

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hide}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{error}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hide}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}