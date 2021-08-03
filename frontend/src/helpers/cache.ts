
//import { Asset } from 'react-native'
import { Image } from 'react-native'
//import * as Font from 'expo-font'

export function cacheImages(images : Array<string>) {
  return images.map(image => (Image.prefetch(image)));
}

export function cacheFonts(fonts : Array<any>) {
  return [] //fonts.map(font => Font.loadAsync(font));
}