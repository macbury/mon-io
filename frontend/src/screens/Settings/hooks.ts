import { useStoreData } from '../../stores'

export function useSettings() {
  return useStoreData(({ settings }) => ({
    themeMode: settings.themeMode,
    loading: settings.isLoading,
    mainCurrency: settings.mainCurrency,
    quickLoginUrl: settings.quickLoginUrl,
    downloadBackupUrl: settings.downloadBackupUrl,
    downloadApkUrl: settings.downloadApkUrl,
    refreshQuickLoginToken: settings.refreshQuickLoginToken,
    changeThemeMode: settings.changeThemeMode
  }))
}

export function useSession() {
  return useStoreData(({ session }) => ({
    logout: session.signOut,
    loggingOut: session.isSaving,
    accessToken: session.accessToken
  }))
}

export function useAbout() {
  return useStoreData(({ about }) => ({
    clientVersion: about.clientVersion,
    serverVersion: about.serverVersion,
    serverCommitSha: about.serverCommitSha,
    clientCommitSha: about.clientCommitSha,
  }))
}

