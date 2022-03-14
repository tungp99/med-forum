import { gql } from '@apollo/client'

export const GET_COMMENTS_QUERY = gql`
  query GetComments($postId: String!, $skip: Int!) {
    comments(
      postId: $postId
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        id
        markdownContent
        repliesCount
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

export const GET_REPLIES_QUERY = gql`
  query GetReplies($commentId: String!, $skip: Int!) {
    replies(
      commentId: $commentId
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        id
        markdownContent
        repliesCount
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
