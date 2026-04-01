import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { CallbackPage } from '../pages/auth/callback'
import { DashboardPage } from '../pages/dashboard'
import { LoginPage } from '../pages/login'
import { NotFoundPage } from '../pages/not-found'
import { RegisterPage } from '../pages/register'

function PrivateGuard() {
  const { user, loading } = useAuth()
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-slate-200">
        Carregando...
      </div>
    )
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function PublicGuard() {
  const { user, loading } = useAuth()
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-slate-200">
        Carregando...
      </div>
    )
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />
}

function NotFoundByAuthLayout() {
  const { user, loading } = useAuth()
  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center text-slate-200">
        Carregando...
      </div>
    )
  if (user) {
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
            <Route path="/auth/callback" element={<CallbackPage />} />
          </Route>
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundByAuthLayout />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}
