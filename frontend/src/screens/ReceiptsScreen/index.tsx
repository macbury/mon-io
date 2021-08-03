import React, { useCallback } from 'react'
import { Linking, Platform } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import { NavigationInjectedProps } from 'react-navigation'

import { RecurrenceUpdateMode } from '../../api/graphql'
import DetailedModeTable from '../../components/Receipts/DetailedMode'
import SimpleModeList from '../../components/Receipts/SimpleMode'
import AppHeader from '../../components/layout/AppHeader'
import MenuActionButton from '../../components/MenuActionButton'
import WideContainerDropZone from '../../components/layout/WideContainerDropZone'
import Desktop from '../../components/responsive/Desktop'
import Mobile from '../../components/responsive/Mobile'
import Fab from '../../components/Fab'
import { takePicture } from '../../modules/TakePictureModule'
import { ReceiveFileModule } from '../../modules/ReceiveFileModule'

import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'
import { useRequestGeolocation } from '../../helpers/geolocation'
import useShowPlannedTransactionMenu from '../../components/PlannedTransactionItem/useShowPlannedTransactionMenu'
import { newBillTransactionPath, editSeriesPath } from '../../helpers/urls'

import { useReceipts } from './hooks'
import SummaryMenu from './SummaryMenu'


function ReceiptsScreenHeader(props) {
  return (
    <AppHeader {...props}>
      {Platform.OS !== "web" && <MenuActionButton icon="cloud-upload" onPress={() => ReceiveFileModule.askForFile('application/pdf') } />}
    </AppHeader>
  )
}

function ReceiptsScreen({ navigation } : NavigationInjectedProps) {
  const {
    createForFiles,
    refresh,
    changeCategory,
    destroyReceipt,
    cancelUpload,
    ignoreDate,
    submit,

    pendingReceipts,
    categories,
    awaitingUploadReceipts,
    refreshing,
    plannedTransactions,
    imports
  } = useReceipts()

  const syncAndRefresh = useCallback(() => void refresh(), [refresh])

  useDefaultScreenBar()
  useRequestGeolocation()
  useFocusEffect(syncAndRefresh)

  const downloadFile = useCallback((receipt) => Linking.openURL(receipt.fileUrl), [])

  const openScanner = useCallback(async () => {
    const fileUri = await takePicture()
    if (fileUri) {
      await submit(fileUri)
    }
  }, [submit])

  const onShowPlannedTransactionActions = useShowPlannedTransactionMenu({
    onEditPlannedTransaction: (seriesId, date) => navigation.navigate(editSeriesPath(seriesId, RecurrenceUpdateMode.ThisAndFuture, date)),
    onIgnorePlannedTransaction: ignoreDate
  })

  const onDestroyPress = useCallback((id, pendingUpload) => {
    if (pendingUpload) {
      cancelUpload(id)
    } else {
      destroyReceipt(id)
    }
  }, [cancelUpload, destroyReceipt])

  const onChangeCategoryPress = useCallback((receipt) => {
    changeCategory(receipt)
  }, [changeCategory, navigation])

  const onRegisterPress = useCallback((receiptId) => {
    navigation.navigate(newBillTransactionPath(receiptId))
  }, [navigation])

  return (
    <WideContainerDropZone onDrop={createForFiles}>
      <Desktop>
        <DetailedModeTable
          plannedTransactions={plannedTransactions}
          pendingReceipts={pendingReceipts}
          categories={categories}
          imports={imports}
          onFileSelect={createForFiles}
          onPlannedTransactionActionsShow={onShowPlannedTransactionActions}
          onRegisterPress={onRegisterPress}
          onDestroyReceiptPress={onDestroyPress}
          onDownloadFile={downloadFile}
          onChangeCategoryPress={onChangeCategoryPress} />
      </Desktop>
      <Mobile>
        <SimpleModeList
          imports={imports}
          refreshing={refreshing}
          pendingReceipts={pendingReceipts}
          plannedTransactions={plannedTransactions}
          awaitingUploadReceipts={awaitingUploadReceipts}
          onPlannedTransactionActionsShow={onShowPlannedTransactionActions}
          onRefresh={syncAndRefresh}
          onRegisterPress={onRegisterPress}
          onDestroyReceiptPress={onDestroyPress}
          onChangeCategoryPress={onChangeCategoryPress}
          onDownloadFile={downloadFile} />
      </Mobile>

      {Platform.OS !== "web" && <Fab icon="camera" onPress={openScanner} />}
    </WideContainerDropZone>
  );
}

// @ts-ignore
ReceiptsScreen.navigationOptions = props => ({
  title: 'pages.receipts.title',
  header: (props) => <ReceiptsScreenHeader {...props} />,
  menu: () => <SummaryMenu />
})


export default ReceiptsScreen