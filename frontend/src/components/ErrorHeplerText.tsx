import React from 'react'
import { HelperText } from 'react-native-paper'

interface IErrorHelerTextProps {
  error?: Error | string;
}

/**
 * Display error text if graphql error is present or result returns errors
 * @param props
 */
export default function ErrorHelperText({ error } : IErrorHelerTextProps) {
  if (error) {
    return <HelperText type="error">{error}</HelperText>
  } else {
    return null
  }
}