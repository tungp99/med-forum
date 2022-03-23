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
import AdminManagementPage from 'pages/management/admin_management_page/management.posts.page'

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
      <Route path="/admin">
        <Route
          index
          element={
            <GuardedComponent>
              <AdminManagementPage />
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
