import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Platform } from 'react-native'
import RNRestart from 'react-native-restart'

import Message from './Message'

interface IErrorBoundaryState {
  error : Error
}

function DummyErrorBoundary({ children }) {
  return children
}

class ErrorBoundary extends React.Component<any, IErrorBoundaryState> {
  state = { error: null }

  private restartApp = async () => {
    await AsyncStorage.clear()
    this.setState({ error: null })
    if (Platform.OS === 'web') {
      window.location.reload()
    } else {
      RNRestart.Restart()
    }
  }

  public render() {
    const { error } = this.state

    return (
      <Message error={error} onRestart={this.restartApp}>
        {this.props.children}
      </Message>
    )
  }

  public componentDidCatch(error, _errorInfo) {
    console.log('Oh no!', error)
  }

  static getDerivedStateFromError (error) {
    console.log('getDerivedStateFromError', error)
    return { error }
  }
}

export default (process.env.NODE_ENV === 'development') ? DummyErrorBoundary : ErrorBoundary