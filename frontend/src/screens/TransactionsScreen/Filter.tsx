import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper'
import styled from 'styled-components/native'

import ListHeaderTitle from '../../components/layout/ListHeaderTitle'
import CategoryItem from '../../components/CategoryItem'
import CategoryFilter from '../../components/CategoryFilter'
import DateRangeFilter from './DateRangeFilter'
import useTransactions from './useTransactions'

const Container = styled.View`
  flex: 1;
`

export default function Filter() {
  const {
    categoriesFilter,
    selectedCategoriesIds,
    fromDate,
    toDate,
    series,
    receipts,
    imported,

    toggleCategory,
    selectOnlyCategory,
    setDateRange,
    pickFromDate,
    pickToDate,
    adjustIsPlannedFilter,
    adjustHaveAttachedBillFilter,
    adjustImportFilter
  } = useTransactions()
  const { t } = useTranslation()

  return (
    <Container>
      {/* <List.Item
        onPress={pickFromDate}
        title={t('pages.transactions.filter.location.title')}
        description={'all'}
        left={props => <List.Icon {...props} icon="google-maps" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      /> */}
      <List.Item
        onPress={adjustHaveAttachedBillFilter}
        title={t('pages.transactions.filter.bill.title')}
        description={t(`pages.transactions.filter.bill.value.${receipts}`)}
        left={props => <List.Icon {...props} icon="attachment" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
      <List.Item
        onPress={adjustIsPlannedFilter}
        title={t('pages.transactions.filter.repeating.title')}
        description={t(`pages.transactions.filter.repeating.value.${series}`)}
        left={props => <List.Icon {...props} icon="repeat" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
      <List.Item
        onPress={adjustImportFilter}
        title={t('pages.transactions.filter.import.title')}
        description={t(`pages.transactions.filter.import.value.${imported}`)}
        left={props => <List.Icon {...props} icon="database-import" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
      <ListHeaderTitle>{t('pages.transactions.filter.date_range.title')}</ListHeaderTitle>
      <DateRangeFilter setDateRange={setDateRange} />
      <List.Item
        onPress={pickFromDate}
        title={t('pages.transactions.filter.date_range.from_date')}
        description={fromDate?.format('YYYY-MM-DD')}
        left={props => <List.Icon {...props} icon="calendar-arrow-right" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
      <List.Item
        onPress={pickToDate}
        title={t('pages.transactions.filter.date_range.to_date')}
        description={toDate?.format('YYYY-MM-DD')}
        left={props => <List.Icon {...props} icon="calendar-arrow-left" />}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
      <ListHeaderTitle>{t('pages.transactions.filter.categories.title')}</ListHeaderTitle>
      <CategoryFilter
        toggleCategory={toggleCategory}
        selectOnlyCategory={selectOnlyCategory}
        options={categoriesFilter}
        selectedCategoriesIds={selectedCategoriesIds}
      />
    </Container>
  )
}