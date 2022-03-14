import { gql } from '@apollo/client'

export const GET_POST_QUERY = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      title
      markdownContent
      createdAt
      updatedAt
      isPublished
      commentsCount
    }
  }
`
