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
      skip: $skip
      take: 8
      order: { score: DESC }
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
