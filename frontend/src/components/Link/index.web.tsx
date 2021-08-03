import React from 'react'
import { Link } from '@react-navigation/web'
import { View } from 'react-native'

import ILinkProps from './props'
import { TouchableOpacity } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

export default function WebLink(props : ILinkProps) {
  const { onLongPress, children, grow, ripple, action, title, ...rest} = props
  const WrapperComponent = ripple ? TouchableRipple : TouchableOpacity

  const navigateTo = () => {}
  const style = grow ? { flexGrow: 1, flexShrink: 1 } : null

  return (
    <WrapperComponent onPress={navigateTo} style={style} onLongPress={onLongPress}>
      <Link title={title} action={action} draggable={false}>
        <View {...rest}>
          {children}
        </View>
      </Link>
    </WrapperComponent>
  )
}
