import { gql } from '@apollo/client'

export const GET_POST_QUERY = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      isPublished
      title
      markdownContent
      commentsCount
      comments {
        items {
          id
          markdownContent
          repliesCount
          creatorAccount {
            id
            username
          }
          createdAt
          updatedAt
        }
      }
      creatorAccount {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`
