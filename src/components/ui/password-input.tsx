import { ErrorMessage } from '@hookform/error-message'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { cn } from '../../lib/utils'

type PasswordInputProps = Omit<React.ComponentProps<'input'>, 'type'>

function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <div className="relative">
        <Input
          type={isVisible ? 'text' : 'password'}
          className={cn('pr-10', className)}
          showError={false}
          {...props}
        />

        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-200 cursor-pointer"
          aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {isVisible ? <Eye size={18} /> : <EyeClosed size={18} />}
        </button>
      </div>
      <ErrorMessage
        errors={errors}
        name={props.name as string}
        render={({ message }) => (
          <p className="text-sm text-rose-500">{message}</p>
        )}
      />
    </>
  )
}

export { PasswordInput }
