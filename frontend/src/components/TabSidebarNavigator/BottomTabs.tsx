import React, { useMemo, useState } from 'react'
import styled from 'styled-components/native'
import BottomTabItem from './BottomTabItem'
import { INavProps } from './types'

const TabContainer = styled.View`
  background: ${(props) => props.theme.headerBackground};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.headerBorderColor};
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SceneContainer = styled.View`
  flex: 1;
`

const Wrapper = styled.View`
  background: ${(props) => props.theme.headerBackground};
  padding-bottom: ${(props) => props.theme.insets.bottom}px;
`

const MIN_TAB_WIDTH = 96;
const MAX_TAB_WIDTH = 168;

export default function BottomTabs({ children, descriptors, route, onTabPress } : INavProps) {
  const [width, setWidth] = useState(0)
  // @ts-ignore
  const tabs = useMemo(() => Object.values(descriptors).filter(({ options: { inTabBar } }) => inTabBar).map(({ key, options: { title, tabBarIcon }, state }) => ({ key, title, tabBarIcon, state })), [descriptors])

  const currentDescriptor = Object.values(descriptors).find(({ state }) => state === route)
  const { options: { inTabBar } } = currentDescriptor as any

  const tabWidth = useMemo(() => {
    const maxTabWidth = tabs.length > 3 ? MIN_TAB_WIDTH : MAX_TAB_WIDTH
    return Math.min(width / tabs.length, maxTabWidth)
  }, [width, tabs.length])

  const items = tabs.map((item) => (
    <BottomTabItem {...item} tabWidth={tabWidth} current={item.state === route} onTabPress={() => onTabPress(item.state)} />
  ))

  return (
    <React.Fragment>
      <SceneContainer>
        {children}
      </SceneContainer>

      {inTabBar && <Wrapper>
        <TabContainer onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
          {items}
        </TabContainer>
      </Wrapper>}
    </React.Fragment>
  )
}