import { Surface } from 'react-native-paper'
import styled from 'styled-components/native'

const Container = styled(Surface)`
  background: ${({ theme }) => theme.headerBackground};
  border-radius: ${({ theme }) => theme.device === 'desktop' ? '16px' : '0px'};
  overflow: hidden;
  margin-bottom: 15px;
`

export default Container