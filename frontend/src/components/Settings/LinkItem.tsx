import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { List, Text } from 'react-native-paper'
import { NavigationNavigateAction, NavigationInjectedProps } from 'react-navigation'

interface ILinkItemProps {
  title: string;
  description?: string;
  action: NavigationNavigateAction;
  icon: string;
}

export default function LinkItem({ title, icon, action, description } : ILinkItemProps) {
  const navigation = useNavigation()

  return (
    <List.Item
      title={title}
      description={description}
      onPress={() => navigation.navigate(action)}
      left={props => <List.Icon {...props} icon={icon} />}
      right={props => <List.Icon {...props} icon="chevron-right" />}
    />
  )
}
