import React from 'react'
import Pdf from 'react-native-pdf'
import styled from 'styled-components/native'
import { IPreviewPdfProps } from './types'

const PdfContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`

const StyledPdf = styled(Pdf)`
  flex: 1;
  height: 100%;
  width: 100%;
`

export default function PreviewPdf(props : IPreviewPdfProps) {
  const { 
    fileUrl: {
      url: uri,
      httpHeaders: headers
    } 
  } = props
  return (
    <PdfContainer>
      <StyledPdf source={{ uri, headers }} />
    </PdfContainer>
  )
}