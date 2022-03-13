import { Route, Routes } from 'react-router-dom'

import { PAGE_ROUTE } from 'system/constants'
import { GuardedComponent } from 'system/auth'
import { HomePage, PostsCreatePage, ProfilePage } from 'pages'

export function AS3Routes() {
  return (
    <Routes>
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
        path={PAGE_ROUTE.POSTS.CREATE}
        element={<PostsCreatePage />} />
    </Routes>
  )
}
