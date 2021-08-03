import { AppRegistry } from 'react-native'
import HotApp from './HotApp'


AppRegistry.registerComponent('App', () => HotApp)
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })