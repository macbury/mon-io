import React from 'react'
import { View } from 'react-native'
import ILinkProps from './props'

import { TouchableOpacity } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useNavigation } from 'react-navigation-hooks'

export default function Link(props : ILinkProps) {
  const { onLongPress, action, children, grow, ripple, ...rest } = props
  const navigation = useNavigation()

  const navigateTo = () => {
    (navigation as any).closeDrawer()
    navigation.navigate(action)
  }

  const WrapperComponent = ripple ? TouchableRipple : TouchableOpacity
  const style = grow ? { flexGrow: 1, flexShrink: 1 } : null

  return (
    <WrapperComponent onPress={navigateTo} style={style} onLongPress={onLongPress}>
      <View {...rest}>
        {children}
      </View>
    </WrapperComponent>
  )
}
