import { Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'

import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { FeedPage } from '@/features/feed/FeedPage'
import { NotFoundPage } from '@/features/pages/NotFoundPage'
import { PostDetailsPage } from '@/features/post/PostDetailPage'
import { ProfilePage } from '@/features/profile/ProfilePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FeedPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
