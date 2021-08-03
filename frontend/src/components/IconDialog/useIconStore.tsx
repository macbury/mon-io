import { useStoreData } from '../../stores'

export default function useIconStore() {
  return useStoreData(({ ui: { iconDialog } }) => ({
    color: iconDialog.color,
    name: iconDialog.name,
    visible: iconDialog.visible,

    ok: iconDialog.ok,
    cancel: iconDialog.cancel,
    setIcon: iconDialog.setIcon,
    setColor: iconDialog.setColor
  }))
}