import React, { useCallback, useState, useMemo } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import styled from 'styled-components/native'
import FullPageLoader from '../layout/FullPageLoader'

import { IPreviewPdfProps } from './types'

const PagesContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ScrollContainer = styled.ScrollView`
  flex: 1;
`

export default function PreviewPdf({ fileUrl, ...rest } : IPreviewPdfProps) {
  const [numOfPages, setNumOfPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(320)
  const onDocumentLoad = useCallback(({ numPages }) => setNumOfPages(numPages), [fileUrl, setNumOfPages])

  const onWidthChange = useCallback((e : LayoutChangeEvent) => {
    let { width } = e.nativeEvent.layout
    width = width * 0.9
    width = Math.min(width, 940)
    setPageWidth(width)
  }, [setPageWidth])

  const pages = useMemo(() => (
    [...Array(numOfPages).keys()].map((pageNumber) => (<Page renderTextLayer={false} key={pageNumber} width={pageWidth} pageNumber={pageNumber+1} renderMode="svg" />))
  ), [numOfPages, pageWidth])

  return (
    <ScrollContainer onLayout={onWidthChange}>
      <Document key={pageWidth} renderTextLayer={false} file={fileUrl} {...rest} onLoadSuccess={onDocumentLoad} loading={<FullPageLoader />}>
        <PagesContainer>
          {pages}
        </PagesContainer>
      </Document>
    </ScrollContainer>
  )
}