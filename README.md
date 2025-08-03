# Finance Project - Plataforma de Gerenciamento de Ações e Portfólios

Uma aplicação financeira completa, construída com **React** no frontend e **ASP.NET Core** no backend. A plataforma oferece gerenciamento completo de ações, portfólios de investimento e interações de usuários através de comentários, com segurança garantida por autenticação JWT.

## Demonstração

A aplicação permite aos usuários:
- Registrar-se e fazer login de forma segura
- Buscar e visualizar informações detalhadas de ações
- Gerenciar portfólios personalizados
- Adicionar comentários sobre ações específicas
- Acompanhar o desempenho de investimentos

## Arquitetura do Projeto

O projeto está dividido em duas partes principais:

### **Frontend** (`/frontend`)
- **Framework:** React 19 com TypeScript
- **Styling:** Tailwind CSS
- **Roteamento:** React Router v7
- **Formulários:** React Hook Form + Yup
- **HTTP Client:** Axios
- **UI Components:** React Icons, React Spinners, React Toastify

### **Backend** (`/api`)
- **Framework:** ASP.NET Core 8
- **Linguagem:** C#
- **Banco de Dados:** SQL Server com Entity Framework Core
- **Autenticação:** ASP.NET Core Identity + JWT
- **Documentação:** Swagger (OpenAPI)

## Tecnologias Utilizadas

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form
- Axios
- React Icons
- React Toastify

### Backend
- ASP.NET Core 8
- Entity Framework Core
- ASP.NET Core Identity
- JWT Authentication
- SQL Server
- Swagger/OpenAPI

## Funcionalidades

### Autenticação de Usuários
- Registro de novos usuários com validação
- Login seguro com tokens JWT
- Proteção de rotas e endpoints

### Gerenciamento de Ações
- Operações CRUD completas para ações
- Busca e filtragem por símbolo ou empresa
- Paginação e ordenação de resultados
- Integração com API externa (Financial Modeling Prep)

### Gerenciamento de Portfólio
- Adicionar/remover ações do portfólio pessoal
- Visualização completa do portfólio
- Acompanhamento de investimentos

### Sistema de Comentários
- Comentários associados a ações específicas
- Operações CRUD para comentários
- Vinculação automática ao usuário autor

## Como Executar o Projeto

### Pré-requisitos
- **.NET 8 SDK**
- **Node.js 18+**

### 1. Configuração do Backend

A configuração detalhada do backend (API e banco de dados) está disponível [`aqui`](./api/README.md). Siga as instruções lá para preparar o ambiente backend.

### 2. Configuração do Frontend

#### 2.1. Instalar Dependências

```bash
cd frontend
npm install
```

#### 2.2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `frontend` com o seguinte conteúdo:

```env
REACT_APP_FMPKey=sua_chave_api_financial_modeling_prep
```

Ajuste o valor de `REACT_APP_FMPKey` conforme a chave da sua API Financial Modeling Prep.

#### 2.3. Executar a Aplicação

```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`.

## Documentação da API

Para informações detalhadas sobre todos os endpoints da API, incluindo parâmetros, exemplos de requisições e respostas, consulte a documentação completa:

**[Documentação Completa da API](./api/README.md)**

A documentação da API inclui:
- Detalhes de todos os endpoints disponíveis
- Estrutura do projeto backend
- Exemplos de uso e configuração
- Informações sobre autenticação JWT
- Guia de instalação e execução

## Estrutura do Projeto

```
finance_project/
├── README.md
├── finance_project.sln
├── api/                          # Backend ASP.NET Core
│   ├── Controllers/              # Controladores da API
│   ├── Data/                     # Contexto do banco de dados
│   ├── Dtos/                     # Data Transfer Objects
│   ├── Models/                   # Entidades do domínio
│   ├── Repository/               # Padrão Repository
│   ├── Service/                  # Serviços (JWT, FMP)
│   ├── Interfaces/               # Contratos das dependências
│   ├── Mappers/                  # Mapeamento Model ↔ DTO
│   ├── Migrations/               # Migrações do EF Core
│   └── Program.cs                # Configuração da aplicação
└── frontend/                     # Frontend React
    ├── src/
    │   ├── Components/           # Componentes React
    │   ├── Pages/                # Páginas da aplicação
    │   ├── Services/             # Serviços HTTP
    │   ├── Context/              # Contexts do React
    │   ├── Routes/               # Configuração de rotas
    │   └── Models/               # Interfaces TypeScript
    └── public/                   # Arquivos estáticos
```

---

*O projeto foi desenvolvido com base no curso completo do criador **Teddy Smith** no YouTube, que abrange toda a stack utilizada neste projeto. [Finance Project - Teddy Smith](https://youtube.com/playlist?list=PL82C6-O4XrHcNJd4ejg8pX5fZaIDZmXyn&si=5cUnRxUPg-yj8_6H)*