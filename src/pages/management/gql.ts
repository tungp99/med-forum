import { gql } from '@apollo/client'

export const GET_MY_POSTS_QUERY = gql`
  query GetMyPosts(
    $accountId: String!
    $isPublished: Boolean = true
    $skip: Int!
  ) {
    posts(
      where: {
        creatorAccountId: { eq: $accountId }
        and: { isPublished: { eq: $isPublished } }
      }
      skip: $skip
      take: 8
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
