import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'react-navigation-hooks'
import { TextInput, List, Surface, Switch, Subheading } from 'react-native-paper'
import styled, { useTheme } from 'styled-components/native'

import { useStoreData } from '../stores'
import WideContainer from './layout/WideContainer'
import ErrorMessageContent from './ErrorMessageContent'
import FullPageLoader from './layout/FullPageLoader'
import CenteredScroll from './CenteredScroll'
import CategoryIcon from './CategoryIcon'
import OverlayProgress from './OverlayProgress'
import Fab from './Fab'

const InputGroup = styled.View`
  margin-bottom: 10px;
`

const Icon = styled(CategoryIcon)`
  margin-top: 6px;
  margin-bottom: 0px;
`

const OptionSwitch = styled(Switch)`
  align-self: center;
`

const Form = styled(Surface)`
  background: ${({ theme }) => theme.headerBackground};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '16px' : '0px'};
  overflow: hidden;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
`

const HeadlineContainer = styled.View`
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
  text-align: center;
  padding: 20px 25px 10px 25px;
`

function useEditCategory() {
  return useStoreData(({ screens: { editCategory } }) => ({
    currency: editCategory.currency,
    shared: editCategory.shared,
    notFound: editCategory.notFound,
    disabled: editCategory.disabled,
    icon: editCategory.icon,
    name: editCategory.name,
    color: editCategory.color,
    loading: editCategory.isLoading,
    saving: editCategory.isSaving,
    archived: editCategory.archived,
    isNewRecord: editCategory.isNewRecord,

    save: editCategory.save,
    setShared: editCategory.setShared,
    setArchived: editCategory.setArchived,
    setName: editCategory.setName,
    pickCurrency: editCategory.pickCurrency,
    pickIcon: editCategory.pickIcon
  }))
}

export default function EditCategoryScreen() {
  const {
    isNewRecord,
    currency,
    icon,
    color,
    name,
    loading,
    disabled,
    shared,
    saving,
    notFound,
    archived,

    pickCurrency,
    setShared,
    setName,
    setArchived,
    pickIcon,
    save
  } = useEditCategory()

  const navigation = useNavigation() as any
  const { t } = useTranslation()
  const { colors } = useTheme()

  const saveForm = useCallback(async () => {
    if (await save()) {
      navigation.pop()
    }
  }, [save, navigation])

  if (loading) {
    return <FullPageLoader />
  }

  if (notFound) {
    return <ErrorMessageContent message={t('pages.edit_category.not_found')} />
  }

  return (
    <WideContainer navbar>
      <CenteredScroll fab>
        {disabled && <HeadlineContainer>
          <Subheading>
            {t('pages.edit_category.system.about')}
          </Subheading>
        </HeadlineContainer>}
        <Form>
          <InputGroup>
            <TextInput
              label={t('pages.edit_category.form.name')}
              value={name}
              disabled={disabled}
              onChangeText={setName}/>
          </InputGroup>

          <List.Item
            disabled={disabled}
            onPress={() => pickCurrency()}
            title={t('pages.edit_category.form.currency')}
            description={currency?.name || t('pages.edit_category.form.system_currency')}
            left={() => <List.Icon color={colors.text} icon="currency-usd" />}/>

          <List.Item
            disabled={disabled}
            onPress={() => pickIcon()}
            title={t('pages.edit_category.form.icon')}
            description={t('pages.edit_category.form.icon_about')}
            left={() => <List.Icon color={colors.text} icon="folder" />}
            right={() => icon && <Icon name={icon} size={48} color={color} />}/>
        </Form>
        <Form>
          <List.Item
            title={t('pages.edit_category.form.shared')}
            description={t('pages.edit_category.form.shared_about')}
            left={() => <List.Icon color={colors.text} icon="share-variant" />}
            right={(props) => <OptionSwitch value={shared} onValueChange={() => setShared(!shared)} {...props} />} />
          {!isNewRecord && <List.Item
            title={t('pages.edit_category.form.archived')}
            description={t('pages.edit_category.form.archived_about')}
            left={() => <List.Icon color={colors.text} icon="archive" />}
            right={(props) => <OptionSwitch disabled={disabled} value={archived} onValueChange={() => setArchived(!archived)} {...props} />} />}
        </Form>
      </CenteredScroll>
      <Fab loading={saving} navbar form icon="check" onPress={saveForm} />
    </WideContainer>
  )
}