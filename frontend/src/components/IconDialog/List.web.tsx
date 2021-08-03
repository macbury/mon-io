import React, { useCallback } from 'react'
import { Grid, AutoSizer } from 'react-virtualized'
import Cell from './Cell'
import { IListProps } from './types'

const COLUMNS = 6

export default function IconList({ query, icons, selected, onIconSelected, ...props } : IListProps) {
  const renderItem = useCallback(({ columnIndex, rowIndex, style, key }) => {
    const name = icons[rowIndex * COLUMNS + columnIndex]

    return (
      <div key={key} style={style}>
        <Cell name={name} onIconSelected={onIconSelected} selected={selected === name} />
      </div>
    )
  }, [icons, selected, onIconSelected])

  return (
    <AutoSizer>
      {(size) => (
        <Grid
          {...size}
          data={icons}
          extraData={[query, selected]}
          columnCount={COLUMNS}
          rowCount={icons.length / COLUMNS}
          columnWidth={size.width / COLUMNS - 2}
          rowHeight={size.width/COLUMNS}
          cellRenderer={renderItem}
        />
      )}
    </AutoSizer>
  )
}