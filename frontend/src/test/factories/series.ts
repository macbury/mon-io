import * as Factory from 'factory.ts'
import { Series, Recurrence } from '../../api/graphql'
import { transaction } from './transaction'

export const series = Factory.Sync.makeFactory<Series>({
  id: Factory.Sync.each((seq) => seq + '-57f0-488e-acd2-4880bff86630'),
  recurrence: Recurrence.EveryTwoWeeks,
  blueprint: transaction.build(),
  startAt: new Date()
})
