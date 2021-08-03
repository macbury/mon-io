import { ReactNode } from 'react'
import { NavigationNavigateAction } from 'react-navigation'

export default interface ILinkProps {
  action: NavigationNavigateAction;
  children?: any;
  ripple?: boolean;
  grow?: boolean;
  title?: string
  onLongPress?: () => void
}