/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUserPosts
// ====================================================

export interface GetCurrentUserPosts_posts_items {
  readonly __typename: "Post";
  readonly id: string | null;
  readonly title: string;
  readonly markdownContent: string;
  readonly createdAt: any;
  readonly updatedAt: any;
  readonly published: boolean;
  readonly commentsCount: any;
}

export interface GetCurrentUserPosts_posts_pageInfo {
  readonly __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  readonly hasNextPage: boolean;
  /**
   * Indicates whether more items exist prior the set defined by the clients arguments.
   */
  readonly hasPreviousPage: boolean;
}

export interface GetCurrentUserPosts_posts {
  readonly __typename: "PostCollectionSegment";
  readonly items: ReadonlyArray<GetCurrentUserPosts_posts_items> | null;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetCurrentUserPosts_posts_pageInfo;
}

export interface GetCurrentUserPosts {
  readonly posts: GetCurrentUserPosts_posts | null;
}

export interface GetCurrentUserPostsVariables {
  readonly skip: number;
  readonly take: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHomePageContent
// ====================================================

export interface GetHomePageContent_posts_items {
  readonly __typename: "Post";
  readonly id: string | null;
  readonly title: string;
  readonly markdownContent: string;
  readonly createdAt: any;
  readonly updatedAt: any;
  readonly published: boolean;
  readonly commentsCount: any;
}

export interface GetHomePageContent_posts_pageInfo {
  readonly __typename: "CollectionSegmentInfo";
  /**
   * Indicates whether more items exist following the set defined by the clients arguments.
   */
  readonly hasNextPage: boolean;
  /**
   * Indicates whether more items exist prior the set defined by the clients arguments.
   */
  readonly hasPreviousPage: boolean;
}

export interface GetHomePageContent_posts {
  readonly __typename: "PostCollectionSegment";
  readonly items: ReadonlyArray<GetHomePageContent_posts_items> | null;
  /**
   * Information to aid in pagination.
   */
  readonly pageInfo: GetHomePageContent_posts_pageInfo;
}

export interface GetHomePageContent {
  readonly posts: GetHomePageContent_posts | null;
}

export interface GetHomePageContentVariables {
  readonly skip: number;
  readonly take: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_account_profile {
  readonly __typename: "Profile";
  readonly firstName: string;
  readonly lastName: string;
  readonly public: boolean;
}

export interface Register_register_account {
  readonly __typename: "Account";
  readonly id: string | null;
  readonly email: string;
  readonly username: string | null;
  readonly profile: Register_register_account_profile;
  readonly createdAt: any;
  readonly updatedAt: any;
}

export interface Register_register {
  readonly __typename: "LoginPayload";
  readonly account: Register_register_account;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface Register {
  readonly register: Register_register;
}

export interface RegisterVariables {
  readonly input: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_account_profile {
  readonly __typename: "Profile";
  readonly firstName: string;
  readonly lastName: string;
  readonly public: boolean;
}

export interface Login_login_account {
  readonly __typename: "Account";
  readonly id: string | null;
  readonly email: string;
  readonly username: string | null;
  readonly profile: Login_login_account_profile;
  readonly createdAt: any;
  readonly updatedAt: any;
}

export interface Login_login {
  readonly __typename: "LoginPayload";
  readonly account: Login_login_account;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface Login {
  readonly login: Login_login;
}

export interface LoginVariables {
  readonly input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LoginInput {
  readonly email?: string | null;
  readonly username?: string | null;
  readonly password: string;
}

export interface ProfileInput {
  readonly public?: boolean | null;
  readonly firstName: string;
  readonly lastName: string;
}

export interface RegisterInput {
  readonly email: string;
  readonly username?: string | null;
  readonly password: string;
  readonly confirmationPassword: string;
  readonly profile: ProfileInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
