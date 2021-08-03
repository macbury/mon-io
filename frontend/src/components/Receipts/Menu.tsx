import React, { useCallback, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Menu, IconButton } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useActionSheet from '../../helpers/useActionSheet'

import { Receipt, Category } from '../../api/graphql'

export interface ItemActions {
  onChangeCategoryPress?(receipt : Receipt, newCategoryID : string, replaceCategory? : boolean)
  onDestroyReceiptPress?(receiptId : string, pendingUpload? : boolean)
  onRegisterPress?(receiptId : string)
  onDownloadFile?(receipt : Receipt)
  categories? : Array<Category>
}

interface IItemMenuProps extends ItemActions {
  item : Receipt
}

export function ItemMenu(props : IItemMenuProps) {
  const { item, onDownloadFile, onDestroyReceiptPress, onChangeCategoryPress, onRegisterPress } = props
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const showMenu = useCallback(() => setVisible(true), [setVisible])
  const openFile = useCallback(() => {
    onDownloadFile(item)
    hideMenu()
  }, [onDownloadFile, hideMenu])
  const destroyReceipt = useCallback(() => {
    onDestroyReceiptPress(item.id)
    hideMenu()
  }, [onDestroyReceiptPress, hideMenu])
  const changeCategoryPress = useCallback(() => {
    onChangeCategoryPress(item, null, true)
    hideMenu()
  }, [onChangeCategoryPress, hideMenu])
  const registerPress = useCallback(() => {
    onRegisterPress(item.id)
    hideMenu()
  }, [onRegisterPress, hideMenu])

  return (
    <Menu onDismiss={hideMenu} visible={visible} anchor={<IconButton icon="dots-vertical" onPress={showMenu} />}>
      <Menu.Item icon="check-all" title={t('pages.receipts.menu.register')} onPress={registerPress} />
      <Menu.Item icon="tag" title={t('pages.receipts.menu.change_category')} onPress={changeCategoryPress} />
      <Menu.Item icon="cloud-download" title={t('pages.receipts.menu.download')} onPress={openFile} />
      <Menu.Item icon="delete" title={t('pages.receipts.menu.delete')} onPress={destroyReceipt} />
    </Menu>
  )
}

interface IAppBarMenuProps extends ItemActions {
  visible: boolean
  children: any
  hideMenu()
  onChangeCategoryPress()
  onDestroyReceiptPress()
  onDownloadFile()
  onRegisterPress()
}

export function AppBarMenu(props : IAppBarMenuProps) {
  const {
    visible,
    children,
    hideMenu,
    onDestroyReceiptPress,
    onDownloadFile,
    onChangeCategoryPress,
    onRegisterPress
  } = props

  const { t } = useTranslation()

  return (
    <Menu onDismiss={hideMenu} visible={visible} anchor={children} style={{ marginTop: StatusBar.currentHeight }}>
      <Menu.Item icon="check-all" title={t('pages.receipts.menu.register')} onPress={onRegisterPress} />
      <Menu.Item icon="tag" title={t('pages.receipts.menu.change_category')} onPress={onChangeCategoryPress} />
      <Menu.Item icon="cloud-download" title={t('pages.receipts.menu.download')} onPress={onDownloadFile} />
      <Menu.Item icon="delete" title={t('pages.receipts.menu.delete')} onPress={onDestroyReceiptPress} />
    </Menu>
  )
}

export function useItemActionSheet(item : Receipt, props : ItemActions) {
  const { onDestroyReceiptPress, onDownloadFile, onChangeCategoryPress, onRegisterPress } = props
  const showActionSheetWithOptions = useActionSheet()
  const { t } = useTranslation()
  const theme = useTheme()

  return useCallback(() => {
    showActionSheetWithOptions({
      icons: [
        <MaterialCommunityIcons size={24} color={theme.colors.text} name="check-all" />,
        <MaterialCommunityIcons size={24} color={theme.colors.text} name="tag" />,
        <MaterialCommunityIcons size={24} color={theme.colors.text} name="cloud-download" />,
        <MaterialCommunityIcons size={24} color={theme.colors.text} name="delete" />,
        <MaterialCommunityIcons size={24} color={theme.colors.text} name="cancel" />
      ],
      options: [
        t('pages.receipts.menu.register'),
        t('pages.receipts.menu.change_category'),
        t('pages.receipts.menu.download'),
        t('pages.receipts.menu.delete'),
        t('dialogs.cancel')
      ],
      cancelButtonIndex: 4,
      title: item.name,
    }, (option) => {
      switch(option) {
        case 0: // Register
          onRegisterPress(item.id)
        break;

        case 1: // Change Category
          onChangeCategoryPress(item, null, true)
        break;

        case 2: // Download
          onDownloadFile(item)
        break

        case 3: // Delete
          onDestroyReceiptPress(item.id)
        break
      }
    })
  }, [item.id, t, theme])
}