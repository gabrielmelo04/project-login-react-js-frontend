
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

type PrivateLayoutProps = {
  children?: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
        <header className="bg-slate-900 text-slate-50 p-4">
            <h1 className="text-2xl font-bold">My App</h1>
        </header>
        <main className="grow p-4">
            {children ?? <Outlet />}
        </main>
        <footer className="bg-slate-900 text-slate-50 p-4 text-center"> 
            &copy; 2026 My App. All rights reserved.
        </footer>
    </div>
  );
}