import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { DashboardMenu } from './DashboardMenu'

type PrivateLayoutProps = {
  children?: ReactNode
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50 py-10 px-16">
      <header className="bg-slate-900 text-slate-50 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My App</h1>
        <DashboardMenu />
      </header>
      <main className="grow p-4">{children ?? <Outlet />}</main>
      <footer className="bg-slate-900 text-slate-50 p-4 text-center">
        &copy; 2026 My App. All rights reserved.
      </footer>
    </div>
  )
}
