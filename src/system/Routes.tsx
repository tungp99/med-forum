import { Route, Routes as RR } from 'react-router-dom'

import { PAGE_ROUTE } from 'system/constants'
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
        path={PAGE_ROUTE.HOME}
        element={<HomePage />} />

      <Route
        path={PAGE_ROUTE.PROFILE}
        element={
          <GuardedComponent>
            <ProfilePage />
          </GuardedComponent>
        }
      />

      <Route
        path="/management"
        element={<ManagementPage />} />

      <Route
        path={PAGE_ROUTE.POSTS.SINGLE}
        element={<PostPage />} />

      <Route
        path={PAGE_ROUTE.POSTS.CREATE}
        element={<PostsCreatePage />} />
    </RR>
  )
}
