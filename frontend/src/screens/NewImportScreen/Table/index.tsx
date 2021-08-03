import React, { useMemo } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import Container from '../Container'
import useEditImport from '../useEditImport'

import {
  useColumnStyle,
  ColumnRowTitle,
  CellRow
} from './styles'

function Header({ columns }) {
  const headerStyle = useColumnStyle(columns)

  return (
    <DataTable.Header>
      {columns.map((name) => <DataTable.Title style={headerStyle} key={name}>{name}</DataTable.Title>)}
    </DataTable.Header>
  )
}

function Pagination() {
  const {
    currentPage,
    numberOfPages,
    setCurrentPage
  } = useEditImport()

  return (
    <DataTable.Pagination
      page={currentPage}
      numberOfPages={numberOfPages}
      onPageChange={setCurrentPage}
      label={`${currentPage+1}/${numberOfPages}`}
    />
  )
}

export default function TransactionTable() {
  const theme = useTheme()

  const {
    header,
    fromLine,
    currentPageRows
  } = useEditImport()

  const headerStyle = useColumnStyle(header)

  const items = useMemo(() => currentPageRows.map((item, index) => (
    <DataTable.Row key={index}>
      {item.map((column, index) => <DataTable.Cell style={headerStyle} key={index}>{column}</DataTable.Cell>)}
    </DataTable.Row>
  )), [currentPageRows, theme, headerStyle])

  return (
    <Container>
      <DataTable>
        <Header columns={header} />
        {items}
        <Pagination />
      </DataTable>
    </Container>
  )
}