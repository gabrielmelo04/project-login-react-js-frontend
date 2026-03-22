# Criar o projeto:
    - pnpm create vite@latest

  ## Instalar o tailwindcss
    - pnpm install tailwindcss @tailwindcss/vite

  ## Instalar o Biome
    - pnpm i -D @biomejs/biome

  ## Instalar o React-router-dom:
    - pnpm i react-router-dom

  ## Instalar o Shadcn ui
    - pnpm dlx shadcn@latest init
    - No tsconfig -> colcoar antes de instalar o shadcn:
      {
        "compilerOptions": {
          "baseUrl": ".",
          "paths": {
            "@/*": ["./src/*"]
          }
        } 
      }
    - No vite.config:
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },

   ## Adicionar essas 2 libs de icones
   - pnpm i react-icons
   - pnpm add lucide-react@next

  ## Instalar o React Hook Form
  - pnpm install react-hook-form

  ## Instalar validações:
  - pnpm i zod @hookform/resolvers
