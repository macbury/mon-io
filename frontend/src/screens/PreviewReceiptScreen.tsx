import React, { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'styled-components/native'
import { NavigationInjectedProps } from 'react-navigation'
import { Appbar } from 'react-native-paper'
import { Linking } from 'react-native'

import { useModalScreenBar } from '../helpers/useSetNavBarColor'
import { newBillTransactionPath } from '../helpers/urls'
import { useStoreData } from '../stores'
import Fab from '../components/Fab'
import WideContainer from '../components/layout/WideContainer'
import PreviewPdf from '../components/PreviewPdf'
import FullPageLoader from '../components/layout/FullPageLoader'
import AppHeader from '../components/layout/AppHeader'
import { AppBarMenu } from '../components/Receipts/Menu'

function usePreviewReceipt() {
  return useStoreData(({ screens: { receipts, previewReceipt } }) => ({
    currentReceipt: previewReceipt.currentReceipt,
    downloadUrl: previewReceipt.downloadUrl,
    loading: previewReceipt.isLoading,

    fetch: previewReceipt.fetch,
    destroy: receipts.destroyReceipt,
    changeCategory: receipts.changeCategory
  }))
}

function PreviewReceiptScreen({ navigation } : NavigationInjectedProps) {
  const receiptId = navigation.getParam('receiptId')
  const {
    loading,
    currentReceipt,
    downloadUrl,

    fetch
  } = usePreviewReceipt()

  useModalScreenBar()

  useEffect(() => {
    const promise = fetch(receiptId)
    return () => promise.cancel()
  }, [receiptId])

  const registerReceipt = useCallback(() => {
    navigation.navigate(newBillTransactionPath(currentReceipt.id))
  }, [currentReceipt, navigation])

  if (loading || !downloadUrl) {
    return <FullPageLoader />
  }

  return (
    <WideContainer navbar>
      <PreviewPdf fileUrl={downloadUrl} />
      {!currentReceipt?.attached && <Fab navbar icon="check-all" onPress={registerReceipt} />}
    </WideContainer>
  );
}

function PreviewScreenHeader(props) {
  const { navigation } = props
  const { changeCategory, currentReceipt, loading, destroy } = usePreviewReceipt()
  const title = currentReceipt && !loading ? currentReceipt.name : 'Preview'
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const showMenu = useCallback(() => setVisible(true), [setVisible])

  const destroyFile = useCallback(async () => {
    hideMenu()
    if (await destroy(currentReceipt.id)) {
      navigation.popToTop()
    }
  }, [hideMenu, destroy, currentReceipt])

  const openFile = useCallback(() => {
    hideMenu()
    Linking.openURL(currentReceipt.fileUrl)
  }, [hideMenu, currentReceipt])

  const onChangeCategoryPress = useCallback(() => {
    changeCategory(currentReceipt)
    hideMenu()
  }, [hideMenu, currentReceipt, changeCategory])

  const onRegisterPress = useCallback(() => {
    navigation.navigate(newBillTransactionPath(currentReceipt.id))
    hideMenu()
  }, [hideMenu, currentReceipt])

  return (
    <AppHeader title={title} {...props}>
      <AppBarMenu
        visible={visible}
        onRegisterPress={onRegisterPress}
        onChangeCategoryPress={onChangeCategoryPress}
        onDownloadFile={openFile}
        onDestroyReceiptPress={destroyFile}
        hideMenu={hideMenu}>
        {currentReceipt && !currentReceipt.attached && <Appbar.Action icon="dots-vertical" color={theme.colors.icon} onPress={showMenu} />}
      </AppBarMenu>
    </AppHeader>
  )
}

// @ts-ignore
PreviewReceiptScreen.navigationOptions = props => ({
  title: 'pages.preview.title',
  header: (props) => <PreviewScreenHeader {...props} />
})


export default PreviewReceiptScreen