import { useStoreData } from '../../stores'

export default function useMapBoxKey() {
  return useStoreData(({ settings: { mapBoxKey } }) => ({
    mapBoxKey
  }))
}