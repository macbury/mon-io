import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'
import App from './src/App'

console.disableYellowBox = true // I prefer warning in console not in fucking ui

AppRegistry.registerHeadlessTask('SyncUploadReceiptsService', () => require('./src/services/SyncUploadReceiptsService'));
AppRegistry.registerHeadlessTask('CheckUpdateTask', () => require('./src/services/CheckUpdateTask'));
AppRegistry.registerComponent(appName, () => App)
