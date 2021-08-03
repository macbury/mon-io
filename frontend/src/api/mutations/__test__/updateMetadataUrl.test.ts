import mutation from '../updateMetadataUrl'

it('should match mutation', () => {
  expect(mutation).toMatchGraphqlSchema()
})