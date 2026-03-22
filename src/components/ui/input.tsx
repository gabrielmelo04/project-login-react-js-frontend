import * as React from 'react'

import { cn } from '../../lib/utils'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type InputProps = React.ComponentProps<'input'> & {
  showError?: boolean
}

function Input({ className, type, showError = true, ...props }: InputProps) {

  const { register, formState: { errors } } = useFormContext()

  return (
    <>
      <input
        type={type}
        data-slot="input"

        className={cn(
          'h-9 w-full min-w-0 rounded-sm border border-input bg-slate-700 px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] border-none outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-slate-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className,
        )}
        {...props}
        {...register(props.name!)}
      
      />
      {
        showError && props.name && (
          <ErrorMessage 
            errors={errors}
            name={props.name as string}
            render={({ message }) => <p className="text-sm text-rose-500">{message}</p>}
          />
        )
      }
    </>
  )
}

export { Input }
