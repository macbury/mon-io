import AsyncStorage from '@react-native-community/async-storage'
import { NativeModules, DeviceEventEmitter } from 'react-native'
import { Receipt } from '../api/graphql'

const STORAGE_KEY = "@monio/syncQueue/receipts"
const REFRESH_EVENT = '@monio/syncQueue/onRefresh'

interface ISyncUploadReceiptsModule {
  /**
   * Start background service that synces all receipts
   */
  sync()
}

export interface PendingReceipt {
  clientMutationId: string;
  createdAt: Date | string;
  categoryId?: string;
  location?: {
    lat: number;
    lng: number;
  }
  fileUri: string;
  error?: string;
}

type Receipts = Array<PendingReceipt>
type RefreshCallback = (newReceipt : Receipt) => void

export class SyncQueue {
  public subscribe(callback : RefreshCallback) {
    DeviceEventEmitter.addListener(REFRESH_EVENT, callback)
  }

  public emit(newReceipt : Receipt) {
    DeviceEventEmitter.emit(REFRESH_EVENT, newReceipt)
  }

  public async getSize() {
    return (await this.getAll()).length
  }

  public async getAll() : Promise<Receipts> {
    const value = await AsyncStorage.getItem(STORAGE_KEY)

    if (value) {
      return JSON.parse(value)
    } else {
      return []
    }
  }

  public async peek() : Promise<PendingReceipt> {
    const items = await this.getAll()
    return items[0]
  }

  public async update(receipt : PendingReceipt) {
    const items = (await this.getAll()).map((otherReceipt : PendingReceipt) => otherReceipt.clientMutationId === receipt.clientMutationId ? receipt : otherReceipt)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  public async remove(clientMutationId : string) {
    const existingItems = await this.getAll()
    const items = existingItems.filter((receipt : PendingReceipt) => receipt.clientMutationId !== clientMutationId)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  public async push(receipt : PendingReceipt) {
    const items = await this.getAll()
    items.push(receipt)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

export const SyncUploadReceiptsModule = NativeModules.SyncUploadReceiptsModule as ISyncUploadReceiptsModule