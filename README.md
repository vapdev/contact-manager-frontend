# Contact Manager Frontend

Uma aplicação web moderna para gerenciar contatos, construída com Next.js, React, TypeScript e TailwindCSS.

## ✨ Funcionalidades
- Cadastro, login e logout de usuários
- Listagem, busca, criação, edição e exclusão de contatos
- Interface responsiva e amigável
- Feedback visual de carregamento em todas as ações
- Rotas protegidas para usuários autenticados
- Testes de componentes com Jest e Testing Library

## 🚀 Como rodar o projeto

### 1. Pré-requisitos
- Node.js 18+
- npm ou yarn

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto, se necessário, e adicione as variáveis de API:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Rode o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

### 5. Rodando os testes
```bash
npm test
# ou
yarn test
```

## 🧪 Testes
- Os testes de componentes estão em `src/components/__tests__`
- Para rodar todos os testes:
  ```bash
  npx jest --verbose
  ```
- O ambiente já está configurado com Jest, Testing Library, Babel e TypeScript.

## 📁 Estrutura do Projeto
```
contact-manager-frontend/
├── src/
│   ├── app/           # Páginas e rotas Next.js
│   ├── components/    # Componentes React e testes
│   ├── context/       # Contexto de autenticação
│   ├── services/      # Serviços de API
│   └── types/         # Tipos TypeScript
├── public/            # Arquivos estáticos
├── jest.config.json   # Configuração do Jest
├── babel.config.js    # Configuração do Babel
├── tsconfig.json      # Configuração do TypeScript
└── ...
```

## 🛠️ Tecnologias
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

## 👤 Autenticação
- O fluxo de autenticação utiliza JWT.
- O token é salvo no `localStorage` e enviado nas requisições para a API.

## 💡 Dicas
- Para rodar em produção, use `npm run build` e `npm start`.
- O backend deve estar rodando e acessível na URL configurada em `NEXT_PUBLIC_API_URL`.

---

Feito com 💙 por Vitor e colaboradores.
