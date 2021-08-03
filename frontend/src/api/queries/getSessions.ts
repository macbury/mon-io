import gql from 'graphql-tag'
import ViewSession from '../fragments/ViewSession'

export default gql`
  ${ViewSession}

  query getSessions {
    me {
      refreshTokens {
        ...ViewSession
      }

      longLivingRefreshTokens {
        ...ViewSession
      }
    }
  }
`