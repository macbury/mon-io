import React from 'react'
import { Provider } from 'react-redux'
import { Playground, store } from 'graphql-playground-react'
import { IApiPlaygroundProps } from './types'

export default function LazyPlayground({ endpoint, headers, workspace }: IApiPlaygroundProps) {
  return (
    <Provider store={store}>
      <Playground
        workspaceName={workspace}
        endpoint={endpoint}
        headers={headers} />
    </Provider>
  )
}