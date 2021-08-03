import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Button, Subheading, Portal } from 'react-native-paper'
import styled from 'styled-components/native'
import { TabView, SceneMap } from 'react-native-tab-view'

import Tabs from '../Tabs'
import DialogContainer from '../DialogContainer'
import CategoryIcon from '../CategoryIcon'
import useIconStore from './useIconStore'
import IconTab from './IconTab'
import ColorTab from './ColorTab'

const Container = styled(DialogContainer)`
  max-width: 350px;
  min-width: 320px;
  height: 80%;
  display: flex;
  align-self: center;
  flex-shrink: 1;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  z-index: 1000;
  margin-bottom: ${({ theme }) => theme.insets.bottom + 20}px;
  overflow: hidden;
`

const Preview = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

const Icon = styled(CategoryIcon)`
  margin-right: 15px;
  margin-bottom: 0px;
`

const Actions = styled(Dialog.Actions)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

const ActionButton = styled(Button)`
  margin-left: 10px;
`

export default function IconDialog() {
  const {
    name,
    color,
    visible,

    ok,
    cancel
  } = useIconStore()

  const { t } = useTranslation()

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'icon', title: 'Icon' },
    { key: 'color', title: 'Color' },
  ]);

  const renderScene = SceneMap({
    icon: IconTab,
    color: ColorTab,
  });

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <Preview>
          <Icon size={40} color={color} name={`MaterialCommunityIcons:${name}`} />
          <Subheading>Category icon</Subheading>
        </Preview>

        <TabView
          renderTabBar={(props) => <Tabs {...props} />}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />

        <Actions>
          <ActionButton onPress={cancel}>{t('dialogs.icon.cancel')}</ActionButton>
          <ActionButton mode="contained" onPress={ok}>{t('dialogs.icon.ok')}</ActionButton>
        </Actions>
      </Container>
    </Portal>
  )
}