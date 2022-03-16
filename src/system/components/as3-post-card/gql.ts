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

export const GET_REPLIES_QUERY = gql`
  query GetReplies($commentId: String!) {
    replies(commentId: $commentId, order: { createdAt: DESC }) {
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
      pageInfo {
        hasNextPage
      }
    }
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      markdownContent
      repliesCount
      creatorAccount {
        username
      }
      createdAt
      updatedAt
    }
  }
`
