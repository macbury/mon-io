import { AppHeaderProp } from './types'

export function getTitleFromNavigation(props : AppHeaderProp) : string {
  let title = props.title
  if (!title) {
    title = props.scene?.descriptor?.options?.title
  }
  return title
}