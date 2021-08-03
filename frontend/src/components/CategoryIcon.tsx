import React, { useMemo } from 'react'
import LinearGradient from './LinearGradient'
import styled, { useTheme } from 'styled-components/native'
import Color from 'color'
import Icon from './Icon'

interface IContainerProps {
  size?: number
}

const GradientContainer = styled(LinearGradient)`
  margin-bottom: 10px;
  /* padding: 9px; */
  border-radius: ${(props : IContainerProps) => props.size / 2}px;
  width: ${(props : IContainerProps) => props.size}px;
  height: ${(props : IContainerProps) => props.size}px;
  border-width: 3px;
  border-color: ${(props : any) => props.color};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SimpleContainer = styled.View`
  margin-bottom: 0px;
  margin-right: 15px;
  border-radius: 50px;
  width: ${(props : IContainerProps) => props.size};
  height: ${(props : IContainerProps) => props.size};
  background: ${(prop) => prop.theme.itemBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface ICategoryIconProp extends IContainerProps {
  color: string;
  name: string;
  simple?: boolean;
}

function colorByTheme(color: string, power: number, dark: boolean) {
  let out = Color(color)
  if (dark) {
    return out.darken(power).toString()
  } else {
    return out.lighten(power).toString()
  }
}

function GradientCategoryIcon({ name, color, size, ...props } : ICategoryIconProp) {
  const { dark } = useTheme()
  const endColor = useMemo(() => colorByTheme(color, 0.3, dark), [color, dark])
  const borderColor = useMemo(() => colorByTheme(color, 0.4, dark), [color, dark])
  const colors = dark ? [color, endColor] : [endColor, color]

  if (!size) {
    size = 64;
  }

  return (
    <GradientContainer colors={colors} color={borderColor} size={size} {...props}>
      <Icon name={name} size={size/2} color="#fff" />
    </GradientContainer>
  )
}

function SimpleCategoryIcon({ name, size, ...props } : ICategoryIconProp) {
  return (
    <SimpleContainer size={size} {...props}>
      <Icon name={name} size={size/2} color="#fff" />
    </SimpleContainer>
  )
}

export default function CategoryIcon(props : ICategoryIconProp) {
  if (props.simple) {
    return <SimpleCategoryIcon {...props} />
  } else {
    return <GradientCategoryIcon {...props} />
  }
}