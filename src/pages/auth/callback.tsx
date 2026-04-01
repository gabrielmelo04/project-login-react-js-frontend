import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '../../components/ui/spinner'
import { useAuth } from '../../contexts/AuthContext'

export function CallbackPage() {
  const navigate = useNavigate()
  const { refetchUser, user } = useAuth()
  const executed = useRef(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const provider = urlParams.get('provider')
    const success = urlParams.get('success')

    async function finishAuth() {
      if (executed.current) return
      executed.current = true
      try {
        // Se há code, troca pelo backend
        if (code) {
          await axios.get(
            `http://localhost:3333/auth/google/callback?code=${code}`,
            { withCredentials: true },
          )
        }
        // Sempre refaz a autenticação
        await refetchUser()
        // Precisa pegar o estado mais atualizado de user — reconsultar o contexto
        // Como não está garantido no state sync imediato, forçamos checagem após await!
        const refreshedUserResponse = await fetch('/users/me', {
          credentials: 'include',
        })
        const refreshedUser = refreshedUserResponse.ok
          ? await refreshedUserResponse.json()
          : null
        console.log('Resposta bruta de /me:', refreshedUserResponse)
        console.log('Corpo de /me:', refreshedUser)
        if (refreshedUser && refreshedUser.id) {
          toast.success('Login realizado com sucesso!')
          navigate('/')
        } else {
          toast.error('Erro ao autenticar - usuário não reconhecido.')
          navigate('/login')
        }
      } catch (error) {
        toast.error('Erro ao autenticar')
        navigate('/login')
      }
    }

    if (code || (provider && success === '1')) {
      finishAuth()
    } else {
      toast.error('Erro ao autenticar: callback inválido.')
      navigate('/login')
    }
  }, [navigate, refetchUser])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="flex items-center gap-2 text-slate-50 text-lg">
        <Spinner className="w-6 h-6" /> Autenticando com Google...
      </span>
    </div>
  )
}
