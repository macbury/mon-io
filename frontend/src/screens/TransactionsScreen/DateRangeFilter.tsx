import React, { useMemo } from 'react'
import moment, { Moment } from 'moment-timezone'
import { Button } from 'react-native-paper'
import styled from 'styled-components/native'

const FilterDate = styled.View`
  flex-direction: row;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.headerBorderColor};
`

export interface IDateRangeFilterProps {
  setDateRange(fromDate: Moment, toDate: Moment)
}

export default function DateRangeFilter({ setDateRange, ...props } : IDateRangeFilterProps) {
  const filter = useMemo(() => ({
    filterToday: () => setDateRange(moment(), moment()),
    filterLastMonth: () => setDateRange(moment().subtract(1, 'month'), moment()),
    filterLastThreeMonths: () => setDateRange(moment().subtract(3, 'month'), moment()),
    filterLastSixMonths: () => setDateRange(moment().subtract(6, 'month'), moment()),
    filterLastYear: () => setDateRange(moment().subtract(1, 'year'), moment()),
    filterLastThreeYears: () => setDateRange(moment().subtract(3, 'year'), moment()),
    filterAll: () => setDateRange(moment().subtract(30, 'year'), moment())
  }), [setDateRange])

  return (
    <FilterDate {...props}>
      <Button mode="text" onPress={filter.filterToday}>
        1D
      </Button>
      <Button mode="text" onPress={filter.filterLastMonth}>
        1M
      </Button>
      <Button mode="text" onPress={filter.filterLastThreeMonths}>
        3M
      </Button>
      <Button mode="text" onPress={filter.filterLastSixMonths}>
        6M
      </Button>
      <Button mode="text" onPress={filter.filterLastYear}>
        1Y
      </Button>
      <Button mode="text" onPress={filter.filterLastThreeYears}>
        3Y
      </Button>
      <Button mode="text" onPress={filter.filterAll}>
        All
      </Button>
    </FilterDate>
  )
}