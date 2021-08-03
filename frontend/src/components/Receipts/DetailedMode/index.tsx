import React, { useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { ScrollView, SectionList } from 'react-navigation'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'

import ListHeaderTitle from '../../layout/ListHeaderTitle'
import PlannedTransactionItem from '../../PlannedTransactionItem'
import { IDetailedReceiptTableProps } from './types'
import { HeaderType } from '../types'
import { newPlannedTransactionPath, editImportPath } from '../../../helpers/urls'
import PendingItem from './PendingItem'
import ImportItem from '../../ImportItem'
import DropZone from './DropZone'

const Container = styled.View`
  flex-direction: row;
  flex: 1.0;
`

const ItemsToUploadColumn = styled.View`
  flex: 1.0;
`

const PlannedTransactionsColumn = styled.View`
  flex: 0.3;
  min-width: 480px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerBorderColor};
`

function renderScrollView(props) {
  return <ScrollView {...props} />
}

export default function DetailedReceiptTable(props : IDetailedReceiptTableProps) {
  const {
    imports,
    pendingReceipts,
    plannedTransactions,
    onPlannedTransactionActionsShow,
    onFileSelect,
    ...restPendingItemProps
  } = props
  const { t } = useTranslation()

  const plannedItemsSections = useMemo(() => {
    return [
      {
        title: t('pages.receipts.header.planned'),
        data: plannedTransactions,
        type: HeaderType.Planned

      }
    ]
  }, [plannedTransactions])

  const pendingItemsSections = useMemo(() => {
    const sec = []

    sec.push({
      title: t('pages.receipts.header.drop_files_here'),
      data: [],
      type: HeaderType.DropZone
    })

    if (pendingReceipts.length > 0) {
      sec.push({
        title: t('pages.receipts.header.invoices_and_receipts'),
        data: pendingReceipts,
        type: HeaderType.Receipts
      })
    }

    if (imports?.length > 0) {
      sec.push({
        title: t('pages.receipts.header.csv'),
        data: imports,
        type: HeaderType.CsvFiles
      })
    }

    return sec
  }, [pendingReceipts, imports])

  const renderItem = useCallback((listItem) => {
    const { item, section: { type } } = listItem

    switch (type) {
      case HeaderType.CsvFiles:
        return (
          <ImportItem
            importData={item}
            action={editImportPath(item.id)} />
        )
      case HeaderType.Planned:
        return (
          <PlannedTransactionItem
            action={newPlannedTransactionPath(item.series.id, item.date)}
            key={item.series.id}
            series={item.series}
            onActionsShow={onPlannedTransactionActionsShow}
            plannedTransaction={item} />
        )
      case HeaderType.Receipts:
        return <PendingItem key={item.id} item={item} {...restPendingItemProps} />
      default:
        console.error('Could not handle ', listItem)
        return <View />
    }
  }, [onPlannedTransactionActionsShow, restPendingItemProps])

  const renderSectionHeader = useCallback(({ section }) => {
    switch (section.type) {
      case HeaderType.Receipts:
      case HeaderType.Planned:
      case HeaderType.CsvFiles:
        return <ListHeaderTitle>{section.title}</ListHeaderTitle>
      case HeaderType.DropZone:
        return (
          <DropZone onFileSelect={onFileSelect}>{section.title}</DropZone>
        )
      default:
        console.error('Could not render section header ', section)
        return <View />
    }
  }, [onFileSelect])

  return (
    <Container>
      <ItemsToUploadColumn>
        <SectionList
          sections={pendingItemsSections}
          renderItem={renderItem}
          initialNumToRender={30}
          renderScrollComponent={renderScrollView}
          renderSectionHeader={renderSectionHeader} />
      </ItemsToUploadColumn>
      {
        plannedTransactions.length > 0 &&
        <PlannedTransactionsColumn>
          <SectionList
            sections={plannedItemsSections}
            renderItem={renderItem}
            initialNumToRender={30}
            renderScrollComponent={renderScrollView}
            renderSectionHeader={renderSectionHeader}
          />
        </PlannedTransactionsColumn>
      }
    </Container>
  )
}