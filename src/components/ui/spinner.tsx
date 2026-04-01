import { Loader2Icon } from 'lucide-react'

export function Spinner({ className = '' }: { className?: string }) {
  return <Loader2Icon className={`animate-spin text-slate-200 ${className}`} />
}
