import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

interface INotesFieldProps {
  value: string;
  onChange(newValue : string)
}

const TextInput = styled.TextInput`
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  border: 1px solid ${(props) => props.theme.itemBorderColor};
  background-color: ${(props) => props.theme.calculatorAltBackground};
  padding: 10px;
  font-size: 14px;
`

export default function NotesField({ value, onChange } : INotesFieldProps) {
  const theme = useTheme()

  return (
    <KeyboardAvoidingView>
      <TextInput
        placeholderTextColor={theme.colors.placeholder}
        placeholder="Notes"
        onChangeText={onChange}
        value={value} />
    </KeyboardAvoidingView>
  )
}