# 🚀 Projeto TourApp

**TourApp** (ou *TourGuia*) é uma aplicação backend desenvolvida com **Fastify + TypeScript**, com o objetivo de fornecer uma API moderna, eficiente e bem estruturada para gerenciar **pontos turísticos, pacotes de viagem, usuários e guias locais**.

A API foi projetada para ser consumida por aplicações **frontend** e **mobile**, oferecendo endpoints seguros, validados e prontos para escalar. O projeto adota uma arquitetura modular, com foco em performance, boas práticas e manutenibilidade.

### 🎯 Finalidade

A finalidade do TourApp é **conectar viajantes a experiências locais autênticas**, fornecendo uma base robusta para funcionalidades como:

- Cadastro e listagem de pontos turísticos
- Gerenciamento de usuários e seus perfis
- Integração com serviços de pagamento *(futuramente)*
- Registro de passeios, reservas e avaliações

Este projeto é ideal tanto para **MVPs** quanto para **startups** no setor de turismo digital.

---

## ✨ Features

- 🔥 Fastify com suporte completo a TypeScript  
- 📁 Estrutura modular: rotas, controllers, serviços, schemas e plugins  
- ✅ Suporte a validações (Zod-ready)  
- 🧪 Preparado para testes e expansão  
- 🧹 Commits limpos e padronizados com Conventional Commits  

---

## 🏗️ Estrutura de Pastas

```bash
src/
├── routes/         # Definição das rotas
├── controllers/    # Camada de controle
├── services/       # Regras de negócio
├── schemas/        # Validações e tipos
├── plugins/        # Plugins customizados
└── server.ts       # Inicialização da aplicação
