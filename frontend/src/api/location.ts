import { ApiBase } from './types'
import getLocationQuery from './queries/getLocation'
import getMap from './queries/map'
import {
  Query,
  QueryGetLocationArgs,
  LocationInput,
  Location,
  LocationSummary,
  QueryMapArgs
} from './graphql'

export default class LocationApi extends ApiBase {
  public async reverseGeocode(location : LocationInput) : Promise<Location> {
    const { data } = await this.client.query<Query, QueryGetLocationArgs>({
      query: getLocationQuery,
      variables: { location }
    })

    return data.getLocation
  }

  public async getMap(categoryIds : string[]) : Promise<Array<LocationSummary>> {
    const { data } = await this.client.query<Query, QueryMapArgs>({
      query: getMap,
      variables: { categoryIds }
    })

    return data.map
  }
}