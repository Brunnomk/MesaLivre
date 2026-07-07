# 🍽️ MesaLivre

### Sistema Profissional de Gestão de Reservas para Restaurantes

<p align="center">

![Static Badge](https://img.shields.io/badge/Angular-20-DD0031)
![Static Badge](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F)
![Static Badge](https://img.shields.io/badge/Java-21-orange)
![Static Badge](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Static Badge](https://img.shields.io/badge/JWT-Authentication-black)
![Static Badge](https://img.shields.io/badge/REST%20API-Ready-blue)
![Static Badge](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Static Badge](https://img.shields.io/badge/SCSS-Styling-CC6699)
![Static Badge](https://img.shields.io/badge/Spring%20Security-Secure-6DB33F)
![Static Badge](https://img.shields.io/badge/Hibernate-ORM-59666C)
![Static Badge](https://img.shields.io/badge/Maven-Build-C71A36)
![Static Badge](https://img.shields.io/badge/RxJS-Reactive-B7178C)
![Static Badge](https://img.shields.io/badge/Responsive-Mobile%20First-success)
![Static Badge](https://img.shields.io/badge/Vercel-Frontend-000000)
![Static Badge](https://img.shields.io/badge/Render-Backend-46E3B7)
![Static Badge](https://img.shields.io/badge/Neon-PostgreSQL-00E599)

</p>

<p align="center">
Sistema Full Stack para gerenciamento inteligente de reservas, mesas, clientes e disponibilidade em restaurantes.
</p>

---

# 📖 Visão Geral

O **MesaLivre** é uma aplicação Full Stack desenvolvida para modernizar o processo de gerenciamento de reservas em restaurantes.

A plataforma permite que administradores controlem mesas, clientes, disponibilidade e reservas em tempo real através de uma interface moderna e totalmente responsiva.

O projeto foi construído utilizando práticas modernas de desenvolvimento de software, arquitetura em camadas, APIs REST e autenticação baseada em JWT.

---

# 🎯 Objetivos do Projeto

O MesaLivre foi desenvolvido para demonstrar conhecimentos avançados em:

- Desenvolvimento Full Stack
- Arquitetura Cliente-Servidor
- APIs RESTful
- Angular Standalone
- Spring Boot
- PostgreSQL
- Segurança com JWT
- Modelagem de Banco de Dados
- Responsividade Mobile First
- Integração Frontend ↔ Backend
- Boas Práticas de Engenharia de Software

---

# ✨ Principais Funcionalidades

## 🔐 Sistema de Autenticação

- Cadastro de usuários
- Login seguro
- Autenticação JWT
- Proteção de rotas
- Controle de sessão
- Logout seguro

---

## 📊 Dashboard Inteligente

Visualização operacional em tempo real:

- Total de reservas
- Reservas do dia
- Clientes cadastrados
- Mesas disponíveis
- Taxa de ocupação
- Reservas recentes
- Indicadores de desempenho

---

## 🏢 Gestão de Restaurantes

- Cadastro de restaurantes
- Atualização de dados
- Exclusão de registros
- Consulta detalhada
- Integração completa com API REST

---

## 🪑 Gestão de Mesas

- Cadastro de mesas
- Capacidade por mesa
- Status operacional
- Controle de disponibilidade
- Relacionamento com restaurantes

---

## 👥 Gestão de Clientes

- Cadastro de clientes
- Pesquisa por nome
- Gerenciamento de informações
- Exclusão de registros
- Identificação de clientes VIP

---

## 📅 Gestão de Reservas

- Criação de reservas
- Associação automática entre clientes e mesas
- Controle de horário
- Histórico completo
- Consulta de reservas

### Status suportados

- AGENDADA
- CONFIRMADA
- CANCELADA
- FINALIZADA
- NO-SHOW

---

## 📈 Controle de Disponibilidade

O sistema realiza o controle operacional das mesas permitindo:

- Consulta em tempo real
- Verificação de ocupação
- Controle de conflitos
- Gestão eficiente de capacidade

---

## 🎭 Modo Demonstração

Além do ambiente real conectado ao backend:

- Dados simulados
- Persistência LocalStorage
- Ideal para apresentações
- Demonstração sem necessidade de API

---

# 🏗️ Arquitetura da Solução

```text
┌─────────────────────┐
│     Angular App     │
│      Frontend       │
└──────────┬──────────┘
           │ HTTP/REST
           ▼
┌─────────────────────┐
│   Spring Boot API   │
│ Business Rules      │
│ Authentication JWT  │
└──────────┬──────────┘
           │ JPA/Hibernate
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│ Persistence Layer   │
└─────────────────────┘
```

---

# 📋 Regras de Negócio

✅ Um restaurante possui múltiplas mesas

✅ Cada mesa possui capacidade definida

✅ Um cliente pode possuir várias reservas

✅ Uma mesa não pode receber reservas conflitantes

✅ A disponibilidade é calculada dinamicamente

✅ Reservas possuem fluxo de status controlado

✅ Histórico operacional das reservas

✅ Controle de ocupação em tempo real

---

# 🧱 Modelo de Dados

Principais entidades:

```text
Usuários
    │
    ├── Autenticação
    │
Restaurantes
    │
    ├── Mesas
    │
Clientes
    │
    └── Reservas
```

---

# 🛠️ Tecnologias Utilizadas

## Frontend

- Angular 20 Standalone
- TypeScript
- SCSS
- Angular Router
- RxJS
- HttpClient

### Conceitos Aplicados

- Componentização
- Lazy Loading
- Services
- Guards
- Interceptors
- Responsividade Mobile First

---

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven Wrapper

### Conceitos Aplicados

- Arquitetura em Camadas
- DTO Pattern
- Repository Pattern
- Service Layer
- REST API
- Tratamento Global de Exceções

---

## Banco de Dados

- PostgreSQL
- Relacionamentos 1:N
- Constraints
- Integridade Referencial

---

## Deploy

- Vercel (Frontend)
- Render (Backend)
- Neon PostgreSQL (Database)

---

# 📱 Design Responsivo

O MesaLivre foi desenvolvido seguindo o conceito **Mobile First**.

Compatível com:

✅ Desktop

✅ Notebook

✅ Tablet

✅ Smartphone

✅ Menu Mobile Responsivo

✅ Sidebar Adaptativa

✅ Telas Otimizadas para Diferentes Resoluções

---

# 📂 Estrutura do Projeto

```text
mesalivre/
│
├── mesalivre-api/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
├── mesalivre-web/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
├── docs/
│
├── README.md
│
└── LICENSE
```

---

# 🚀 Executando o Projeto

## 1. Clonar o Repositório

```bash
git clone https://github.com/Brunnomk/mesalivre.git
```

---

## 2. Executar o Backend

```bash
cd mesalivre-api

./mvnw spring-boot:run
```

API disponível em:

```text
http://localhost:8080
```

---

## 3. Executar o Frontend

```bash
cd mesalivre-web

npm install

ng serve
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

# 🔒 Segurança

O sistema implementa boas práticas de segurança:

- JWT Authentication
- Senhas criptografadas
- Controle de acesso baseado em perfis
- APIs protegidas
- Rotas autenticadas
- Interceptors HTTP
- Tratamento global de erros

---

# 📸 Demonstração

## Dashboard

- Indicadores em tempo real
- Resumo operacional
- Estatísticas de reservas

## Reservas

- Cadastro completo
- Controle de status
- Histórico de movimentações

## Mesas

- Disponibilidade em tempo real
- Controle de capacidade

## Clientes

- Cadastro e gerenciamento
- Pesquisa rápida

---

# 🚀 Roadmap

Funcionalidades planejadas para próximas versões:

- Notificações por E-mail
- Integração com WhatsApp
- QR Code para Check-in
- Relatórios Gerenciais
- Painel Analytics
- Multi-Restaurante
- Gestão de Funcionários
- Programa de Fidelidade
- Pagamentos Online
- Aplicativo Mobile

---

# 💡 Diferenciais do Projeto

- Arquitetura Full Stack Moderna
- Angular Standalone
- API REST Segura
- Persistência Real em PostgreSQL
- Responsividade Completa
- Integração Frontend e Backend
- Autenticação JWT
- Modo Demonstração para Apresentações
- Estrutura preparada para evolução SaaS

---

# 👨‍💻 Autor

### Brunno Xavier de Oliveira

Desenvolvedor Full Stack | Engenharia de Software

🔗 GitHub  
https://github.com/Brunnomk

🔗 LinkedIn  
https://linkedin.com/in/brunno-xavier-de-oliveira

---

## ⭐ Destaque para Recrutadores

O MesaLivre demonstra experiência prática em:

- Angular
- Java 21
- Spring Boot
- PostgreSQL
- APIs REST
- JWT Authentication
- Arquitetura de Software
- Desenvolvimento Full Stack
- Engenharia de Software
- Responsividade Mobile First

Projeto desenvolvido para compor portfólio profissional, simulando um sistema real de reservas para restaurantes com regras de negócio, autenticação segura e integração completa entre Frontend, Backend e Banco de Dados.
