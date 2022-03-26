import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
  query GetPosts($skip: Int!) {
    posts(
      where: { isPublished: { eq: true } }
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        score
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
export const FILTER_POST_QUERY = gql`
  query FilterPosts($timeFilter: DateTime!, $skip: Int!) {
    posts(
      where: {
        isPublished: { eq: true }
        and: { createdAt: { gte: $timeFilter } }
      }
      order: { score: DESC, createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        score
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
