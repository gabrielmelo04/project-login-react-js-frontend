import axios, { type AxiosError, type AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

// Remove token do header, só trabalhar com cookie HTTP only
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

// --- Controle de refresh token concorrente ---
let isRefreshing = false
let pendingRequests: Array<(tokenRefreshed: boolean) => void> = []

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any & { _retry?: boolean }

    // Se status for 401 E a request não for o próprio /auth/refresh
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest?.url !== '/auth/refresh'
    ) {
      // Marca pra evitar loop infinito
      originalRequest._retry = true

      // Se já tem refresh em andamento, aguarde a fila (Promise)
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push((tokenRefreshed: boolean) => {
            if (tokenRefreshed) {
              resolve(api(originalRequest))
            } else {
              reject(error)
            }
          })
        })
      }

      // Dispara refresh
      isRefreshing = true
      try {
        await api.post('/auth/refresh') // backend devolve novo cookie

        // Resolve todas pendentes
        pendingRequests.forEach((cb) => cb(true))
        pendingRequests = []

        return api(originalRequest) // retry original
      } catch (refreshErr: any) {
        // Falha ao fazer refresh, rejeita toda a fila e desloga
        pendingRequests.forEach((cb) => cb(false))
        pendingRequests = []

        // Toast + redirect login para 401, toast amigável para 500
        const status = refreshErr?.response?.status
        const backendMsg = refreshErr?.response?.data?.message
        // Mensagens personalizadas conforme backend
        if (status === 401) {
          // Toast explicando o que houve (mensagem do backend, ou genérica)
          import('sonner').then(({ toast }) => {
            toast.error(
              backendMsg || 'Sua sessão expirou. Faça login novamente.',
            )
          })
          window.location.href = '/login'
        } else if (status === 500) {
          import('sonner').then(({ toast }) => {
            toast.error(
              backendMsg ||
                'Erro ao renovar autenticação. Tente novamente ou faça login.',
            )
          })
          // Não faz redirect imediato; usuário pode tentar novamente
        }
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    // Demais erros
    return Promise.reject(error)
  },
)

export default api
