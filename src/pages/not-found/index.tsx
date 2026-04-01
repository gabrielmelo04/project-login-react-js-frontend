import { Link } from 'react-router-dom'

export function NotFoundPage() {
  const isAuthenticated = Boolean(localStorage.getItem('token'))
  const backTo = isAuthenticated ? '/' : '/login'
  const backLabel = isAuthenticated
    ? 'Voltar para o Dashboard'
    : 'Ir para o login'

  return (
    <section className="grid place-items-center text-slate-100 px-6 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Erro 404
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">
          Página não encontrada
        </h1>
        <p className="mt-4 text-slate-300">
          A rota que você tentou acessar não existe ou foi movida.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to={backTo}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
