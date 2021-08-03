import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshControl, ScrollView, SectionList } from 'react-native'
import styled from 'styled-components/native'
import { ISimpleReceiptListProps } from './types'
import { HeaderType } from '../types'

import { newPlannedTransactionPath, editImportPath } from '../../../helpers/urls'
import PendingItem from './PendingItem'
import ImportItem from '../../ImportItem'
import PlannedTransactionItem from '../../PlannedTransactionItem'
import AwaitingUploadItem from './AwaitingUploadItem'
import ListHeaderTitle from '../../layout/ListHeaderTitle'

const FabScrollView = styled(ScrollView)`
  padding-bottom: 30px;
`

function renderSectionHeader({ section }) {
  return <ListHeaderTitle>{section.title}</ListHeaderTitle>
}

const extractKey = ({ id, clientMutationId } : any) => id || clientMutationId

function renderScrollView(props : any) {
  return (
    <ScrollView {...props} />
  )
}

export default function SimpleReceiptList(props : ISimpleReceiptListProps) {
  const {
    imports,
    pendingReceipts,
    awaitingUploadReceipts,
    refreshing,
    plannedTransactions,
    onPlannedTransactionActionsShow,
    onRefresh,
    ...restPendingItemProps
  } = props
  const { t } = useTranslation()

  const renderItem = useCallback(({ item, section }) => {
    if (section.type === HeaderType.CsvFiles) {
      return (
        <ImportItem
          importData={item}
          action={editImportPath(item.id)} />
      )
    } else if (section.type === HeaderType.Receipts) {
      return <PendingItem item={item} {...restPendingItemProps} />
    } else if (section.type === HeaderType.Planned) {
      return (
        <PlannedTransactionItem
          onActionsShow={onPlannedTransactionActionsShow}
          action={newPlannedTransactionPath(item.series.id, item.date)}
          key={item.series.id}
          plannedTransaction={item}
          series={item.series}
          {...restPendingItemProps} />
      )
    } else {
      return <AwaitingUploadItem item={item} {...restPendingItemProps} />
    }
  }, [onPlannedTransactionActionsShow])

  const sections = useMemo(() => {
    const items = []

    if (awaitingUploadReceipts.length > 0) {
      items.push({
        title: t('pages.receipts.header.awaiting'),
        type: HeaderType.Upload,
        data: awaitingUploadReceipts
      })
    }

    if (plannedTransactions.length > 0) {
      items.push({
        title: t('pages.receipts.header.planned'),
        type: HeaderType.Planned,
        data: plannedTransactions
      })
    }

    if (pendingReceipts.length > 0) {
      items.push({
        title: t('pages.receipts.header.invoices_and_receipts'),
        type: HeaderType.Receipts,
        data: pendingReceipts
      })
    }

    if (imports?.length > 0) {
      items.push({
        title: t('pages.receipts.header.csv'),
        data: imports,
        type: HeaderType.CsvFiles
      })
    }

    return items
  }, [pendingReceipts, awaitingUploadReceipts, plannedTransactions, imports])

  return <SectionList
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    sections={sections}
    renderSectionHeader={renderSectionHeader}
    keyExtractor={extractKey}
    renderScrollComponent={renderScrollView}
    renderItem={renderItem}
  />
}