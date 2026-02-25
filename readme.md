# Blog API -- Node.js + TypeScript + MongoDB

API RESTful desenvolvida com Node.js, TypeScript e MongoDB, estruturada
com boas práticas de arquitetura backend, separação de responsabilidades
e controle de autenticação/autorização.

Este projeto demonstra organização em camadas (Controllers, Services,
DTOs, Middlewares, Validators e Serializers), autenticação JWT e
controle de acesso baseado em permissões.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js
-   TypeScript
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Token (JWT)
-   ESLint

------------------------------------------------------------------------

## 🏗️ Arquitetura do Projeto

O projeto segue separação clara de responsabilidades:

src/
├── configs/ # Conexão com banco de dados
├── controllers/ # Camada de controle HTTP
├── services/ # Regras de negócio
├── models/ # Schemas Mongoose
├── routes/ # Definição das rotas
├── middlewares/ # Autenticação e autorização
├── validators/ # Validação de dados
├── dto/ # Data Transfer Objects
├── serializers/ # Formatação de resposta
├── app.ts # Configuração principal
├── server.ts # Inicialização do servidor

### Padrões aplicados

-   Separação Controller → Service
-   DTO para controle de entrada de dados
-   Middleware de autenticação com JWT
-   Middleware de autorização (admin)
-   Serialização de respostas
-   Tipagem customizada no Express
-   Organização preparada para escalar

------------------------------------------------------------------------

## 🔐 Autenticação e Autorização

-   Login com geração de token JWT
-   Middleware para validação do token
-   Controle de acesso baseado em perfil (admin)

------------------------------------------------------------------------

## 📌 Funcionalidades

### 👤 Usuários

-   Registro de usuário
-   Login
-   Listagem de usuários
-   Controle de permissões

### 📝 Posts

-   Criar post
-   Listar posts
-   Buscar post por ID
-   Atualizar post
-   Deletar post

------------------------------------------------------------------------

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/lucasb2b/blog-api-ts.git 
cd blog-api-ts
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
PORT=3000 MONGO_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=sua_chave_secreta
```

### 4. Execute em modo desenvolvimento

```bash
npm run dev
```

### 5. Build para produção

```bash
npm run build 
npm start
```

------------------------------------------------------------------------

## 📡 Exemplos de Endpoints

### Autenticação

`POST /users/login`

Body:

```json
{ 
  "email": "user@email.com", 
  "password": "123456" 
}
```

------------------------------------------------------------------------

### Criar Post

`POST /posts`

Headers:

```yaml
Authorization: Bearer {token}
```

Body:

```json
{ 
  "title": "Meu Post", 
  "content": "Conteúdo do post" 
}
```

------------------------------------------------------------------------

## 📌 Diferenciais Técnicos

-   Arquitetura em camadas
-   Código totalmente tipado com TypeScript
-   Separação clara de responsabilidades
-   Controle de acesso baseado em roles
-   Organização próxima de ambiente de produção
-   Estrutura pronta para escalar

------------------------------------------------------------------------

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte do meu portfólio backend, com
foco em boas práticas, organização de código e construção de APIs
escaláveis utilizando o ecossistema JavaScript.

------------------------------------------------------------------------

## 👨‍💻 Autor

Lucas Lima
Full Stack JavaScript Developer

LinkedIn: https://www.linkedin.com/in/lucas-lima-brito/
GitHub: https://github.com/lucasb2b