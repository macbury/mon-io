
import { validateQuery } from './graphql'

expect.extend({
  toMatchGraphqlSchema: (query) => {
    const errors = validateQuery(query)

    if (errors.length === 0) {
      return {
        message: () =>
          `.toMatchGraphqlSchema\n\n` +
          'Expected query or mutation to not be a valid GraphQL schema.',
        pass: true
      }
    }
    return {
      message: () =>
        `.toMatchGraphqlSchema\n\n` +
        `Expected query or mutation to be a valid GraphQL schema but ${errors.length} error${
          errors.length === 1 ? '' : 's'
        } were found:\n${errors.map(err => `- ${err}`).join('\n')}`,
      pass: false
    }
  }
})