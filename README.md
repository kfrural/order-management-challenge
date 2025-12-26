# Order Management Challenge – Backend

Este projeto foi desenvolvido como parte de um **desafio técnico backend**, com o objetivo de demonstrar **organização de código, domínio de TypeScript, modelagem com Mongoose e implementação de regras de negócio**.

---

## 📌 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **Vitest** (testes unitários)

---

## 📁 Estrutura do Projeto

A arquitetura foi organizada visando **separação de responsabilidades**, **facilidade de manutenção** e **testabilidade**:

```

src/
├─ config/
│   ├─ database.ts
│   └─ env.ts
├─ middlewares/
│   └─ auth.middleware.ts
├─ modules/
│   ├─ auth/
│   │   ├─ auth.controller.ts
│   │   ├─ auth.routes.ts
│   │   └─ auth.service.ts
│   ├─ orders/
│   │   ├─ order.controller.ts
│   │   ├─ order.model.ts
│   │   ├─ order.routes.ts
│   │   └─ order.service.ts
│   └─ users/
│       └─ user.model.ts
├─ tests/
│   └─ order-state.spec.ts
├─ app.ts
└─ server.ts

```

---

## 🧠 Regras de Negócio Implementadas

### 👤 Autenticação
- Registro de usuário
- Login com retorno de **JWT**
- Middleware de autenticação protegendo as rotas de pedidos

### 📦 Gestão de Pedidos
- Criação de pedidos com:
  - `state` inicial **CREATED**
  - `status` inicial **ACTIVE**
- Listagem de pedidos com:
  - Paginação
  - Filtro por `state`

### ✅ Validações
- Não é permitido criar pedidos:
  - Sem serviços
  - Com valor total dos serviços igual ou menor que zero

### 🔄 Fluxo de Estados
O fluxo de estados do pedido segue **ordem estrita**:

```

CREATED → ANALYSIS → COMPLETED

````

- Não é permitido:
  - Pular etapas
  - Retroceder estados
- Endpoint dedicado para avanço de estado:
  - `PATCH /orders/:id/advance`

---

## 🧪 Testes Unitários

Os testes foram implementados com **Vitest**, focando nas regras críticas de negócio.

### O que é testado:
- Transição válida entre estados
- Bloqueio de transições inválidas

Exemplo:
- ✅ CREATED → ANALYSIS
- ❌ COMPLETED → (qualquer outro estado)

---

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone <link-do-repositorio>
cd order-management-challenge
````

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/order-management
JWT_SECRET=supersecretkey
```

### 4️⃣ Executar em ambiente de desenvolvimento

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 🧪 Executar Testes

```bash
npm run test
```

---

## 📡 Principais Endpoints

### 🔐 Autenticação

| Método | Rota           | Descrição              |
| ------ | -------------- | ---------------------- |
| POST   | /auth/register | Registro de usuário    |
| POST   | /auth/login    | Login e retorno do JWT |

### 📦 Pedidos (Protegidos)

| Método | Rota                | Descrição                       |
| ------ | ------------------- | ------------------------------- |
| POST   | /orders             | Criação de pedido               |
| GET    | /orders             | Listagem com paginação e filtro |
| PATCH  | /orders/:id/advance | Avança o estado do pedido       |

---

## 🎯 Decisões Técnicas

* **Service Layer** para regras de negócio, facilitando testes e manutenção
* **Middlewares** para autenticação e segurança
* **Enums e tipagem forte** para garantir consistência dos dados
* **Testes unitários desacoplados do Express/Mongoose**, focando lógica pura

---

## 🧩 Melhorias Futuras

* Soft delete real utilizando `status`
* Testes de integração
* Paginação retornando metadata
* Documentação via Swagger

---

## 👨‍💻 Autor

**Karla Ferreira**
Estudante de Ciência da Computação e Engenharia de Software.

---
