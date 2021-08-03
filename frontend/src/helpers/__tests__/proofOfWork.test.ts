import proofOfWork, { TProofOfWorkOptions } from '../proofOfWork'

it('generates proof of work from valid options', async () => {
  const options : TProofOfWorkOptions = {
    jwtToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsibm9uY2UiXSwibm9uY2UiOiIxZGQzOTE1YTFhMDJjZWVhMzE3MTc2Njg2OWRlNzFjZTJiMDQzMDYyODQ5YTM4NWVjNTNkNmJiZGJlMWUwNmQ5IiwiZGlmZmljdWx0eSI6IjAwMCIsImV4cGlyZV9hdCI6IjIwMjAtMDgtMDMgMDg6Mzk6MDQgVVRDIn0.wSUkvee0l9biV-UO54vckJ-2WCWCyVDMjJz1y3vmgCk',
    password: 'admin',
    username: 'detox'
  }

  const hash = await proofOfWork(options)
  expect(hash).toEqual({
    counter: 3809,
    hash: "0000f35f8e9c7c0cd964ea36f2ce899db27cc2c56f722518e61fd089237b134d40c3360cf723093f50552f120cc83db177a7587089c9afaafefd570c44d6ec5b",
    jwtToken: options.jwtToken
  })
})

it('generates different hash for other jwt token', async () => {
  const options : TProofOfWorkOptions = {
    jwtToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsibm9uY2UiXSwibm9uY2UiOiJlOGZhY2E2ZDc4MmYzOWI4NDJhZDU0MGE2NDg2MzYwYWJkMjM4MzEyYWZhODAyMjc0N2NiYzA4MDVjNTVlMTMxIiwiZGlmZmljdWx0eSI6IjAwMCIsImV4cGlyZV9hdCI6IjIwMjAtMDgtMDMgMDk6MDQ6MzQgVVRDIn0.4H3Oi0jN_DMuSt1noxpH7VvgVheX6DM33VfLvet4io0',
    password: 'admin',
    username: 'detox'
  }

  const hash = await proofOfWork(options)
  expect(hash).toEqual({
    counter: 315,
    hash: "000fb2fe4102b4de2b1b632ec1601f5db5c769e72808374eb1b6499fa467ea7d0a62a1cdf9a355bfd3395638ef21828f8f833c6c8cdc515f6548ca29eac5e897",
    jwtToken: options.jwtToken
  })
})