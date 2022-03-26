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
  username: string | null;
}

export interface GetPosts_posts_items {
  __typename: "Post";
  score: number;
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
// GraphQL query operation: FilterPosts
// ====================================================

export interface FilterPosts_posts_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string | null;
}

export interface FilterPosts_posts_items {
  __typename: "Post";
  score: number;
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  commentsCount: number;
  creatorAccount: FilterPosts_posts_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface FilterPosts_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface FilterPosts_posts {
  __typename: "PostCollectionSegment";
  items: FilterPosts_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: FilterPosts_posts_pageInfo;
}

export interface FilterPosts {
  posts: FilterPosts_posts | null;
}

export interface FilterPostsVariables {
  timeFilter: any;
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
  username: string | null;
}

export interface GetMyPosts_posts_items {
  __typename: "Post";
  score: number;
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
  isPublic: boolean;
  firstName: string;
  lastName: string;
}

export interface GetAccounts_accounts_items {
  __typename: "Account";
  writtenPostsCount: number;
  id: string;
  email: string;
  username: string | null;
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
  isPublic: boolean;
  search: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllAccounts
// ====================================================

export interface GetAllAccounts_accounts_items_profile {
  __typename: "Profile";
  isPublic: boolean;
  firstName: string;
  lastName: string;
}

export interface GetAllAccounts_accounts_items {
  __typename: "Account";
  writtenPostsCount: number;
  id: string;
  email: string;
  username: string | null;
  profile: GetAllAccounts_accounts_items_profile;
  isGod: boolean;
}

export interface GetAllAccounts_accounts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetAllAccounts_accounts {
  __typename: "AccountCollectionSegment";
  items: GetAllAccounts_accounts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetAllAccounts_accounts_pageInfo;
}

export interface GetAllAccounts {
  accounts: GetAllAccounts_accounts | null;
}

export interface GetAllAccountsVariables {
  skip: number;
  search: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAccount
// ====================================================

export interface DeleteAccount_deleteAccount {
  __typename: "DeleteEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface DeleteAccount {
  deleteAccount: DeleteAccount_deleteAccount;
}

export interface DeleteAccountVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_createAccount {
  __typename: "Account";
  id: string;
}

export interface CreateAccount {
  createAccount: CreateAccount_createAccount;
}

export interface CreateAccountVariables {
  input: CreateAccountInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsAdmin
// ====================================================

export interface GetPostsAdmin_posts_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string | null;
}

export interface GetPostsAdmin_posts_items {
  __typename: "Post";
  score: number;
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  commentsCount: number;
  creatorAccount: GetPostsAdmin_posts_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetPostsAdmin_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetPostsAdmin_posts {
  __typename: "PostCollectionSegment";
  items: GetPostsAdmin_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetPostsAdmin_posts_pageInfo;
}

export interface GetPostsAdmin {
  posts: GetPostsAdmin_posts | null;
}

export interface GetPostsAdminVariables {
  isPublished: boolean;
  skip: number;
  timeFilter: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollectedPosts
// ====================================================

export interface GetCollectedPosts_posts_items_creatorAccount {
  __typename: "Account";
  id: string;
  username: string | null;
}

export interface GetCollectedPosts_posts_items {
  __typename: "Post";
  score: number;
  id: string;
  title: string;
  markdownContent: string;
  isPublished: boolean;
  commentsCount: number;
  creatorAccount: GetCollectedPosts_posts_items_creatorAccount | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetCollectedPosts_posts_pageInfo {
  __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  hasNextPage: boolean;
}

export interface GetCollectedPosts_posts {
  __typename: "PostCollectionSegment";
  items: GetCollectedPosts_posts_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetCollectedPosts_posts_pageInfo;
}

export interface GetCollectedPosts {
  posts: GetCollectedPosts_posts | null;
}

export interface GetCollectedPostsVariables {
  skip: number;
  collection: (string | null)[];
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
  username: string | null;
}

export interface GetPost_post_comments_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  score: number;
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
  username: string | null;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  isPublished: boolean;
  title: string;
  markdownContent: string;
  commentsCount: number;
  score: number;
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

export interface GetAccount_account_profile_qualifications {
  __typename: "Qualification";
  title: string;
  issuedBy: string;
  issuedAt: any;
  expireAt: any;
}

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
  avatarUrl: string | null;
  isPublic: boolean;
  country: string;
  firstName: string;
  lastName: string;
  birthDate: any | null;
  phoneNumber: string;
  countryCode: string;
  qualifications: GetAccount_account_profile_qualifications[];
  experience: GetAccount_account_profile_experience[];
  education: GetAccount_account_profile_education[];
}

export interface GetAccount_account {
  __typename: "Account";
  id: string;
  email: string;
  username: string | null;
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
// GraphQL mutation operation: updateQualification
// ====================================================

export interface updateQualification_addQualification {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
}

export interface updateQualification {
  addQualification: updateQualification_addQualification;
}

export interface updateQualificationVariables {
  input: QualificationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddExperience
// ====================================================

export interface AddExperience_addExperience {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface AddExperience {
  addExperience: AddExperience_addExperience;
}

export interface AddExperienceVariables {
  input: ProfessionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEducation
// ====================================================

export interface AddEducation_addEducation {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface AddEducation {
  addEducation: AddEducation_addEducation;
}

export interface AddEducationVariables {
  input: ProfessionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_changePassword {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
  affectedRecords: number;
}

export interface ChangePassword {
  changePassword: ChangePassword_changePassword;
}

export interface ChangePasswordVariables {
  input: ChangePasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveExperience
// ====================================================

export interface RemoveExperience_removeExperience {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
}

export interface RemoveExperience {
  removeExperience: RemoveExperience_removeExperience;
}

export interface RemoveExperienceVariables {
  input: ProfessionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveEducation
// ====================================================

export interface RemoveEducation_removeEducation {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
}

export interface RemoveEducation {
  removeEducation: RemoveEducation_removeEducation;
}

export interface RemoveEducationVariables {
  input: ProfessionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveQualification
// ====================================================

export interface RemoveQualification_removeQualification {
  __typename: "UpdateEntityPayload";
  isSuccess: boolean;
}

export interface RemoveQualification {
  removeQualification: RemoveQualification_removeQualification;
}

export interface RemoveQualificationVariables {
  input: QualificationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAvatar
// ====================================================

export interface UpdateAvatar_updateAvatar {
  __typename: "UpdateAvatarPayload";
  avatarUrl: string | null;
  isSuccess: boolean;
  affectedRecords: number;
}

export interface UpdateAvatar {
  updateAvatar: UpdateAvatar_updateAvatar;
}

export interface UpdateAvatarVariables {
  input: UpdateAvatarInput;
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
// GraphQL mutation operation: AdminLogin
// ====================================================

export interface AdminLogin_adminLogin_loginPayload {
  __typename: "LoginPayload";
  accessToken: string;
  refreshToken: string;
}

export interface AdminLogin_adminLogin {
  __typename: "AdminLoginPayload";
  loginPayload: AdminLogin_adminLogin_loginPayload | null;
}

export interface AdminLogin {
  adminLogin: AdminLogin_adminLogin;
}

export interface AdminLoginVariables {
  input: AdminLoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TriggerLogout
// ====================================================

export interface TriggerLogout {
  triggerLogout: boolean;
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

// ====================================================
// GraphQL subscription operation: AuthenticationStatistics
// ====================================================

export interface AuthenticationStatistics {
  authenticationStatistics: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: AccountCreated
// ====================================================

export interface AccountCreated {
  accountCreated: number;
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
  username: string | null;
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
  username: string | null;
}

export interface GetReplies_replies_items {
  __typename: "Comment";
  id: string;
  markdownContent: string;
  repliesCount: number;
  score: number;
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
  username: string | null;
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

// ====================================================
// GraphQL mutation operation: PostRate
// ====================================================

export interface PostRate_ratePost {
  __typename: "RatePostPayload";
  isSuccess: boolean;
  affectedRecords: number;
  quality: Quality;
}

export interface PostRate {
  ratePost: PostRate_ratePost;
}

export interface PostRateVariables {
  input: RatePostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCommentRate
// ====================================================

export interface UpdateCommentRate_rateComment {
  __typename: "RateCommentPayload";
  quality: Quality;
  isSuccess: boolean;
}

export interface UpdateCommentRate {
  rateComment: UpdateCommentRate_rateComment;
}

export interface UpdateCommentRateVariables {
  commentId: string;
  quality: Quality;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Quality {
  BAD = "BAD",
  GOOD = "GOOD",
}

export interface AdminLoginInput {
  input: LoginInput;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface CreateAccountInput {
  email: string;
  username?: string | null;
  password: string;
  profile: ProfileInput;
}

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
  accountId?: string | null;
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
  countryCode?: string | null;
  phoneNumber: string;
  birthDate?: any | null;
}

export interface QualificationInput {
  accountId?: string | null;
  title: string;
  issuedBy: string;
  issuedAt: any;
  expireAt: any;
}

export interface RatePostInput {
  postId: string;
  quality: Quality;
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
  username?: string | null;
  profile: ProfileInput;
}

export interface UpdateAvatarInput {
  accountId: string;
  file: any;
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
