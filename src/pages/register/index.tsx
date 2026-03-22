import { LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../../components/ui/button";
import { Field, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { PasswordInput } from "../../components/ui/password-input";
import { Separator } from "../../components/ui/separator";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    name: z.string().min(4, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit } = registerForm;

  const navigate = useNavigate()

  function handleRegister(data: RegisterFormData) {
    console.log("Dados do formulário:", data);
    // Aqui você pode adicionar a lógica para enviar os dados de registro para o servidor
  }

  return (
    <div className="absolute w-[90%] md:w-3/5 lg:w-2/5 h-screen bg-slate-800 flex flex-col justify-center items-start right-0 shadow-xl px-5 ">
      <h1 className="w-full border-b border-slate-50 text-2xl text-slate-50 pb-2">
        Crie sua conta
      </h1>

      <div className="w-full flex justify-center mt-5">
        <Button className="cursor-pointer p-5 text-lg">
          <FcGoogle className="size-6" />
          Google
        </Button>
      </div>

      <FormProvider {...registerForm}>
        <form
          className="w-full py-4 flex flex-col gap-4"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Field className="relative">
            <FieldLabel>Nome</FieldLabel>
            <Input type="text" placeholder="Digite seu nome" name="name" />
          </Field>

          <Field className="relative">
            <FieldLabel>E-mail</FieldLabel>
            <Input type="email" placeholder="Digite seu e-mail" name="email" />
          </Field>

          <Field className="relative">
            <FieldLabel>Senha</FieldLabel>
            <PasswordInput placeholder="Digite sua senha" name="password" />
          </Field>

          <Field className="relative">
            <FieldLabel>Confirmar Senha</FieldLabel>
            <PasswordInput
              placeholder="Digite sua senha novamente"
              name="confirmPassword"
            />
          </Field>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-slate-50"
          >
            Criar conta
          </Button>
        </form>
      </FormProvider>

      <div className="w-full flex items-center gap-2">
        <Separator className="flex-1" />
        <p className="text-sm text-slate-50">Ou</p>
        <Separator className="flex-1" />
      </div>

      <div className="w-full flex flex-col gap-2 py-5">
        <p className="text-sm text-slate-300">Já possui uma conta?</p>
        <Button className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-slate-50" onClick={() => navigate('/login')}>
          <LogIn className="mr-2" />
          Entrar na minha conta
        </Button>
      </div>
    </div>
  );
}
