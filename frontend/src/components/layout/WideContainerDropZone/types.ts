import { IWideContainerProps } from '../WideContainer'

export interface IDropZoneProps extends IWideContainerProps {
  onDrop(files : Array<File>)
}