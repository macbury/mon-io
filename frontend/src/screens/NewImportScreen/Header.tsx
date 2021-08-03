import React, { useState, useCallback } from 'react'
import { StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Menu } from 'react-native-paper'
import AppHeader from '../../components/layout/AppHeader'
import MenuActionButton from '../../components/MenuActionButton'
import { useStoreData } from '../../stores'
import { transactionsPath } from '../../helpers/urls'

function useEditImport() {
  return useStoreData(({ screens: { editImport } }) => ({
    isReady: editImport.isReady,
    importId: editImport.id,
    destroy: editImport.destroy
  }))
}

export default function EditImportScreenHeader(props) {
  const [visible, setVisible] = useState(false)
  const { navigation } = props
  const { t } = useTranslation()
  const {
    isReady,
    importId,
    destroy
  } = useEditImport()

  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const showMenu = useCallback(() => setVisible(true), [setVisible])

  const destroyImport = useCallback(async () => {
    hideMenu()
    if (await destroy()) {
      navigation.pop()
    }
  }, [hideMenu, destroy, navigation])

  const showTransactions = useCallback(() => {
    hideMenu()
    navigation.dispatch(transactionsPath(null, null, importId))
  }, [hideMenu, navigation, importId])

  if (!isReady) {
    return <AppHeader title={t('pages.new_import.title')} {...props}></AppHeader>
  }

  const anchor = <MenuActionButton icon="dots-vertical" onPress={showMenu} />

  return (
    <AppHeader title={t('pages.new_import.title')} {...props}>
      <Menu onDismiss={hideMenu} visible={visible} anchor={anchor} style={{ marginTop: StatusBar.currentHeight }}>
        <Menu.Item title={t('pages.new_import.menu.show_transactions')} onPress={showTransactions} />
        <Menu.Item title={t('pages.new_import.menu.destroy')} onPress={destroyImport} />
      </Menu>
    </AppHeader>
  )
}