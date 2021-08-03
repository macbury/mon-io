export interface IReceiveFileModule {
  /**
   * Check if there is any shared file with the application. Returns file uri in the promise
   * @return files uris
   */
  getSharedFile() : Promise<string[]>
  askForFile(type: string)
}

export const ReceiveFileModule : IReceiveFileModule = {
  getSharedFile: async () => { return [] },
  askForFile: (type: string) => null
}
