import { Route, Routes as RR } from 'react-router-dom'

import { GuardedComponent } from 'system/auth'
import {
  HomePage,
  ManageUsersPage,
  ManagementPostsPage,
  PostPage,
  PostsCreatePage,
  ProfilePage,
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
              <ProfilePage />
            </GuardedComponent>
          }
        />
        <Route
          path=":id"
          element={
            <GuardedComponent>
              <ProfilePage />
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
              <ManageUsersPage />
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
    </RR>
  )
}
