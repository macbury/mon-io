import React, { useMemo } from 'react'
import moment from 'moment-timezone'
import styled, { useTheme, DefaultTheme } from 'styled-components/native'

import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { NavigationNavigateAction } from 'react-navigation'

import { Transaction, Recurrence } from '../../api/graphql'
import CategoryIcon from '../CategoryIcon'
import Link from '../Link'
import Currency from '../Currency'
import { useItemActionSheet } from '../TransactionForm/EditMenu'
import { DetailsIcon, FaviconIcon, DETAILS_ICON_SIZE } from './DetailsIcons'

interface ITransactionItemProps {
  transaction: Transaction
  simple? : boolean
  style? : any
  action: NavigationNavigateAction
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  align-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(prop) => prop.theme.itemBorderColor};
  align-items: center;
`

const Details = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Icon = styled(CategoryIcon)`
  margin-bottom: 0px;
  margin-right: 15px;
`

interface ICategoryNameProps {
  theme: DefaultTheme
  color: string
}

const CategoryName = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: ${({ color } : ICategoryNameProps) => color};
`

const Date = styled(Text)`
  opacity: 0.4;
  margin-right: 10px;
`

const DetailsRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 3px;
`

const DetailsLocation = styled(Text)`
  margin-left: 5px;
`

const Notes = styled(Text)`
  font-style: italic;
  flex: 1;
`

function LinkToTransaction({ transaction, action, children, ...props }) {
  const showActionSheet = useItemActionSheet({ transaction })

  return (
    <Link ripple onLongPress={showActionSheet} action={action} {...props}>
      {children}
    </Link>
  )
}

function ContainerForTransaction({ children, ...props }) {
  return (
    <View {...props}>
      {children}
    </View>
  )
}

export default function TransactionItem({ transaction, simple, ...props } : ITransactionItemProps) {
  const theme = useTheme()
  const date = useMemo(() => (moment(transaction.date).format('Do MMM YYYY HH:MM')), [transaction.date])
  const { t } = useTranslation()

  const Wrapper = simple ? ContainerForTransaction : LinkToTransaction

  return (
    <Wrapper transaction={transaction} {...props}>
      <Container>
        <Icon
          simple={simple}
          name={transaction.category.icon}
          color={transaction.category.color}
          size={48} />
        <Details>
          <DetailsRow>
            <CategoryName color={transaction.category.color}>{transaction.category.name}</CategoryName>
            {transaction.location && <DetailsLocation numberOfLines={1} ellipsizeMode='head'>{t('pages.summary.transactions.item.at_location', { location: transaction.location.name })} <DetailsIcon name="map" color={theme.colors.text} size={DETAILS_ICON_SIZE} /></DetailsLocation>}
          </DetailsRow>

          <DetailsRow>
            <Date>{date}</Date>
            {transaction.receipt && <DetailsIcon name="attachment" color={theme.colors.text} size={DETAILS_ICON_SIZE} />}
            {transaction.recurrence !== Recurrence.None && <DetailsIcon name="repeat" color={theme.colors.text} size={DETAILS_ICON_SIZE} />}
            {transaction.category.shared && <DetailsIcon name="share-variant" color={theme.colors.text} size={DETAILS_ICON_SIZE} />}
            {transaction.import && <DetailsIcon name="database-import" color={theme.colors.text} size={DETAILS_ICON_SIZE} />}
            <FaviconIcon url={transaction?.link?.faviconUrl} />
            {transaction.notes.length > 0 && <Notes numberOfLines={1}><DetailsIcon name="note" color={theme.colors.text} size={DETAILS_ICON_SIZE} /> {transaction.notes}</Notes>}
          </DetailsRow>
        </Details>
        <Currency
          amount={transaction.amount}
          size={18} />
      </Container>
    </Wrapper>
  )
}