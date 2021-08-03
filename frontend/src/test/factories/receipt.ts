import * as Factory from 'factory.ts'
import { Receipt } from '../../api/graphql'
import { category } from './category'
import { user } from './user'
import { location } from './location'

export const receipt = Factory.Sync.makeFactory<Receipt>({
  id: Factory.Sync.each((seq) => `${seq}-000-000`),
  createdAt: Date.now().toString,
  name: 'scan.jpeg',
  fileUrl: 'http://totalyfakefile.local/file/receipts/fake.png',
  category: category.build(),
  attached: false,
  user: user.build(),
  location: location.build()
})