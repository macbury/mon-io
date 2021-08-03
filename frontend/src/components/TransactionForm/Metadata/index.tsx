import React from 'react'
import styled from 'styled-components/native'
import { Chip } from 'react-native-paper'
import TransactionMetadataStore from '../../../stores/TransactionMetadataStore'
import AddMetadata from './Add'

const MetadataContainer = styled.ScrollView`
  padding: 10px;
  flex-shrink: 1;
  flex-grow: 0;
  border: 1px solid ${(props) => props.theme.itemBorderColor};
  background-color: ${(props) => props.theme.calculatorAltBackground};
`

const MetadataChip = styled(Chip)`
  margin-right: 10px;
  margin-bottom: 5px;
  margin-top: 3px;
  max-height: 35px;
`

const Preview = styled.Image`
  width: 16px;
  height: 16px;
`

export interface IMetadataProps {
  metadata: TransactionMetadataStore
}

function renderChip(pill, index) {
  return (
    <MetadataChip
      icon={pill.icon}
      key={index}
      onPress={pill.onEdit}
      onClose={pill.onDelete}>{pill.text}</MetadataChip>
  )
}

export default function Metadata({ metadata } : IMetadataProps) {
  if (!metadata) {
    return null
  }

  const chips = metadata.all.map(renderChip)

  return (
    <MetadataContainer horizontal>
      {chips}
      {metadata.canAdd && <AddMetadata onPress={metadata.showAddMetadata} />}
    </MetadataContainer>
  )
}