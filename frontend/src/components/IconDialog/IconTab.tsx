import React, { useState, useMemo } from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { Searchbar } from 'react-native-paper'
import FuzzySearch from 'fuzzy-search'
import List from './List'
import useIconStore from './useIconStore'

import MaterialCommunityIcons from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json'

const Icons = Object.keys(MaterialCommunityIcons)

const Container = styled.View`
  flex: 1;
`

const searcher = new FuzzySearch(Icons, [], {
  caseSensitive: false
})

export default function IconTab() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const {
    name,
    setIcon
  } = useIconStore()

  const icons = useMemo(() => {
    if (query.length > 0) {
      return searcher.search(query)
    } else {
      return Icons
    }
  }, [query])

  return (
    <Container>
      <Searchbar
        placeholder={t('dialogs.currency.search')}
        value={query}
        style={{ elevation: 0 }}
        onChangeText={setQuery} />
      <List
        query={query}
        icons={icons}
        selected={name}
        onIconSelected={setIcon} />
    </Container>
  )
}