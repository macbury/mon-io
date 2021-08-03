import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, Portal, Button, Searchbar } from 'react-native-paper'
import styled from 'styled-components/native'
import { useStoreData } from '../../stores'
import List from './List'
import DialogContainer from '../DialogContainer'

const Container = styled(DialogContainer)`
  max-width: 400px;
  display: flex;
  align-self: center;
  flex-shrink: 1;
  margin-top: ${({ theme }) => theme.insets.top + 20}px;
  margin-bottom: ${({ theme }) => theme.insets.bottom + 20}px;
`

const ListContainer = styled.View`
  flex: 1;
  min-width: 320px;
  min-height: 300px;
`

const SearchContainer = styled.View`
  padding: 20px;
`

const Actions = styled(Dialog.Actions)`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
`

interface ICurrencyPickerDialogProps {
}

function useCurrencyPickerStore() {
  return useStoreData(({ ui: { currencyPicker } }) => ({
    currency: currencyPicker.selected,
    visible: currencyPicker.visible,
    usedCurrencies: currencyPicker.usedCurrencies,
    currencies: currencyPicker.currencies,
    success: currencyPicker.success,
    cancel: currencyPicker.cancel,
  }))
}

export default function CurrencyPickerDialog(props : ICurrencyPickerDialogProps) {
  const {
    visible,
    currency,
    usedCurrencies,
    currencies,
    cancel,
    success
  } = useCurrencyPickerStore()

  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  return (
    <Portal>
      <Container visible={visible} onDismiss={cancel}>
        <SearchContainer>
          <Searchbar
            placeholder={t('dialogs.currency.search')}
            value={query}
            style={{ elevation: 0 }}
            onChangeText={setQuery} />
        </SearchContainer>

        <ListContainer>
          <List
            onCurrencySelect={success}
            query={query}
            selectedCurrency={currency}
            usedCurrencies={usedCurrencies}
            currencies={currencies} />
        </ListContainer>

        <Actions>
          <Button onPress={cancel}>{t('dialogs.currency.cancel')}</Button>
        </Actions>
      </Container>
    </Portal>
  )
}