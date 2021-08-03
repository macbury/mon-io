import { NativeModules } from 'react-native'

export interface INotificationModule {
  showNotification(notificationId: number, title: string, description : string, extras: any)
  getIntentResults() : Promise<any[]>
}

export const NotificationModule = NativeModules.NotificationModule as INotificationModule