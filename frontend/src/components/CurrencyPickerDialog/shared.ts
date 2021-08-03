import React, { useMemo } from 'react'
import FuzzySearch from 'fuzzy-search'
import { useTranslation } from 'react-i18next'
import { Currency } from '../../api/graphql'

export interface IOnCurrencySelect {
  onCurrencySelect(currency : Currency)
}

export interface IListProps extends IOnCurrencySelect {
  currencies: Currency[]
  selectedCurrency: Currency
  usedCurrencies: Currency[]
  query: string
}

export function useSearchableCurrency(usedCurrencies : Currency[], currencies : Currency[], query : string) {
  const { t } = useTranslation()

  const searcher = useMemo(() => (
    new FuzzySearch(currencies, ['isoCode', 'name', 'symbol'], {
      caseSensitive: false
    })
  ), [currencies])

  return useMemo(() => {
    if (query.length > 0) {
      return [
        {
          title: t('dialogs.currency.filtered'),
          data: searcher.search(query)
        }
      ]
    } else {
      return [
        {
          title: t('dialogs.currency.used'),
          data: usedCurrencies
        },
        {
          title: t('dialogs.currency.all'),
          data: currencies
        }
      ]
    }
  }, [query, currencies])
}