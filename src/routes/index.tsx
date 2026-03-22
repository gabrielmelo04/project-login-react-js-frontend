import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { DashboardPage } from '../pages/dashboard'
import { LoginPage } from '../pages/login'
import { NotFoundPage } from '../pages/not-found'
import { RegisterPage } from '../pages/register'

function isAuthenticated() {
  return false
}

function PrivateGuard() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}

function PublicGuard() {
  return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />
}

function NotFoundByAuthLayout() {
  if (isAuthenticated()) {
    return (
      <PrivateLayout>
        <NotFoundPage />
      </PrivateLayout>
    )
  }

  return (
    <PublicLayout>
      <NotFoundPage />
    </PublicLayout>
  )
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<PublicGuard />}>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundByAuthLayout />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}
