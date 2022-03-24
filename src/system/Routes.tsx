import { Route, Routes as RR } from 'react-router-dom'

import { GuardedComponent } from 'system/auth'
import {
  HomePage,
  ManagementPostsPage,
  PostPage,
  PostsCreatePage,
  ProfilePage,
  AdminManageUsersPage,
  AdminManagePostsPage,
} from 'pages'

export function Routes() {
  return (
    <RR>
      <Route
        path="/"
        element={<HomePage />} />

      <Route path="/profile">
        <Route
          index
          element={
            <GuardedComponent>
              <ProfilePage editable={true} />
            </GuardedComponent>
          }
        />
        <Route
          path=":id"
          element={
            <GuardedComponent>
              <ProfilePage editable={false} />
            </GuardedComponent>
          }
        />
      </Route>

      <Route path="/admin">
        <Route
          index
          element={
            <GuardedComponent requireGod>
              <AdminManagePostsPage />
            </GuardedComponent>
          }
        />

        <Route
          path="profile/:id"
          element={
            <GuardedComponent requireGod>
              <ProfilePage editable />
            </GuardedComponent>
          }
        />

        <Route
          path="posts"
          element={
            <GuardedComponent requireGod>
              <AdminManagePostsPage />
            </GuardedComponent>
          }
        />

        <Route
          path="users"
          element={
            <GuardedComponent requireGod>
              <AdminManageUsersPage />
            </GuardedComponent>
          }
        />
      </Route>

      <Route path="/posts">
        <Route
          index
          element={<span>wrong way ;)</span>} />

        <Route
          path=":id"
          element={<PostPage />} />

        <Route
          path="write"
          element={
            <GuardedComponent>
              <PostsCreatePage />
            </GuardedComponent>
          }
        />
      </Route>

      <Route path="/manage">
        <Route
          index
          element={
            <GuardedComponent>
              <ManagementPostsPage />
            </GuardedComponent>
          }
        />

        <Route
          path="users"
          element={
            <GuardedComponent>
              <AdminManageUsersPage />
            </GuardedComponent>
          }
        />
      </Route>
    </RR>
  )
}
