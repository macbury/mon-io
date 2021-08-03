import React from 'react'
import MenuActionButton from '../../components/MenuActionButton'

import { useReceipts } from './hooks'

export default function SummaryMenu() {
  const { refresh } = useReceipts()
  return <MenuActionButton icon="reload" onPress={refresh} />
}
