export async function getDeviceName() : Promise<String> {
  return window.navigator.userAgent
}