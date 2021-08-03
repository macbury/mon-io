import React, { useCallback, useState } from 'react'
import { Moment } from 'moment-timezone'
import { useNavigation } from 'react-navigation-hooks'
import { useTranslation } from 'react-i18next'
import { StatusBar, Platform, Linking } from 'react-native'
import { Menu, Divider } from 'react-native-paper'

import MenuActionButton from '../MenuActionButton'
import { Receipt, RecurrenceUpdateMode, Series } from '../../api/graphql'
import { previewReceiptPath, editSeriesPath, editImportPath } from '../../helpers/urls'

interface INewMenuProps {
  url: string
  date: Moment
  receipt: Receipt
  series: Series
  onAttachReceipt()
  onDetachReceipt()
}

export default function NewTransactionMenu({ url, date, receipt, series, onDetachReceipt, onAttachReceipt } : INewMenuProps) {
  const [visible, setVisible] = useState(false)
  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const { t } = useTranslation()
  const navigation = useNavigation()

  const hasLink = url?.length > 0
  const anchor = <MenuActionButton icon="dots-vertical" onPress={() => setVisible(true)} />

  const onEditRepeatingClick = useCallback(() => {
    hideMenu()
    navigation.navigate(editSeriesPath(series.id, RecurrenceUpdateMode.ThisAndFuture, date.format('YYYY-MM-DD')))
  }, [navigation, date, series, hideMenu])

  const onAttachReceiptClick = useCallback(() => {
    hideMenu()
    onAttachReceipt()
  }, [hideMenu, onAttachReceipt])

  const onShowReceiptClick = useCallback(() => {
    hideMenu()
    navigation.navigate(previewReceiptPath(receipt.id))
  }, [navigation, receipt, hideMenu])

  const onDeleteClick = useCallback(() => {
    hideMenu()
    onDetachReceipt()
  }, [hideMenu, onDetachReceipt])

  const onShowWebpageClick = useCallback(() => {
    if (Platform.OS === "web") {
      window.open(url, '_blank')
    } else {
      Linking.openURL(url)
    }
    hideMenu()
  }, [hideMenu, url])

  return (
    <Menu onDismiss={hideMenu} visible={visible} anchor={anchor} style={{ marginTop: StatusBar.currentHeight }}>
      <Menu.Item
        icon="web"
        disabled={!hasLink}
        title={t('pages.new_transaction.menu.show_webpage')}
        onPress={onShowWebpageClick} />
      <Menu.Item
        icon="attachment"
        disabled={!!receipt}
        title={t('pages.new_transaction.menu.attach_receipt')}
        onPress={onAttachReceiptClick} />
      <Menu.Item
        icon="book-open-outline"
        disabled={!receipt}
        title={t('pages.new_transaction.menu.show_receipt')}
        onPress={onShowReceiptClick} />
      <Menu.Item
        icon="text-box-remove-outline"
        disabled={!receipt}
        title={t('pages.new_transaction.menu.detach_receipt')}
        onPress={onDeleteClick} />
      <Divider />
      <Menu.Item
        icon="calendar-edit"
        disabled={!series}
        title={t('pages.new_transaction.menu.edit_repeating')}
        onPress={onEditRepeatingClick} />
    </Menu>
  )
}