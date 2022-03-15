import { Route, Routes as RR } from 'react-router-dom'

import { GuardedComponent } from 'system/auth'
import {
  HomePage,
  ManagementPage,
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

      <Route
        path="/profile"
        element={
          <GuardedComponent>
            <ProfilePage />
          </GuardedComponent>
        }
      />

      <Route
        path="/management"
        element={<ManagementPage />} />

      <Route path="/posts">
        <Route
          index
          element={<span>wrong way ;)</span>} />

        <Route
          path=":id"
          element={<PostPage />} />

        <Route
          path="write"
          element={<PostsCreatePage />} />
      </Route>

      <Route
        path="*"
        element={<span>nothing here ;)</span>} />
    </RR>
  )
}
