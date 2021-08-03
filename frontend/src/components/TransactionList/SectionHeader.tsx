import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import Currency from '../Currency'
import TransactionPeriod from '../../stores/Screens/SummaryStore/TransactionPeriod'

const Container = styled.View`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  padding: 29px 10px 10px 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.headerBorderColor};
`
const HeaderTitle = styled(Text)`
  font-size: 20px;
  margin-right: 20px;
`

interface ISectionHeader {
  group : TransactionPeriod
}

export default function SectionHeader({ group: { label, length, amount, ...props } } : ISectionHeader) {
  const { t } = useTranslation()
  const headerText = useMemo(() => (`${t(label)} (${length})`), [label, length])
  return (
    <Container {...props}>
      <HeaderTitle numberOfLines={1}>
        {headerText}
      </HeaderTitle>
      <Currency amount={amount} size={16} />
    </Container>
  )
}