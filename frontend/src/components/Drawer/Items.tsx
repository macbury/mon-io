import React from 'react'
import { receiptsPath, seriesPath, settingsPath, transactionsPath, chartsPath, mapPath, categoriesPath, importsPath } from '../../helpers/urls'
import Item from './Item'
import styled from 'styled-components/native'

export interface IDrawerItemsProps {
  collapsed?: boolean
  selected?: string
}

const Container = styled.View`
  padding: 5px 0px;
`

export default function Items({ collapsed, selected } : IDrawerItemsProps) {
  return (
    <Container>
      <Item
        selected={selected === 'receipts' || selected === 'summary' || selected === 'budget'}
        collapsed={collapsed}
        titleKey="pages.home.title"
        action={receiptsPath()}
        icon="home"
      />
      <Item
        selected={selected === 'charts'}
        collapsed={collapsed}
        titleKey="pages.charts.title"
        action={chartsPath()}
        icon="chart-pie"
      />
      <Item
        selected={selected === 'transactions'}
        collapsed={collapsed}
        titleKey="pages.transactions.title"
        action={transactionsPath()}
        icon="view-list"
      />
      <Item
        selected={selected === 'series'}
        collapsed={collapsed}
        titleKey="pages.series.title"
        action={seriesPath()}
        icon="repeat"
      />
      <Item
        selected={selected === 'categories'}
        collapsed={collapsed}
        titleKey="pages.categories.title"
        action={categoriesPath()}
        icon="tag"
      />
      <Item
        selected={selected === 'imports'}
        collapsed={collapsed}
        titleKey="pages.imports.title"
        action={importsPath()}
        icon="database-import"
      />

      <Item
        selected={selected === 'map'}
        collapsed={collapsed}
        titleKey="pages.map.title"
        action={mapPath()}
        icon="map"
      />

      <Item
        selected={selected === 'settings'}
        collapsed={collapsed}
        titleKey="pages.settings.title"
        action={settingsPath()}
        icon="cog"
      />
    </Container>
  )
}