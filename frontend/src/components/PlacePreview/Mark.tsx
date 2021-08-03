import React from 'react'
import Color from 'color'
import styled, { useTheme } from 'styled-components/native'

interface IMarkDotProps {
  background: string;
  border: string;
}

const MarkDot = styled.View<IMarkDotProps>`
  background-color: ${(prop) => prop.background};
  border-radius: 50px;
  width: 20px;
  height: 20px;
  border-width: 4px;
  border-color: ${(prop) => prop.border};
`

interface IMarkProps {
  color: string;
}

export default function Mark({ color } : IMarkProps) {
  const theme = useTheme()
  let border = theme.dark ? Color(color).darken(0.4) : Color(color).lighten(0.4)

  return (
    <MarkDot
      background={color}
      border={border.string()}
    />
  )
}