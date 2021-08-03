import { HeaderProps } from 'react-navigation-stack'

interface IAppHeaderPropBase {
  topLevel?: boolean
  children?: any
  title?: string
  hideTitle?: boolean
  tabs?: boolean
  forceShowHeader?: boolean
}

export type AppHeaderProp = IAppHeaderPropBase & HeaderProps