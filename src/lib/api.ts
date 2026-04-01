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

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Não faz sentido tentar refresh, tudo controla via cookie e backend
    if (error.response?.status === 401) {
      // Poderia acionar logout etc, se útil
    }
    return Promise.reject(error)
  },
)

export default api
