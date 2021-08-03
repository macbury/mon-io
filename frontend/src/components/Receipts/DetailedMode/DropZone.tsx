import React, { useRef, useCallback } from 'react'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import styled from 'styled-components/native'

const DropZoneContainer = styled(TouchableRipple)`
  display: flex;
  flex-direction: column;
  opacity: 0.6;
  border: 4px;
  border-radius: 10px;
  border-style: dashed;
  cursor: pointer;
  border-color: ${({ theme }) => theme.headerBorderColor};
  margin: 20px 20px 0px 20px;
`

const DropZoneText = styled(Text)`
  text-align: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  min-height: 120px;
  align-items: center;
  display: flex;
`

export interface IDropZoneProps {
  children: any;
  onFileSelect(file : Array<File>)
}

export default function DropZone({ children, onFileSelect } : IDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>()

  const selectFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [fileInputRef?.current])

  const onFileChange = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    onFileSelect([file]);
  }, [onFileSelect])

  return (
    <DropZoneContainer onPress={selectFile}>
      <View>
        <input
          type="file"
          ref={fileInputRef}
          style={{display: 'none'}}
          onChange={onFileChange}
        />

        <DropZoneText>{children}</DropZoneText>
      </View>
    </DropZoneContainer>
  )
}