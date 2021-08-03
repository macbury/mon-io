import { useMemo } from 'react'
import { Money } from '../api/graphql'

export function formatMoney(money : Money, abs = false, round = false, minimumFractionDigits?: number) {
  if (!money) {
    return '-'
  }

  const amount = abs ? Math.abs(money.cents) : money.cents

  if (!minimumFractionDigits) {
    minimumFractionDigits = money.currency.subunitToUnit.toString().split('').length - 1
  }

  if (round) {
    return Math.round(amount / money.currency.subunitToUnit).toLocaleString(undefined, { minimumFractionDigits }) + ' ' + money.currency.symbol
  } else {
    return (amount / money.currency.subunitToUnit).toLocaleString(undefined, { minimumFractionDigits }) + ' ' + money.currency.symbol
  }
}

export function moneyParts(money : Money) {
  if (money && money.currency) {
    let [dollars, cents] = (money.cents / money.currency.subunitToUnit).toPrecision().split('.')
    if (!cents) {
      cents = '00'
    }
    if (cents.length == 1) {
      cents = `${cents}0`
    }
    return [parseInt(dollars), cents, money.currency.symbol]
  } else {
    return [0, 0, 'EUR']
  }
}

export function useFormatMoney(money : Money, abs = false, round = false, minimumFractionDigits?: number) {
  return useMemo(() => formatMoney(money, abs, round, minimumFractionDigits), [money, abs, round, minimumFractionDigits])
}

export function useMoneyParts(money : Money) {
  return useMemo(() => moneyParts(money), [money])
}