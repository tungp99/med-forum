import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
  query GetPosts($skip: Int!) {
    posts(
      where: { isPublished: { eq: true } }
      skip: $skip
      take: 8
      order: { createdAt: DESC }
    ) {
      items {
        rating {
          upvotes
          downvotes
        }
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
