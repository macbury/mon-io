import { DefaultTheme } from 'styled-components/native'

export type RouteFactory = (theme : DefaultTheme, i18n, isSignedIn: boolean) => any