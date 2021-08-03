import gql from 'graphql-tag'

export default gql`
  query getCalendarUrl {
    me {
      id
      settings {
        calendarUrl
      }
    }
  }
`