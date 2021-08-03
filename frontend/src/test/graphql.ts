import MonioApi from '../api'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { ApolloClient } from 'apollo-client'
import { makeExecutableSchema } from 'graphql-tools'
import { validate } from 'graphql'

import fs from 'fs'
import path from 'path'

const schemaPath = path.resolve(__dirname, '../../schema.graphql')

if (!fs.existsSync(schemaPath)) {
  throw new Error(`Missing schema.graphql file at: ${schemaPath}`)
}

const schemaBody = fs.readFileSync(schemaPath, { encoding: 'utf8' })

export type ResolversMock = {
  Query?: {
    [fieldName : string]: () => {}
  },
  Mutation?: {
    [fieldName : string]: () => {}
  }
}

/**
 * Check if query is ok
 * @param document
 */
export function validateQuery(document) {
  const validatableSchema = makeExecutableSchema({
    typeDefs: schemaBody,
    resolvers: {},
  })

  const errorArray = validate(validatableSchema, document)
  return errorArray
}

export function mockApi(resolvers : ResolversMock) : MonioApi {
  const cache = new InMemoryCache()

  const executableSchema = makeExecutableSchema({
    typeDefs: schemaBody,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: true }
  })

  const client = new ApolloClient({
    link: new SchemaLink({ schema: executableSchema }),
    cache
  })

  const api = new MonioApi(null, client)
  return api
}
