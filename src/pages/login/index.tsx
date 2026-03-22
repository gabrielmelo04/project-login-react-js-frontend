import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../../components/ui/button'
import { Field, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { PasswordInput } from '../../components/ui/password-input'
import { Separator } from '../../components/ui/separator'

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve conter no mínimo 6 caracteres' }),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { handleSubmit } = loginForm

  const navegate = useNavigate()

  function handleLogin(data: LoginFormData) {
    console.log('Dados do formulário:', data)
    // Aqui você pode adicionar a lógica para enviar os dados de login para o servidor
    toast.success('Login realizado com sucesso!')
  }

  return (
    <div className="absolute w-[90%] md:w-3/5 lg:w-2/5 h-screen bg-slate-800 flex flex-col justify-center items-start right-0 shadow-xl px-5 ">
      <h1 className="w-full border-b border-slate-50 text-2xl text-slate-50 pb-2">
        Acesse sua conta
      </h1>

      <div className="w-full flex justify-center mt-5">
        <Button className="cursor-pointer p-5 text-lg">
          <FcGoogle className="size-6" />
          Google
        </Button>
      </div>

      <FormProvider {...loginForm}>
        <form
          className="w-full py-4 flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Field className="relative">
            <FieldLabel>E-mail</FieldLabel>
            <Input type="email" placeholder="Digite seu e-mail" name="email" />
          </Field>

          <Field className="relative">
            <FieldLabel>Senha</FieldLabel>
            <PasswordInput placeholder="Digite sua senha" name="password" />
          </Field>

          <p className="text-sm text-slate-300">
            Esqueceu a senha?{' '}
            <a
              href="/forgot-password"
              className="text-amber-500 hover:underline"
            >
              Clique aqui!
            </a>
          </p>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-slate-50"
          >
            Entrar
          </Button>
        </form>
      </FormProvider>

      <div className="w-full flex items-center gap-2">
        <Separator className="flex-1" />
        <p className="text-sm text-slate-50">Ou</p>
        <Separator className="flex-1" />
      </div>

      <div className="w-full flex flex-col gap-2 py-5">
        <p className="text-sm text-slate-300">Não possui uma conta?</p>
        <Button
          className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-slate-50"
          onClick={() => navegate('/register')}
        >
          Criar conta
        </Button>
      </div>
    </div>
  )
}
