import { gql } from '@apollo/client'

export const GET_POST_QUERY = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      isPublished
      title
      markdownContent
      commentsCount
      rating {
        upvotes
        downvotes
      }
      comments(order: { createdAt: DESC }) {
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
      }
      creatorAccount {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`
