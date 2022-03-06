import { Route, Routes } from 'react-router-dom'

import { PAGE_ROUTE } from 'system/constants'
import HomePage from 'pages/home/home.page'
import ProfilePage from 'pages/profile/profile.page'
import PostsCreatePage from 'pages/posts/posts.create.page'

export function AS3Routes() {
  return (
    <Routes>
      <Route
        path={PAGE_ROUTE.HOME}
        element={<HomePage />} />

      <Route
        path={PAGE_ROUTE.PROFILE}
        element={<ProfilePage />} />

      <Route
        path={PAGE_ROUTE.POSTS.CREATE}
        element={<PostsCreatePage />} />
    </Routes>
  )
}
