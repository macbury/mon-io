import React, { forwardRef } from 'react'
import { ScrollView } from 'react-navigation'
import styled from 'styled-components/native'

interface IFabScrollProps {
  children?: any
}

const FabGap = styled.View`
  height: 90px;
`

const FabScroll = forwardRef(({ children, ...props } : IFabScrollProps, ref : any) => {
  return (
    <ScrollView ref={ref} {...props}>
      {children}
      <FabGap />
    </ScrollView>
  )
})

export default FabScroll
