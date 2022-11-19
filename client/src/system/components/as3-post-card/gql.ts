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
        score
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
export const UPDATE_POST_RATE_MUTATION = gql`
  mutation PostRate($input: RatePostInput!) {
    ratePost(input: $input) {
      isSuccess
      affectedRecords
      quality
    }
  }
`
export const UPDATE_COMMENT_RATE_MUTATION = gql`
  mutation UpdateCommentRate($commentId: String!, $quality: Quality!) {
    rateComment(input: { commentId: $commentId, quality: $quality }) {
      quality
      isSuccess
    }
  }
`
export const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      isSuccess
    }
  }
`
