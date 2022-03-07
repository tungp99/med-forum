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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
