import { NativeModules } from 'react-native'
import { IReceiveFileModule } from './ReceiveFileModule.web'

export const ReceiveFileModule = NativeModules.ReceiveFileModule as IReceiveFileModule