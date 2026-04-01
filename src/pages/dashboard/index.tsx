import { useAuth } from '../../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bem-vindo {user?.name} ao dashboard! Esta é uma área privada.</p>
      <p>Seu e-mail: {user?.email}</p>
      <img
        src={
          user?.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Usuário')}&background=4ade80&color=fff&size=128`
        }
        alt="Avatar"
        className="w-16 h-16 rounded-full mt-4"
      />
    </div>
  )
}
