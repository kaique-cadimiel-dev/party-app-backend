# Party App - Backend

Este é o serviço de backend para o **Party App**, uma aplicação para gerenciamento e organização de festas. O backend foi construído seguindo princípios de arquitetura limpa e modular, utilizando Node.js, Express e Firebase.

## 🚀 Descrição do Projeto

O objetivo deste backend é fornecer uma API robusta para autenticação de usuários, gerenciamento de perfis e, futuramente, controle de eventos, convidados e listas de presença.

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **TypeScript**: Ambiente de execução e linguagem.
- **Express**: Framework web para criação das rotas e middlewares.
- **Firebase Admin SDK**: Gerenciamento de usuários e banco de dados Firestore.
- **Firebase Identity Toolkit (REST API)**: Autenticação de usuários (Login e Recuperação de Senha).
- **Vitest** & **Supertest**: Ferramentas para testes unitários e de integração.

## 🏗️ Arquitetura

O projeto utiliza uma estrutura de camadas para separar responsabilidades:

- **`src/routes/`**: Define os endpoints da API e direciona as requisições para os controladores.
- **`src/controllers/`**: Processa as requisições HTTP, valida dados de entrada básicos e envia respostas ao cliente.
- **`src/services/`**: Contém a lógica de negócio e as integrações externas (Firebase Auth/Firestore).
- **`src/types/`**: Definições de interfaces TypeScript para garantir consistência em toda a aplicação.
- **`src/config/`**: Configurações de ambiente e inicialização de bibliotecas (Firebase).

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Instalação e Configuração

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/kaique-cadimiel-dev/party-app-backend.git
   cd party-app-backend
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Firebase:
   ```env
   FIREBASE_API_KEY=sua_web_api_key_aqui
   
   # Credenciais do Firebase Admin
   TYPE=service_account
   PROJECT_ID=seu_projeto_id
   PRIVATE_KEY_ID=seu_private_key_id
   PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   CLIENT_EMAIL=seu_client_email
   CLIENT_ID=seu_client_id
   # ... outras variáveis conforme necessário
   ```

## 🚀 Executando o Projeto

- **Modo de Desenvolvimento:**
  ```bash
  npm run dev
  ```
  O servidor iniciará em `http://localhost:3000` (ou na porta configurada).

- **Build para Produção:**
  ```bash
  npm run build
  npm start
  ```

- **Executar Testes:**
  ```bash
  npm test
  ```

## 🛣️ Endpoints Principais

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/users` | Registra um novo usuário (nome, email, senha). |
| `POST` | `/api/login` | Autentica um usuário e retorna tokens de acesso. |
| `POST` | `/api/forgot-password` | Envia e-mail de recuperação de senha. |
| `GET` | `/api/users/:id` | Retorna os dados de um usuário específico. |

---
Desenvolvido por [Kaique Cadimiel](https://github.com/kaique-cadimiel-dev).
