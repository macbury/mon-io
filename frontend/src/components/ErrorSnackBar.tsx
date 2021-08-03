import React, { useEffect, useState } from 'react'
import { Snackbar } from 'react-native-paper'

interface IErrorSnackBarProps {
  title: String;
  visible: boolean;
  retry?() : any;
  onDismiss?()
}

export default function ErrorSnackBar(props : IErrorSnackBarProps) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible, props.title])
  const { title, retry } = props

  const dismissAction = () => {
    setVisible(false)
    if (props.onDismiss) {
      props.onDismiss()
    }
  }

  const retryAction : any = retry ? {
    label: 'Retry',
    onPress: () => {
      retry()
      dismissAction()
    }
  } : {
    label: 'Dismiss',
    onPress: () => {
      dismissAction()
    }
  }

  return (
    <Snackbar visible={visible} action={retryAction} onDismiss={dismissAction} duration={Snackbar.DURATION_SHORT}>
      {title}
    </Snackbar>
  )
}