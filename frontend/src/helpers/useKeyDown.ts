import { useEffect, useCallback } from 'react'

export default function useKeyDown(callback : (key : string) => void) {
  const onKeyDown = useCallback((e : KeyboardEvent) => {
    e.preventDefault()
    callback(e.key)
  }, [callback])

  return useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
}