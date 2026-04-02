import { KeyRound, LogOut, User2, Users } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { useAuth } from '../contexts/AuthContext'

function getInitials(name?: string) {
  if (!name) return '?'
  const words = name.split(' ').filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

export function DashboardMenu() {
  const { user, logout, logoutAll, loading } = useAuth()
  // Menus de edição de usuário/senha
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [editPasswordOpen, setEditPasswordOpen] = useState(false)

  if (loading || !user) return null

  const providerIsLocal = user.providers.includes('local')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="default" className="ml-2 ">
          <Avatar size="sm">
            {user.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} size="lg" />
            ) : (
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuLabel className="font-semibold">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="truncate text-xs opacity-60">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(event: Event) => {
                  event.preventDefault()
                  setEditProfileOpen(true)
                }}
              >
                <User2 className="size-4 mr-2" /> Alterar usuário
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alterar dados do usuário</DialogTitle>
                <DialogDescription>
                  Edite seu nome e avatar aqui.
                </DialogDescription>
              </DialogHeader>
              {/* TODO: colocar formulário de edição de perfil */}
              <div className="text-muted-foreground text-sm">(Em breve...)</div>
            </DialogContent>
          </Dialog>

          {providerIsLocal && (
            <Dialog open={editPasswordOpen} onOpenChange={setEditPasswordOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(event: Event) => {
                    event.preventDefault()
                    setEditPasswordOpen(true)
                  }}
                >
                  <KeyRound className="size-4 mr-2" /> Alterar senha
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Alterar senha</DialogTitle>
                  <DialogDescription>
                    Troque sua senha de acesso.
                  </DialogDescription>
                </DialogHeader>
                {/* TODO: colocar formulário de alteração de senha */}
                <div className="text-muted-foreground text-sm">
                  (Em breve...)
                </div>
              </DialogContent>
            </Dialog>
          )}
          <DropdownMenuItem
            onSelect={async () => {
              await logout()
            }}
          >
            <LogOut className="size-4 mr-2" /> Sair
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={async () => {
              await logoutAll()
            }}
          >
            <Users className="size-4 mr-2" /> Deslogar tudo
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
