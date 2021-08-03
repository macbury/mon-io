import gql from 'graphql-tag'

export default gql`
  query getAboutApplication {
    about {
      commit
      monioVersion
      railsVersion
    }
  }
`