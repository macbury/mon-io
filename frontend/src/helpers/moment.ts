import { useCallback } from 'react'
import moment from 'moment-timezone'
import { useStoreData } from '../stores'

export default function useMoment() {
  const { timezoneName } = useStoreData(({ settings }) => ({
    timezoneName: settings.timezoneName
  }))

  return useCallback((inp?: moment.MomentInput) => {
    return moment(inp).tz(timezoneName)
  }, [timezoneName])
}