import { Route, Routes } from 'react-router-dom'

import HomePage from 'pages/home/home.page'

export function AS3Routes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />} />
    </Routes>
  )
}
