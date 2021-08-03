import { useMemo } from 'react'
import { DataTable } from 'react-native-paper'
import styled from 'styled-components/native'

export const ColumnRowTitle = styled(DataTable.Title)`
  max-width: 50px;
  min-width: 50px;
  padding-right: 10px;
  text-align: right;
  justify-content: flex-end;
`

export const CellRow = styled(DataTable.Cell)`
  max-width: 50px;
  min-width: 50px;
  padding-right: 10px;
  text-align: right;
  justify-content: flex-end;
`

export function useColumnStyle(header) {
  return useMemo(() => {
    const width = `${Math.round(100/header.length+1)}%`

    return {
      width,
      maxWidth: width
    }
  }, [header.length])
}