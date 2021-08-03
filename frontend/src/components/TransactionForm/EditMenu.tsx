import React, { useCallback, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useTranslation } from 'react-i18next'
import { StatusBar, Linking, Platform } from 'react-native'
import { Menu } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'styled-components/native'
import useActionSheet from '../../helpers/useActionSheet'
import { useStoreData } from '../../stores'
import MenuActionButton from '../MenuActionButton'
import { Transaction, RecurrenceUpdateMode } from '../../api/graphql'
import {
  previewReceiptPath,
  editImportPath,
  editSeriesPath
} from '../../helpers/urls'

interface IEditMenuProps {
  transaction : Transaction
  onHideScreen?()
}

interface IOption {
  label: string
  icon: string
  disabled?: boolean
  onPress()
}

function useEditOptions(hideMenu, onHideScreen, transaction : Transaction) {
  const { deleteTransaction } = useStoreData(({ screens: { summary } }) => ({
    deleteTransaction: summary.delete
  }))

  const { navigate } = useNavigation()
  const { t } = useTranslation()
  const hasReceipt = transaction?.receipt
  const hasLink = transaction?.link

  const options : Array<IOption> = [
    {
      label: t('pages.edit_transaction.menu.show_link'),
      icon: 'web',
      disabled: !hasLink,
      onPress: () => {
        const { link } = transaction

        if (Platform.OS === "web") {
          window.open(link.url, '_tab')
        } else {
          Linking.openURL(link.url)
        }
        hideMenu()
      }
    },

    {
      label: t('pages.edit_transaction.menu.download_receipt'),
      icon: 'cloud-download-outline',
      disabled: !hasReceipt,
      onPress: () => {
        const { receipt } = transaction

        Linking.openURL(receipt.fileUrl)
        hideMenu()
      }
    },

    {
      label: t('pages.edit_transaction.menu.show_receipt'),
      icon: 'book-open-outline',
      disabled: !hasReceipt,
      onPress: () => {
        const { receipt } = transaction
        navigate(previewReceiptPath(receipt.id))
        hideMenu()
      }
    },

    {
      label: t('pages.edit_transaction.menu.show_import'),
      icon: 'database-edit',
      disabled: !transaction?.import?.id,
      onPress: () => {
        navigate(editImportPath(transaction?.import?.id))
        hideMenu()
      }
    },

    {
      label: t('pages.edit_transaction.menu.show_series'),
      icon: 'calendar-edit',
      disabled: !transaction?.series?.id,
      onPress: () => {
        navigate(editSeriesPath(transaction?.series?.id, RecurrenceUpdateMode.ThisAndFuture, transaction.date))
        hideMenu()
      }
    },

    {
      label: t('pages.edit_transaction.menu.delete'),
      icon: 'trash-can',
      onPress: async () => {
        hideMenu()

        const success = await deleteTransaction(transaction.id)
        if (onHideScreen && success) {
          onHideScreen()
        }
      }
    }
  ]

  return options
}

export function EditTransactionMenu({ transaction, onHideScreen } : IEditMenuProps) {
  const [visible, setVisible] = useState(false)
  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const items = useEditOptions(hideMenu, onHideScreen, transaction)

  const anchor = <MenuActionButton icon="dots-vertical" onPress={() => setVisible(true)} />

  if (!transaction) {
    return null
  }

  return (
    <Menu onDismiss={hideMenu} visible={visible} anchor={anchor} style={{ marginTop: StatusBar.currentHeight }}>
      {items.map(({ label, onPress, disabled, icon }) => (<Menu.Item key={label} disabled={disabled} icon={icon} title={label} onPress={onPress} />))}
    </Menu>
  )
}

const hideMenu = () => {}

export function useItemActionSheet({ transaction, onHideScreen } : IEditMenuProps) {
  const showActionSheetWithOptions = useActionSheet()
  const items = useEditOptions(hideMenu, onHideScreen, transaction).filter(({ disabled }) => !disabled)
  const { t } = useTranslation()
  const theme = useTheme()

  return useCallback(() => {
    const options = items.map(({ label }) => (label))
    const icons = items.map(({ icon }) => <MaterialCommunityIcons color={theme.colors.text} size={24} name={icon} />)
    const actions = items.map(({ onPress }) => (onPress))

    showActionSheetWithOptions({
      icons: [
        ...icons,
        <MaterialCommunityIcons color={theme.colors.text} size={24} name="cancel" />
      ],
      options: [
        ...options,
        t('dialogs.cancel')
      ],
      cancelButtonIndex: items.length + 1,
      showSeparators: true
    }, (option) => {
      const action = actions[option]
      if (action) {
        action()
      }
    })
  }, [items, showActionSheetWithOptions, theme, t])
}