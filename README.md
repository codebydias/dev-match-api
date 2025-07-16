# 🚀 Projeto API devMatch

**devMatch** (ou _nome a definir_) é uma API backend desenvolvida com **Fastify + TypeScript**, com foco em performance, escalabilidade e uma arquitetura modular bem definida.

O objetivo principal é **conectar desenvolvedores**, incentivando o **networking**, a **troca de conhecimento** e, futuramente, **a conexão com empresas**. A API é preparada para ser consumida por aplicações **frontend web** e **mobile**, com endpoints seguros, validados e organizados.

---

## 🎯 Finalidade

Criar uma plataforma que centralize a comunidade dev para:

- Compartilhar dúvidas, descobertas e experiências nas stacks do momento
- Ajudar outros devs e crescer junto na bolha tech
- Possibilitar conexões com empresas no futuro

---

## ✨ Features

- ⚡️ Fastify + TypeScript com tipagem forte
- 🧱 Estrutura modular por features
- 🔐 JWT Auth com middleware global
- ✅ Validação de dados com Zod
- 🧼 Commits padronizados com Conventional Commits
- 🛠️ Prisma ORM com PostgreSQL

---

## 🏗️ Estrutura de Pastas

```bash
src/
├── config/              # Configurações globais (ex: JWT)
├── features/            # Features principais (ex: user, feed)
│   └── user/            # Camadas de service, controller, schema, etc.
├── middleware/          # Middlewares (ex: autenticação)
├── plugins/             # Plugins Fastify customizados
├── routes/              # Rotas agrupadas e organizadas
├── utils/               # Funções utilitárias
├── server.ts            # Arquivo principal de boot
└── docker-compose.yml   # Ambiente Docker opcional
