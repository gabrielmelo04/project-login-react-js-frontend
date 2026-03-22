
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

type PublicLayoutProps = {
  children?: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
        <main className="grow">
            {children ?? <Outlet />}
        </main>
    </div>
  );
}