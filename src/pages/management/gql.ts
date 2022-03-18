import { gql } from '@apollo/client'

export const GET_MY_POSTS_QUERY = gql`
  query GetMyPosts($accountId: String!, $isPublished: Boolean!, $skip: Int!) {
    posts(
      accountId: $accountId
      where: { and: { isPublished: { eq: $isPublished } } }
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

export const GET_ACCOUNTS_QUERY = gql`
  query GetAccounts($skip: Int!) {
    accounts(skip: $skip, take: 8) {
      items {
        id
        email
        username
        profile {
          firstName
          lastName
        }
        isGod
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
