export const auth0 = {
  managementScope: {
    // GET /api/v2/users/{id}
    READ: 'read:current_user',
    // PATCH /api/v2/users/{id}
    UPDATE: 'update:current_user_metadata',
    // PATCH /api/v2/users/{id}
    CREATE: 'create:current_user_metadata',
    // DELETE /api/v2/users/{id}/multifactor/{provider}
    DELETE: 'delete:current_user_metadata',
  },
}

export const PAGE_ROUTE = {
  HOME: '/',
  PROFILE: '/profile',
  POSTS: {
    CREATE: '/posts/write',
  },
}
