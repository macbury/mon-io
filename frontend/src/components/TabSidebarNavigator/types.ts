
import {
  NavigationProp,
  NavigationRoute,
  NavigationDescriptor,
  NavigationParams,
  NavigationState,
  NavigationScreenProp
} from 'react-navigation';
import React from 'react'

export type NavigationTabState = NavigationState;

export type NavigationTabProp<
  State = NavigationRoute,
  Params = NavigationParams
> = NavigationScreenProp<State, Params> & {
  jumpTo(routeName: string, key?: string): void;
};


export type NavigationMaterialBottomTabOptions = {
  title?: string;
  tabBarLabel?: React.ReactNode;
  tabBarBadge?: boolean | number | string;
  tabBarVisible?: boolean;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
  tabBarColor?: string;
  tabBarIcon?:
    | React.ReactNode
    | ((props: {
        focused: boolean;
        tintColor?: string;
        horizontal?: boolean;
      }) => React.ReactNode);
  tabBarOnPress?: (props: {
    navigation: NavigationTabProp;
    defaultHandler: () => void;
  }) => void;
};

export type NavigationViewProps = {
  navigation: NavigationProp<NavigationTabState>;
  descriptors: {
    [key: string]: NavigationDescriptor;
  };
  screenProps?: unknown;
  navigationConfig: any;
  getLabelText: (props: { route: NavigationRoute }) => string | undefined;
  getAccessibilityLabel: (props: {
    route: NavigationRoute;
  }) => string | undefined;
  getTestID: (props: { route: NavigationRoute }) => string | undefined;
  renderScene: (props: { route: NavigationRoute }) => React.ReactNode;
  onIndexChange: (index: number) => void;
  onTabPress: (props: { route: NavigationRoute }) => void;
};

export interface INavProps {
  route: NavigationRoute,
  descriptors: {
    [key: string]: NavigationDescriptor;
  };
  children: React.ReactNode,
  onTabPress: (route : NavigationRoute) => any
}