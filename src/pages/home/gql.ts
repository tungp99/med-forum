import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
  query GetPosts($skip: Int!, $take: Int!) {
    posts(
      where: { isPublished: { eq: true } }
      skip: $skip
      take: $take
      order: { createdAt: DESC }
    ) {
      items {
        id
        title
        markdownContent
        isPublished
        commentsCount
        creatorAccount {
          id
          username
        }
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
