import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '../lib/api.ts'
import { setHadUser } from '../lib/session'

// Tipos dos dados
interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
  providers: string[]
  createdAt: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  logoutAll: () => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
  }) => Promise<string | void>
  refetchUser: () => Promise<void> // Útil para garantir dados frescos do /me
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // Sincroniza estado global para que interceptors tenham acesso
  useEffect(() => {
    setHadUser(user !== null)
  }, [user])
  const [loading, setLoading] = useState(true)

  const fetchMe = async () => {
    setLoading(true)
    // Guarda o estado anterior do usuário para saber se estava autenticado
    const hadUser = !!user
    try {
      const res = await api.get('/users/me')
      setUser(res.data)
    } catch (error: any) {
      setUser(null)
      // Só mostra toast se usuário estava autenticado antes
      if (hadUser && typeof window !== 'undefined') {
        import('sonner').then(({ toast }) => {
          toast.error('Sua sessão expirou. Faça login novamente.')
        })
      }
      // Só redireciona para login se NÃO já estiver na tela de login e for 401
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        if (currentPath !== '/login' && error?.response?.status === 401) {
          window.location.href = '/login'
        }
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    // Sempre checa sessão ao inicializar o app, em qualquer rota!
    fetchMe()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    try {
      await api.post('/auth/login', credentials)
      await fetchMe()
    } catch {
      setUser(null)
      throw new Error('Falha no login')
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    try {
      await api.post('/auth/logout')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logoutAll = async () => {
    setLoading(true)
    try {
      await api.post('/auth/logout-all')
      setUser(null)
      if (typeof window !== 'undefined') {
        // Lazy import to avoid cyclic deps, assume toast from sonner
        import('sonner').then(({ toast }) => {
          toast.success('Todas as sessões foram encerradas com sucesso!')
        })
      }
      // Redireciona para login se react-router disponível
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    } catch (err: any) {
      console.error('[logoutAll] API error:', err)
      setUser(null)
      if (typeof window !== 'undefined') {
        import('sonner').then(({ toast }) => {
          toast.error(
            'Erro ao encerrar todas as sessões: ' +
              (err?.response?.data?.message ||
                err.message ||
                'Erro inesperado'),
          )
        })
      }
      window.location.href = '/login'
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: {
    name: string
    email: string
    password: string
  }) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/register', data)
      setLoading(false)
      return (
        response.data?.message ||
        'Cadastro realizado! Verifique seu e-mail para ativar sua conta.'
      )
    } catch (err: any) {
      setLoading(false)
      setUser(null)
      if (err.response) {
        throw new Error(err.response.data?.message || 'Falha no cadastro')
      } else if (err.request) {
        throw new Error('Erro de rede ou CORS')
      } else {
        throw new Error(err.message)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        logoutAll,
        register,
        refetchUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
