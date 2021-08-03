import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ActivityIndicator } from 'react-native'
import { Text, Portal } from 'react-native-paper'

const Overlay = styled.View`
  position: absolute;
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: ${({ theme }) => theme.colors.overlay};
`

const Title = styled(Text)`
  font-size: 18px;
  margin-top: 15px;
`

interface IOverlayProgressProps {
  visible: boolean;
  title: string;
  indicator?: boolean;
}

export default function OverlayProgress({ visible, title, indicator } : IOverlayProgressProps) {
  const { colors } = useTheme()
  if (!visible) {
    return null
  }

  return (
    <Portal>
      <Overlay>
        {indicator && <ActivityIndicator size={90} color={colors.text} />}
        <Title>{title}</Title>
      </Overlay>
    </Portal>
  )
}