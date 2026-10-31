import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
      <Analytics />
    </div>
  )
}