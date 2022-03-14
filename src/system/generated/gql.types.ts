/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUserPosts
// ====================================================

export interface GetCurrentUserPosts_posts_items {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  createdAt: any;
  updatedAt: any;
  isPublished: boolean;
  commentsCount: number;
}

export interface GetCurrentUserPosts_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
  /**
   * Indicates whether more items exist prior the set defined by the clients arguments.
   */
  hasPreviousPage: boolean;
}

export interface GetCurrentUserPosts_posts {
  __typename: "PostCollectionSegment";
  items: GetCurrentUserPosts_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetCurrentUserPosts_posts_pageInfo;
}

export interface GetCurrentUserPosts {
  posts: GetCurrentUserPosts_posts | null;
}

export interface GetCurrentUserPostsVariables {
  skip: number;
  take: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHomePageContent
// ====================================================

export interface GetHomePageContent_posts_items {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  createdAt: any;
  updatedAt: any;
  isPublished: boolean;
  commentsCount: number;
}

export interface GetHomePageContent_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
  /**
   * Indicates whether more items exist prior the set defined by the clients arguments.
   */
  hasPreviousPage: boolean;
}

export interface GetHomePageContent_posts {
  __typename: "PostCollectionSegment";
  items: GetHomePageContent_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetHomePageContent_posts_pageInfo;
}

export interface GetHomePageContent {
  posts: GetHomePageContent_posts | null;
}

export interface GetHomePageContentVariables {
  skip: number;
  take: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  createdAt: any;
  updatedAt: any;
  isPublished: boolean;
  commentsCount: number;
}

export interface GetPost {
  post: GetPost_post | null;
}

export interface GetPostVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  createdAt: any;
  updatedAt: any;
}

export interface GetComments_comments_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetComments_comments {
  __typename: "CommentCollectionSegment";
  items: GetComments_comments_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetComments_comments_pageInfo;
}

export interface GetComments {
  comments: GetComments_comments | null;
}

export interface GetCommentsVariables {
  postId: string;
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReplies
// ====================================================

export interface GetReplies_replies_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  createdAt: any;
  updatedAt: any;
}

export interface GetReplies_replies_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetReplies_replies {
  __typename: "CommentCollectionSegment";
  items: GetReplies_replies_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetReplies_replies_pageInfo;
}

export interface GetReplies {
  replies: GetReplies_replies | null;
}

export interface GetRepliesVariables {
  commentId: string;
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  input: CreatePostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfileContact
// ====================================================

export interface UpdateProfileContact_updateAccount {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface UpdateProfileContact {
  updateAccount: UpdateProfileContact_updateAccount;
}

export interface UpdateProfileContactVariables {
  input: UpdateAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshAccessToken {
  __typename: "RefreshTokenPayload";
  isSuccess: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  refreshAccessToken: RefreshToken_refreshAccessToken;
}

export interface RefreshTokenVariables {
  input: RefreshTokenInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "LoginPayload";
  accessToken: string;
  refreshToken: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  input: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "LoginPayload";
  accessToken: string;
  refreshToken: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_me_profile_professions {
  __typename: "Profession";
  organization: string;
  start: any | null;
  end: any | null;
  position: string;
  isWorking: boolean;
}

export interface GetMe_me_profile_educations {
  __typename: "Profession";
  organization: string;
  start: any | null;
  end: any | null;
  position: string;
  isWorking: boolean;
}

export interface GetMe_me_profile {
  __typename: "Profile";
  isPublic: boolean;
  firstName: string;
  lastName: string;
  birthDate: any | null;
  phoneNumber: string;
  professions: GetMe_me_profile_professions[];
  educations: GetMe_me_profile_educations[];
}

export interface GetMe_me {
  __typename: "Account";
  id: string;
  email: string;
  username: string | null;
  profile: GetMe_me_profile;
  createdAt: any;
  updatedAt: any;
}

export interface GetMe {
  me: GetMe_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreatePostInput {
  title: string;
  markdownContent: string;
  isPublished: boolean;
}

export interface LoginInput {
  email?: string | null;
  username?: string | null;
  password: string;
}

export interface ProfessionInput {
  organization: string;
  start?: any | null;
  end?: any | null;
  position: string;
  isWorking: boolean;
}

export interface ProfileInput {
  isPublic: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate?: any | null;
  professions: ProfessionInput[];
  educations: ProfessionInput[];
}

export interface RefreshTokenInput {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  email: string;
  username?: string | null;
  password: string;
  confirmationPassword: string;
  profile: ProfileInput;
}

export interface UpdateAccountInput {
  id: string;
  username: string;
  password?: string | null;
  confirmationPassword?: string | null;
  profile: ProfileInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
