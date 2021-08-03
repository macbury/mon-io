import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Moment } from 'moment'
import { useMediaQuery } from 'react-responsive'

import TransactionMetadataStore from '../../stores/TransactionMetadataStore'
import Desktop from '../responsive/Desktop'
import BottomScroll from '../layout/BottomScroll'
import PlacePreview from '../PlacePreview'
import CategorySelect from './CategorySelect'
import Amount from './Amount'
import Metadata from './Metadata'
import Calculator, { TDialogMode } from './Calculator'
import SelectedDate from './SelectedDate'
import SeriesDate from './SeriesDate'
import TransactionDateDialog from '../TransactionDateDialog'
import SeriesConfigurationDialog from '../SeriesConfigurationDialog'

import {
  Series,
  Location,
  Category,
  Currency,
  TransactionCategoryKind,
  Recurrence
} from '../../api/graphql'

interface IResponsiveContainer {
  isDesktop?: boolean
  isExpanded?: boolean
}

export interface ITransactionFormProps {
  hasOperation: boolean
  primaryColor: string
  valid: boolean
  expanded?: boolean
  children?: any
  location: Location
  category: Category
  recurrence: Recurrence
  amount : number | string
  currency : Currency
  transactionType: TransactionCategoryKind
  notes: string
  selectedDate: Moment
  recurrenceEndAt?: Moment
  isNewRecord: boolean
  series: Series
  mode: TDialogMode
  metadata: TransactionMetadataStore

  setAmount(amount : string)
  changeCategory()
  setRecurrence(newRecurrence: Recurrence)
  setDate(newDate : Moment)
  setRecurrenceEndAt?(newDate: Moment)
  changeCurrency()
  onSumOrAcceptPress()
  pushDigit(char : any)
  pushOperator(char : any)
  backspace()
  calculate()
}

const FormContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const LeftContainer = styled(Desktop)`
  flex: 1;
  flex-grow: 1;
`

const CalculatorScroll = styled(BottomScroll)`
  flex: 1;
  max-width: ${({ isExpanded } : IResponsiveContainer) => isExpanded ? '600px' : 'auto'};
`

const CalculatorInner = styled.View`
  padding: 0px 10px;
  width: ${({ isDesktop } : IResponsiveContainer) => isDesktop ? '600px' : 'auto'};
  margin: ${({ isDesktop, isExpanded } : IResponsiveContainer) => isDesktop && !isExpanded ? '0 auto' : '0'};
  min-width: 320px;
  flex-direction: column;
  flex: 1;
  padding-bottom: ${({ theme }) => theme.insets.bottom}px;
`

export default function TransactionForm(props : ITransactionFormProps) {
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 800 })

  const {
    primaryColor,
    hasOperation,
    expanded,
    children,
    category,
    location,
    amount,
    transactionType,
    currency,
    metadata,
    selectedDate,
    recurrence,
    isNewRecord,
    series,
    valid,
    mode,
    recurrenceEndAt,

    setRecurrenceEndAt,
    setRecurrence,
    setDate,
    changeCategory,
    changeCurrency,
    onSumOrAcceptPress,
    pushDigit,
    pushOperator,
    backspace,
    setAmount,
    calculate
  } = props

  return (
    <React.Fragment>
      {
        mode !== "series" &&
        <TransactionDateDialog
          series={series}
          isNewRecord={isNewRecord}
          recurrence={recurrence}
          onChangeRecurrence={setRecurrence}
          onChangeDate={setDate}
          selectedDate={selectedDate}
          visible={datePickerVisible}
          onDismiss={() => setDatePickerVisible(false)} />
      }
      {
        mode === "series" &&
        <SeriesConfigurationDialog
          series={series}
          recurrenceEndAt={recurrenceEndAt}
          recurrence={recurrence}
          onChangeRecurrence={setRecurrence}
          onChangeDate={setDate}
          onChangeEndDate={setRecurrenceEndAt}
          selectedDate={selectedDate}
          visible={datePickerVisible}
          onDismiss={() => setDatePickerVisible(false)} />
      }
      <FormContainer>
        {children && <LeftContainer>
          {children}
        </LeftContainer>}
        <CalculatorScroll
          isExpanded={expanded}>
          <CalculatorInner isDesktop={isDesktop} isExpanded={expanded}>
            <PlacePreview
              category={category}
              location={location} />
            <CategorySelect
              category={category}
              onPress={changeCategory} />
            <Amount
              onBeginChange={calculate}
              onChangeAmount={setAmount}
              amount={amount}
              currency={currency}
              type={transactionType} />
            <Metadata metadata={metadata} />
            <Calculator
              primaryColor={primaryColor}
              valid={valid}
              currency={currency}
              hasOperation={hasOperation}
              mode={mode}
              onSumOrAcceptPress={onSumOrAcceptPress}
              onDigitPress={pushDigit}
              onBackspacePress={backspace}
              onChangeCurrencyPress={changeCurrency}
              onDatePickerPress={() => setDatePickerVisible(true)}
              onOperatorPress={pushOperator} />
            {
              mode !== "series" && <SelectedDate
                onPress={() => setDatePickerVisible(true)}
                recurrence={recurrence}
                date={selectedDate} />
            }
            {
              mode === "series" && <SeriesDate
                onPress={() => setDatePickerVisible(true)}
                recurrence={recurrence}
                endAt={recurrenceEndAt}
                selectedDate={selectedDate} />
            }
          </CalculatorInner>
        </CalculatorScroll>
      </FormContainer>
    </React.Fragment>
  )
}