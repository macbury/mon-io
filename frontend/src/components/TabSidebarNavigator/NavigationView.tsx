import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { View } from 'react-native'
import { SceneView, StackActions, NavigationActions, NavigationRoute, NavigationParams } from 'react-navigation'

import { NavigationViewProps } from './types'

import BottomTabs from './BottomTabs'
import SidebarTabs from './SidebarTabs'
import Mobile from '../responsive/Mobile'
import Desktop from '../responsive/Desktop'

function TabSceneView({ descriptor, screenProps, current }) {
  const TabComponent = descriptor.getComponent()

  if (!current) {
    return null
  }

  return (
    <View style={{ flex: 1, display: current ? 'flex' : 'none' }}>
      <SceneView
        screenProps={screenProps}
        navigation={descriptor.navigation}
        component={TabComponent} />
    </View>
  )
}

export default function NavigationView(props : NavigationViewProps) {
  const { navigation: { state: { routes, index } }, descriptors, screenProps } = props
  const currentRoute = routes[index]
  const [visitedRoutes, setVisitedRoutes] = useState<string[]>([currentRoute?.key])

  useEffect(() => {
    if (currentRoute && visitedRoutes.indexOf(currentRoute.key) === -1) {
      setVisitedRoutes([
        ...visitedRoutes,
        currentRoute.key
      ])
    }
  }, [currentRoute, setVisitedRoutes, visitedRoutes])

  const scenes = useMemo(() => (visitedRoutes.map((routeKey) => (
    <TabSceneView
      descriptor={descriptors[routeKey]}
      screenProps={screenProps}
      key={routeKey}
      current={currentRoute.key === routeKey} />
  ))), [currentRoute, visitedRoutes, screenProps, descriptors])

  const navigateToRoute = useCallback((route : NavigationRoute<NavigationParams>) => {
    const descriptor = descriptors[route.key]
    const { navigation } = descriptor


    if (navigation.isFocused()) {
      if (route.hasOwnProperty('index') && route.index > 0) {
        // If current tab has a nested navigator, pop to top
        navigation.dispatch(StackActions.popToTop({ key: route.key }));
      } else {
        // @ts-ignore
        navigation.emit('refocus');
      }
    } else {
      navigation.dispatch(
        NavigationActions.navigate({
          routeName: route.routeName,
          key: navigation.state.key,
        })
      );
    }
  }, [descriptors])

  return (
    <React.Fragment>
      <Desktop>
        <SidebarTabs route={currentRoute} descriptors={descriptors} onTabPress={navigateToRoute}>
          {scenes}
        </SidebarTabs>
      </Desktop>

      <Mobile>
        <BottomTabs route={currentRoute} descriptors={descriptors} onTabPress={navigateToRoute}>
          {scenes}
        </BottomTabs>
      </Mobile>
    </React.Fragment>
  )
}
