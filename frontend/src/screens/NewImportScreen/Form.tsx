import React from 'react'
import styled from 'styled-components/native'
import { useTranslation } from 'react-i18next'
import { List } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import CategoryIcon from '../../components/CategoryIcon'
import Container from './Container'
import RowPicker from './RowPicker'
import useEditImport from './useEditImport'

const Icon = styled(CategoryIcon)`
  margin-top: 6px;
  margin-bottom: 0px;
`

export default function Form() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const {
    amountColumnOption,
    notesColumnOption,
    dateColumnOption,
    fromLine,
    toLine,
    delimiter,
    encoding,
    category,

    setFromLine,
    setToLine,
    pickDelimiter,
    pickEncoding,
    pickCategory,
    pickAmountColumn,
    pickNotesColumn,
    pickDateColumn
  } = useEditImport()

  return (
    <React.Fragment>
      <Container>
        <RowPicker
          icon="table-row-plus-before"
          title={t('pages.new_import.form.from_line')}
          value={fromLine}
          onValueUpdated={setFromLine} />
        <RowPicker
          icon="table-row-plus-after"
          title={t('pages.new_import.form.to_line')}
          value={toLine}
          onValueUpdated={setToLine} />
        <List.Item
          onPress={pickDelimiter}
          title={t('pages.new_import.form.delimiter')}
          description={delimiter ? delimiter : 'Auto'}
          left={() => <List.Icon color={colors.text} icon="file-delimited" />}/>
        <List.Item
          onPress={pickEncoding}
          title={t('pages.new_import.form.encoding')}
          description={encoding}
          left={() => <List.Icon color={colors.text} icon="code-parentheses-box" />}/>
      </Container>
      <Container>
        <List.Item
          onPress={pickCategory}
          title={t('pages.new_import.form.category')}
          description={category?.name}
          left={() => <List.Icon color={colors.text} icon="folder" />}
          right={() => category && <Icon name={category.icon} size={48} color={category.color} />}/>
        <List.Item
          onPress={pickAmountColumn}
          title={t('pages.new_import.form.columns.amount')}
          description={amountColumnOption}
          left={() => <List.Icon color={colors.text} icon="currency-usd" />}/>
        <List.Item
          onPress={pickNotesColumn}
          title={t('pages.new_import.form.columns.notes')}
          description={notesColumnOption}
          left={() => <List.Icon color={colors.text} icon="file-document" />}/>
        <List.Item
          onPress={pickDateColumn}
          title={t('pages.new_import.form.columns.date')}
          description={dateColumnOption}
          left={() => <List.Icon color={colors.text} icon="calendar" />}/>
      </Container>
    </React.Fragment>
  )
}