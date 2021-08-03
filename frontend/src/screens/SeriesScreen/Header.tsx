import React, { useState, useCallback } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components/native'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'
import { Menu } from 'react-native-paper'
import DateNavigationHeader from '../../components/layout/DateNavigationHeader'
import AppHeader from '../../components/layout/AppHeader'
import Mobile from '../../components/responsive/Mobile'
import Desktop from '../../components/responsive/Desktop'
import MenuActionButton from '../../components/MenuActionButton'
import { seriesPath } from '../../helpers/urls'
import { useSeriesStore } from './hooks'


export default function SeriesScreenHeader(props) {
  const { device } = useTheme()
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const {
    currentDate,
    showCalendarUrl,
    reload
  } = useSeriesStore()

  const { navigation } = props

  const hideMenu = useCallback(() => setVisible(false), [setVisible])
  const showMenu = useCallback(() => setVisible(true), [setVisible])

  const shareCalendarOption = useCallback(() => {
    showCalendarUrl()
    hideMenu()
  }, [hideMenu, showCalendarUrl])

  const refreshOption = useCallback(() => {
    reload()
    hideMenu()
  }, [hideMenu, reload])

  const goToToday = useCallback(() => {
    const today = moment()
    navigation.navigate(seriesPath(today))
  }, [navigation])

  const goToDateAction = useCallback((date) => seriesPath(date), [navigation])

  const anchor = <MenuActionButton icon="dots-vertical" onPress={showMenu} />

  const Header = device === 'desktop' ? AppHeader : DateNavigationHeader

  return (
    <Header
      active={false}
      onChangeDate={goToDateAction}
      currentDate={currentDate}
      title={t('pages.series.title')}
      {...props}>
      <MenuActionButton icon="calendar" onPress={goToToday} />
      <Desktop>
        <MenuActionButton icon="refresh" onPress={refreshOption} />
      </Desktop>
      <Mobile>
        <Menu onDismiss={hideMenu} visible={visible} anchor={anchor} style={{ marginTop: StatusBar.currentHeight }}>
          <Menu.Item icon="calendar-sync" title={t('pages.series.menu.get_calendar_url')} onPress={shareCalendarOption} />
          <Menu.Item icon="refresh" title={t('pages.series.menu.refresh')} onPress={refreshOption} />
        </Menu>
      </Mobile>
    </Header>
  )
}