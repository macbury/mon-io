import React from 'react'
import styled from 'styled-components/native'

import CenteredScroll from '../../components/CenteredScroll'
import Desktop from '../../components/responsive/Desktop'
import Mobile from '../../components/responsive/Mobile'

import { ICategorySelectGridProps } from './types'
import CategorySelectGrid from './index'


const DesktopCategoryContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`

const DesktopCategorySelectGridContainer = styled.View`
  width: 920px;
`

export default function ResponsiveCategorySelectGrid(props : ICategorySelectGridProps) {
  return (
    <CenteredScroll>
      <Desktop>
        <DesktopCategoryContainer>
          <DesktopCategorySelectGridContainer>
            <CategorySelectGrid numOfColumns={4} {...props} />
          </DesktopCategorySelectGridContainer>
        </DesktopCategoryContainer>
      </Desktop>
      <Mobile>
        <CategorySelectGrid numOfColumns={3} {...props} />
      </Mobile>
    </CenteredScroll>
  )
}