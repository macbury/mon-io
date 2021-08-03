import { useEffect } from 'react'
import { NavigationInjectedProps, withNavigation, NavigationNavigateAction } from 'react-navigation'

interface IRedirectProp {
  action: NavigationNavigateAction;
}

function Redirect(props : IRedirectProp & NavigationInjectedProps) {
  const { navigation, action } = props
  useEffect(() => {
    setTimeout(() => navigation.navigate(action))
  })
  return null
}

export default withNavigation(Redirect)