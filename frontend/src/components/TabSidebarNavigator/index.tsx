import { createNavigator, TabRouter } from 'react-navigation'
import NavigationView from './NavigationView'

export default function createTabSidebarNavigator(routes, config) {
  const router = TabRouter(routes, config as any);

  // TODO: don't have time to fix it right now
  // @ts-ignore
  return createNavigator(NavigationView, router, config as any);
}