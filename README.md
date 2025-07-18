# API ASP.NET para Gerenciamento de Ações e Portfólios

Uma API RESTful robusta, construída com ASP.NET Core e C#, projetada para uma aplicação financeira. Oferece gerenciamento completo de ações, portfólios de investimento e interações de usuários através de comentários, com segurança garantida por autenticação JWT e uma arquitetura limpa baseada no padrão de repositório.

## Funcionalidades

  * **Autenticação de Usuários:**
      * Registro de novos usuários com e-mail e senha.
      * Login de usuários para obtenção de um token de acesso JWT.
  * **Gerenciamento de Ações:**
      * Operações CRUD (Criar, Ler, Atualizar, Deletar) para ações no mercado.
      * Busca e filtragem de ações por símbolo ou nome da empresa.
      * Paginação e ordenação dos resultados da busca.
  * **Gerenciamento de Portfólio:**
      * Adicionar e remover ações do portfólio de um usuário autenticado.
      * Visualizar todas as ações presentes no portfólio do usuário.
  * **Gerenciamento de Comentários:**
      * Adicionar, visualizar, atualizar e deletar comentários sobre ações específicas.
      * Os comentários são associados ao usuário que os criou.

## Tecnologias Utilizadas

  * **Framework:** ASP.NET Core 8
  * **Linguagem:** C\#
  * **Banco de Dados:** SQL Server com Entity Framework Core.
  * **Autenticação:** ASP.NET Core Identity para gerenciamento de usuários e JWT (JSON Web Tokens) para autorização de endpoints.
  * **Documentação da API:** Swagger (OpenAPI) para documentação e teste interativo dos endpoints.

## Estrutura do Projeto

O projeto segue uma arquitetura bem definida, separando as responsabilidades em diferentes pastas para manter o código organizado e escalável.

**`Controllers/`**: Contém os controladores da API, responsáveis por gerenciar as requisições HTTP e orquestrar as respostas. Eles recebem as chamadas, validam os dados e utilizam os repositórios para interagir com o banco de dados.
  * **`AccountController.cs`**: Gerencia o registro e login dos usuários.
  * **`StockController.cs`**: Expõe os endpoints para as operações CRUD de ações.
  * **`CommentController.cs`**: Expõe os endpoints para os comentários.
  * **`PortfolioController.cs`**: Gerencia as operações do portfólio do usuário.

**`Data/`**: Contém a classe `ApplicationDBContext.cs`, que é o contexto do Entity Framework Core. Ela define a sessão com o banco de dados, especifica os `DbSet`s (tabelas) e configura o modelo de dados e suas relações.

**`Dtos/`**: (Data Transfer Objects) Define as classes que moldam os dados enviados e recebidos pela API. Isso evita que os modelos do domínio (entidades do banco) sejam expostos diretamente, adicionando uma camada de segurança e flexibilidade. Existem DTOs para criação, atualização e visualização de dados.

**`Interfaces/`**: Define os contratos (interfaces) para os repositórios e serviços. Isso é fundamental para a injeção de dependência e para desacoplar a lógica de negócio da implementação concreta do acesso a dados.

**`Mappers/`**: Contém classes estáticas com métodos de extensão para mapear os `Models` para `DTOs` e vice-versa. Isso centraliza a lógica de conversão e mantém os controladores e repositórios mais limpos.

**`Migrations/`**: Contém os arquivos de migração gerados pelo Entity Framework Core, que rastreiam as alterações no modelo de dados e as aplicam ao schema do banco de dados.

**`Models/`**: Representa as entidades do banco de dados (o domínio da aplicação), como `Stock`, `Comment`, `AppUser`, e `Portfolio`.

**`Repository/`**: Implementa as interfaces definidas em `Interfaces/`. Contém a lógica de acesso a dados usando o `ApplicationDBContext` para consultar e manipular as informações no banco de dados, seguindo o padrão de repositório.

**`Service/`**: Contém serviços com lógicas específicas, como o `TokenService`, que é responsável por criar os tokens JWT para os usuários autenticados.

**`Program.cs`**: Arquivo principal que configura e inicializa a aplicação, incluindo serviços, injeção de dependência, autenticação e o pipeline de requisições HTTP.

## Fluxo de Execução e Estruturas Envolvidas

Aqui está o passo a passo de como um usuário interage com a API, com um detalhamento das estruturas do projeto que entram em ação em cada etapa.

### 1. Registrar uma Nova Conta

Um novo usuário cria uma conta para começar a usar a aplicação.

* **Requisição:** `POST /api/account/register`

#### Como funciona internamente:
1.  A requisição chega ao `AccountController.cs` na pasta **`Controllers/`**.
2.  O controlador recebe os dados do usuário, que são modelados pelo `RegisterDto` da pasta **`Dtos/Account/`**.
3.  A lógica do controlador utiliza o serviço `UserManager<AppUser>` do ASP.NET Identity para processar o registro. O `AppUser` é a entidade de usuário definida na pasta **`Models/`**.
4.  O `UserManager` cria o novo usuário e o salva no banco de dados através do `ApplicationDBContext` (definido em **`Data/`**), que gerencia a comunicação com o banco.
5.  Ao final, o controlador retorna um `NewUserDto` confirmando que a operação foi bem-sucedida.

### 2. Fazer Login para Obter um Token

O usuário se autentica para obter um token de acesso.

* **Requisição:** `POST /api/account/login`

#### Como funciona internamente:
1.  A requisição de login também é recebida pelo `AccountController.cs` (**`Controllers/`**).
2.  O controlador usa o `LoginDto` (**`Dtos/Account/`**) para obter as credenciais.
3.  Após validar o usuário e a senha, o controlador invoca o `ITokenService` (contrato da pasta **`Interfaces/`**).
4.  A implementação `TokenService.cs`, localizada na pasta **`Service/`**, é responsável por criar o token JWT.
5.  O `AccountController` retorna o token dentro de um `NewLoginDto`.

### 3. Utilizar o Token para Acessar Rotas Protegidas

Com o token em mãos, o usuário pode acessar funcionalidades restritas.

* **Requisição:** Ex: `GET /api/portfolio`
* **Cabeçalho:** `Authorization: Bearer <seu_token_jwt_aqui>`

#### Como funciona internamente:
1.  Para cada requisição a um endpoint com o atributo `[Authorize]`, o pipeline de autenticação do ASP.NET Core, configurado no arquivo **`Program.cs`**, intercepta a chamada.
2.  O middleware de autenticação JWT valida a assinatura e o tempo de expiração do token. Se o token for válido, a identidade do usuário é estabelecida.
3.  Nos controladores, métodos de extensão como `GetUsername()` (definido em **`Extensions/ClaimsExtensions.cs`**) podem ser usados para extrair as informações do usuário diretamente das `claims` do token.

### 4. Interagir com a API (Ex: Adicionar Ação ao Portfólio)

O usuário autenticado agora pode gerenciar seu portfólio.

* **Requisição:** `POST /api/portfolio?symbol=MSFT`

#### Como funciona internamente:
1.  A requisição é direcionada para o `PortfolioController.cs` (**`Controllers/`**).
2.  O controlador utiliza o `IPortfolioRepository` e o `IStockRepository` (interfaces de **`Interfaces/`**) para interagir com a lógica de dados.
3.  As implementações `PortfolioRepository.cs` e `StockRepository.cs`, na pasta **`Repository/`**, executam as operações no banco. Por exemplo, encontram a ação (`Stock`) pelo símbolo e a associam ao usuário (`AppUser`) na tabela de junção `Portfolio`.
4.  Todas as entidades envolvidas (`AppUser`, `Stock`, `Portfolio`) são definidas na pasta **`Models/`**.
5.  A camada de repositório usa o `ApplicationDBContext` (**`Data/`**) para efetivar as mudanças no banco de dados.

## Endpoints da API

Todos os endpoints, exceto `/register` e `/login`, requerem um token JWT de autorização no cabeçalho da requisição (`Authorization: Bearer <token>`).

### **Account**

| Método HTTP | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/account/register` | Registra um novo usuário com nome de usuário, e-mail e senha. | Não requerida |
| `POST` | `/api/account/login` | Autentica um usuário existente e retorna um token de acesso JWT. | Não requerida |

### **Stock**

| Método HTTP | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stock` | Retorna uma lista de ações, com suporte para filtros, ordenação e paginação. | Requerida |
| `GET` | `/api/stock/{id}` | Busca e retorna uma ação específica pelo seu ID. | Requerida |
| `POST` | `/api/stock` | Cria uma nova ação no sistema. | Requerida |
| `PUT` | `/api/stock/{id}` | Atualiza os dados de uma ação existente. | Requerida |
| `DELETE` | `/api/stock/{id}` | Remove uma ação do sistema. | Requerida |

### **Portfolio**

| Método HTTP | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Retorna todas as ações que fazem parte do portfólio do usuário autenticado. | Requerida |
| `POST` | `/api/portfolio` | Adiciona uma ação (identificada pelo símbolo no query param) ao portfólio do usuário. | Requerida |
| `DELETE` | `/api/portfolio` | Remove uma ação (identificada pelo símbolo no query param) do portfólio do usuário. | Requerida |

### **Comment**

| Método HTTP | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/comment` | Retorna todos os comentários existentes no sistema. | Requerida |
| `GET` | `/api/comment/{id}` | Busca e retorna um comentário específico pelo seu ID. | Requerida |
| `POST` | `/api/comment/{stockId}` | Cria um novo comentário associado a uma ação específica. | Requerida |
| `PUT` | `/api/comment/{id}` | Atualiza o conteúdo de um comentário existente. | Requerida |
| `DELETE` | `/api/comment/{id}` | Remove um comentário do sistema. | Requerida |

## Como Rodar o Projeto 

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

  * **.NET 8 SDK**
  * **SQL Server**

### 1. Configurar o `appsettings.json`

Você precisará criar ou modificar o arquivo `api/appsettings.json` para adicionar as configurações do banco de dados e do JWT. O arquivo `.gitignore` está configurado para ignorar este arquivo, então você pode criar o seu sem medo de versioná-lo.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=???;Initial Catalog=???;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "JWT": {
    "Issuer": "???",
    "Audience": "???",
    "SigningKey": "???"
  }
}
```

**Importante:** *Atualize todos os campos com `???` com suas configurações corretas e válidas.*


### 2. Atualizar o Banco de Dados

Primeiro, instale o Entity Framework Core CLI globalmente com o seguinte comando:

```bash
dotnet tool install --global dotnet-ef --version 8.0.0
```

Em seguida, abra um terminal na pasta `api` e execute o comando do Entity Framework Core para aplicar as migrações e criar o banco de dados.

```bash
dotnet ef database update
```

Isso criará o banco de dados e todas as tabelas, incluindo as tabelas do Identity e as roles `Admin` e `User`.

### 3. Executar a Aplicação

Ainda no terminal, na pasta `api`, execute o seguinte comando para iniciar a API:

```bash
dotnet watch run
```

A API estará em execução e você poderá acessar a documentação do Swagger no endereço exibido no terminal (geralmente `http://localhost:5249/swagger`).