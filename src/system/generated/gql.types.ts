/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_posts_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetPosts_posts_items {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  commentsCount: number;
  creatorAccount: GetPosts_posts_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetPosts_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetPosts_posts {
  __typename: "PostCollectionSegment";
  items: GetPosts_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetPosts_posts_pageInfo;
}

export interface GetPosts {
  posts: GetPosts_posts | null;
}

export interface GetPostsVariables {
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyPosts
// ====================================================

export interface GetMyPosts_posts_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetMyPosts_posts_items {
  __typename: "Post";
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  commentsCount: number;
  creatorAccount: GetMyPosts_posts_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetMyPosts_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetMyPosts_posts {
  __typename: "PostCollectionSegment";
  items: GetMyPosts_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetMyPosts_posts_pageInfo;
}

export interface GetMyPosts {
  posts: GetMyPosts_posts | null;
}

export interface GetMyPostsVariables {
  accountId: string;
  isPublished: boolean;
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccounts
// ====================================================

export interface GetAccounts_accounts_items_profile {
  __typename: "Profile";
  firstName: string;
  lastName: string;
}

export interface GetAccounts_accounts_items {
  __typename: "Account";
  id: string;
  email: string;
  username: string;
  profile: GetAccounts_accounts_items_profile;
  isGod: boolean;
}

export interface GetAccounts_accounts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetAccounts_accounts {
  __typename: "AccountCollectionSegment";
  items: GetAccounts_accounts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetAccounts_accounts_pageInfo;
}

export interface GetAccounts {
  accounts: GetAccounts_accounts | null;
}

export interface GetAccountsVariables {
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_comments_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetPost_post_comments_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  creatorAccount: GetPost_post_comments_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetPost_post_comments {
  __typename: "CommentCollectionSegment";
  items: GetPost_post_comments_items[] | null;
}

export interface GetPost_post_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  isPublished: boolean;
  title: string;
  markdownContent: string;
  commentsCount: number;
  comments: GetPost_post_comments | null;
  creatorAccount: GetPost_post_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
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
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
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
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost_updatePost {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface UpdatePost {
  updatePost: UpdatePost_updatePost;
}

export interface UpdatePostVariables {
  input: UpdatePostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccount
// ====================================================

export interface GetAccount_account_profile_experience {
  __typename: "Profession";
  organization: string;
  start: any | null;
  end: any | null;
  position: string;
  isWorking: boolean;
}

export interface GetAccount_account_profile_education {
  __typename: "Profession";
  organization: string;
  start: any | null;
  end: any | null;
  position: string;
  isWorking: boolean;
}

export interface GetAccount_account_profile {
  __typename: "Profile";
  isPublic: boolean;
  firstName: string;
  lastName: string;
  birthDate: any | null;
  phoneNumber: string;
  experience: GetAccount_account_profile_experience[];
  education: GetAccount_account_profile_education[];
}

export interface GetAccount_account {
  __typename: "Account";
  id: string;
  email: string;
  username: string;
  profile: GetAccount_account_profile;
  createdAt: any;
  updatedAt: any;
}

export interface GetAccount {
  account: GetAccount_account | null;
}

export interface GetAccountVariables {
  id: string;
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
// GraphQL mutation operation: UpdateExperience
// ====================================================

export interface UpdateExperience_updateExperience {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface UpdateExperience {
  updateExperience: UpdateExperience_updateExperience;
}

export interface UpdateExperienceVariables {
  input: ProfessionsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateEducation
// ====================================================

export interface UpdateEducation_updateEducation {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface UpdateEducation {
  updateEducation: UpdateEducation_updateEducation;
}

export interface UpdateEducationVariables {
  input: ProfessionsInput;
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

export interface GetMe_me_profile {
  __typename: "Profile";
  isPublic: boolean;
  firstName: string;
  lastName: string;
  birthDate: any | null;
  phoneNumber: string;
}

export interface GetMe_me {
  __typename: "Account";
  id: string;
  email: string;
  username: string;
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

// ====================================================
// GraphQL query operation: GetComments
// ====================================================

export interface GetComments_comments_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetComments_comments_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  creatorAccount: GetComments_comments_items_creatorAccount | null;
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

export interface GetReplies_replies_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string;
}

export interface GetReplies_replies_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  creatorAccount: GetReplies_replies_items_creatorAccount | null;
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
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment_creatorAccount {
  __typename: "Account";
  username: string;
}

export interface CreateComment_createComment {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  creatorAccount: CreateComment_createComment_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface CreateComment {
  createComment: CreateComment_createComment;
}

export interface CreateCommentVariables {
  input: CreateCommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateCommentInput {
  markdownContent: string;
  postId: string;
  replyToCommentId?: string | null;
}

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

export interface ProfessionsInput {
  accountId?: string | null;
  professions: ProfessionInput[];
}

export interface ProfileInput {
  isPublic: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate?: any | null;
}

export interface RefreshTokenInput {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  confirmationPassword: string;
  profile: ProfileInput;
}

export interface UpdateAccountInput {
  id: string;
  username: string;
  profile: ProfileInput;
}

export interface UpdatePostInput {
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
