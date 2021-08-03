import styled from 'styled-components/native'

export interface IResponsiveProp {
  isDesktop: boolean;
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const OptionsContainer = styled.View`
  padding-top: 15px;
`

export const GridOptionsContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
`

export const TopRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 ${(props : IResponsiveProp) => props.isDesktop ? 0 : 0}px;
`

export const DateHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${(props : IResponsiveProp) => props.isDesktop ? 0 : 0}px;
`

export const CenterRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${(props : IResponsiveProp) => props.isDesktop ? 0 : 0}px;
`

export const CenterSideRow = styled.View`
  display: flex;
  flex-direction: column;
`

export const BottomRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 ${(props : IResponsiveProp) => props.isDesktop ? 0 : 0}px;
`