import React, { useEffect } from 'react'
import { NavigationInjectedProps } from 'react-navigation'
import { useStoreData } from '../stores'
import { homePath } from '../helpers/urls'

export default function guestRequired(Component : any) {
  return function AuthenticationRequired(props : NavigationInjectedProps) {
    const { isSignedIn } = useStoreData((store) => ({ isSignedIn: store.session.isSignedIn }))
    const { navigation } = props
    useEffect(() => {
      if (isSignedIn) {
        navigation.navigate(homePath())
      }
    }, [isSignedIn, navigation])

    if (!isSignedIn) {
      return <Component {...props} />
    } else {
      return null
    }
  }
}