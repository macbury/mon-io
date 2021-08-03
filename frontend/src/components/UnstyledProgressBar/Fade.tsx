import React, { Component } from 'react'
import { Animated, Platform } from 'react-native'

interface IFadeProps {
  visible: boolean
  style?: any
}

interface IFadeState {
  fadeAnim: any
  visible: boolean
}

export default class Fade extends Component<IFadeProps, IFadeState> {
  constructor(props) {
    super(props)

    this.state = {
      fadeAnim: new Animated.Value(props.visible ? 1 : 0),
      visible: props.visible
    }
  }

  componentDidUpdate(prevProps : IFadeProps) {
    const { visible: prevVisible } = prevProps
    const { visible } = this.props

    if (prevVisible !== visible) {
      this.setState({ visible: true })
      Animated.timing(this.state.fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: Platform.OS !== 'web'
      }).start(() => this.setState({ visible }))
    }
  }

  render() {
    const { fadeAnim, visible: elVisible } = this.state
    const { children, style = {}, visible, ...props } = this.props

    return (
      <Animated.View style={[style, { opacity: fadeAnim }]} {...props}>
        {elVisible && children}
      </Animated.View>
    )
  }
}