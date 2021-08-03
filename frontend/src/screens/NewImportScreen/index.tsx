import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-navigation'
import { useIsFocused } from 'react-navigation-hooks'
import styled, { useTheme } from 'styled-components/native'

import WideContainer from '../../components/layout/WideContainer'
import FullPageLoader from '../../components/layout/FullPageLoader'
import Desktop from '../../components/responsive/Desktop'
import Mobile from '../../components/responsive/Mobile'
import Fab from '../../components/Fab'
import ErrorMessageContent from '../../components/ErrorMessageContent'
import { useDefaultScreenBar } from '../../helpers/useSetNavBarColor'

import useEditImport from './useEditImport'
import Form from './Form'
import Table from './Table'
import Header from './Header'

const Columns = styled.View`
  flex-direction: row;
  flex: 1;
`

const Content = styled.ScrollView`
  flex: 1;
  padding: 10px 0px 10px 10px;
`

const Sidebar = styled(ScrollView)`
  min-width: 300px;
  width: 30%;
  padding: 10px;
  max-width: 400px;
`

export default function NewImportScreen({ navigation }) {
  const { t } = useTranslation()
  const {
    loading,
    notFound,

    save,
    load,
    clear
  } = useEditImport()

  const isFocused = useIsFocused()
  const importId = navigation.getParam('importId')

  useEffect(() => {
    if (isFocused) {
      load(importId)
    } else{
      clear()
    }
  }, [clear, load, importId, isFocused])

  useDefaultScreenBar()

  if (notFound) {
    return <ErrorMessageContent message={t('pages.new_import.not_found')} />
  }

  if (loading) {
    return <FullPageLoader />
  }

  return (
    <WideContainer>
      <Desktop>
        <Columns>
          <Content>
            <Table />
          </Content>
          <Sidebar>
            <Form />
          </Sidebar>
        </Columns>
      </Desktop>
      <Mobile>
        <ScrollView>
          <Form />
          <Table />
        </ScrollView>
      </Mobile>
      <Fab navbar icon="check" onPress={save} />
    </WideContainer>
  )
}

// @ts-ignore
NewImportScreen.navigationOptions = props => ({
  title: 'pages.new_import.title',
  header: (props) => <Header {...props} />
})