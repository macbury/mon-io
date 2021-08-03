import React from 'react'
import { SafeAreaView, Keyboard, EmitterSubscription } from 'react-native'
import { FAB, ActivityIndicator } from 'react-native-paper'
import styled from 'styled-components/native'

interface IFabContainerProps {
  locationY: number;
  navbar: boolean;
}

function bottomPos({ theme, navbar }) {
  if (theme.device === "desktop") {
    return 40
  } else if (navbar) {
    return 20 + theme.insets.bottom
  } else {
    return 20
  }
}

const FabContainer = styled.View<IFabContainerProps>`
  position: absolute;
  bottom: ${bottomPos}px;
  right: ${({ theme }) => theme.device === "desktop" ? "40px" : "20px"};
`

const BorderActivityIndicator = styled(ActivityIndicator)`
  position: absolute;
  margin-left: 4px;
  margin-top: 4px;
`

interface IFabState {
  locationY: number;
}

interface IFabProps {
  icon : string;
  snackBarIsVisible?: boolean;
  navbar?: boolean;
  form?: boolean;
  loading?: boolean;
  onPress()
}

//https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/#.gd37tn1wx
export default class Fab extends React.Component<IFabProps, IFabState> {
  private keyboardWillShowSub : EmitterSubscription
  private keyboardWillHideSub : EmitterSubscription

  constructor(props : any) {
    super(props)
    this.state = { locationY: 0 }
    //this.keyboardHeight = new Animated.Value(0);
  }

  get originY() {
    if (this.props.snackBarIsVisible) {
      return 50
    } else {
      return 0
    }
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    const locationY = event.endCoordinates.height
    this.setState({
      locationY
    })
  };

  keyboardWillHide = () => {
    this.setState({
      locationY: 0
    })
  }

  calculateY() {
    const { locationY } = this.state

    return (this.props.form ? 20 : locationY + 0 + this.originY)
  }

  render() {
    const { locationY } = this.state
    const { loading, navbar, ...rest } = this.props

    return (
      <SafeAreaView>
        <FabContainer navbar={navbar} locationY={this.calculateY()}>
          <FAB disabled={loading} loading={loading} {...rest} />
          {loading && <BorderActivityIndicator size="large" animating />}
        </FabContainer>
      </SafeAreaView>
    )
  }
}
