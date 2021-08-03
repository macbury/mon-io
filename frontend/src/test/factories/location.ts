import * as Factory from 'factory.ts'
import { Location } from '../../api/graphql'

export const location = Factory.Sync.makeFactory<Location>({
  id: Factory.Sync.each((seq) => seq + '-57f0-488e-acd2-4880bff86630'),
  city: 'Cracow',
  country: 'pl',
  fullAddress: 'Bora Komorowskiego 33a',
  lat: 50.3,
  lng: 49.3,
  name: 'KFC',
  postcode: '26-999'
})
