import React from 'react'
import { Avatar } from 'react-native-paper'
import { StatusBar, Text, Platform } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

const artBackground = require('../../assets/art-dark.png')

interface IAccountContainer {
  username: string
  backendUrl: string
  avatarUrl: string
}

function calculateContainerHeight() {
  if (Platform.OS === "web") {
    return 110
  } else {
    return 90 + (StatusBar.currentHeight || 0)
  }
}

const Details = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`

const ContainerWithAvatar = styled.ImageBackground`
  flex-direction: row;
  min-height: ${calculateContainerHeight}px;
  background: ${(props) => props.theme.headerBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.itemBorderColor};
`

const Username = styled(Text)`
  font-weight: bold;
  font-size: 22px;
  color: ${(props) => props.theme.colors.text};
  padding: 15px 25px 0px 25px;
  text-align: left;
`

const BackendUrl = styled(Text)`
  font-size: 10px;
  color: ${(props) => props.theme.colors.text};
  padding: 0px 25px 15px 25px;
  text-align: left;
`

const ProfileAvatar = styled(Avatar.Image)`
  margin-right: 15px;
  align-self: flex-end;
  margin-bottom: 15px;
`

export default function AccountContainer({ username, backendUrl, avatarUrl } : IAccountContainer) {
  const theme = useTheme()

  return (
    <ContainerWithAvatar source={artBackground} resizeMode="cover" imageStyle={{ tintColor: theme.colors.text, top: 50 }}>
      <Details>
        <Username>{username}</Username>
        <BackendUrl>{backendUrl}</BackendUrl>
      </Details>
      <ProfileAvatar size={48} source={{ uri: avatarUrl }} />
    </ContainerWithAvatar>
  )
}