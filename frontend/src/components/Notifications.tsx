import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Snackbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import { INotification } from '../stores/UI/NotificationsStore'
import { useStoreData } from '../stores'
import logger from '../helpers/logger'

const log = logger('Notifications')

function useNotificationStore() {
  const { hide, current } = useStoreData(({ ui: { notifications } }) => ({
    hide: notifications.hide,
    current: notifications.current
  }))

  const action = useGenerateAction(current, hide)

  return {
    message: current?.message?.toString(),
    visible: !!current,
    hide,
    action
  }
}

function useGenerateAction(current: INotification, hide) {
  const navigation = useNavigation()

  if (!current) {
    return null
  }

  const {
    action,
    retryAction
  } = current

  if (action) {
    return {
      label: action.name,
      onPress: () => {
        navigation.dispatch(action.url)
      }
    }
  } else if (retryAction) {
    return {
      label: 'Retry',
      onPress: current.retryAction
    }
  } else {
    return {
      label: 'Dismiss',
      onPress: hide
    }
  }
}

export default function Notifications({ navbar }) {
  const {
    visible,
    action,
    message,
    hide
  } = useNotificationStore()

  const theme = useTheme()

  const isDesktop = theme?.device === 'desktop'
  const bottom = navbar ? theme?.insets?.bottom : 0
  const style = isDesktop ? { width: 480, bottom } : { bottom }

  return (
    <Snackbar
      duration={Snackbar.DURATION_MEDIUM}
      wrapperStyle={style}
      visible={visible}
      onDismiss={hide}
      action={action}>
      {message}
    </Snackbar>
  )
}