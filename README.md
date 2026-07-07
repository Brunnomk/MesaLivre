# 🍽️ MesaLivre

### Sistema Profissional de Gestão de Reservas para Restaurantes

<p align="center">

### 🛠️ Tecnologias e Ferramentas

#### Frontend

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS-Styling-CC6699?style=for-the-badge&logo=sass)
![RxJS](https://img.shields.io/badge/RxJS-Reactive-B7178C?style=for-the-badge&logo=reactivex)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-success?style=for-the-badge)

#### Backend & Base de Dados

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![Spring Security](https://img.shields.io/badge/Spring%20Security-Secure-6DB33F?style=for-the-badge&logo=springsecurity)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-59666C?style=for-the-badge&logo=hibernate)
![REST API](https://img.shields.io/badge/REST%20API-Ready-blue?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)

#### DevOps & Implementação (Deploy)

![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven)
![Docker](https://img.shields.io/badge/Docker-Deploy-2496ED?style=for-the-badge&logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render)

</p>

<p align="center">
Sistema Full Stack para gerenciamento inteligente de reservas, mesas, clientes e disponibilidade em restaurantes.
</p>

<p align="center">
  https://mesa-livre-nine.vercel.app
    🔗 Acessar Aplicação
  </a>
  &nbsp;|&nbsp;
  https://mesalivre-api.onrender.com
    🔗 API Online
  </a>
</p>

---

# 📖 Visão Geral

O **MesaLivre** é uma aplicação Full Stack desenvolvida para modernizar o processo de gerenciamento de reservas em restaurantes.

A plataforma permite que administradores controlem restaurantes, mesas, clientes, disponibilidade e reservas através de uma interface moderna, responsiva e conectada a uma API REST real.

O projeto foi construído utilizando práticas modernas de desenvolvimento de software, arquitetura em camadas, APIs REST, autenticação baseada em JWT, persistência com PostgreSQL e deploy completo em ambiente cloud.

Atualmente, o sistema está publicado em produção utilizando:

- **Frontend:** Vercel
- **Backend:** Render
- **Banco de Dados:** Neon PostgreSQL
- **Versionamento:** GitHub

---

# 🌐 Projeto Online

## Frontend

```text
https://mesa-livre-nine.vercel.app
```

## Backend API

```text
https://mesalivre-api.onrender.com
```

## Banco de Dados

```text
Neon PostgreSQL
```

---

# 🎯 Objetivos do Projeto

O MesaLivre foi desenvolvido para demonstrar conhecimentos práticos em:

- Desenvolvimento Full Stack
- Arquitetura Cliente-Servidor
- APIs RESTful
- Angular Standalone
- Spring Boot
- Java 21
- PostgreSQL
- Spring Security
- Autenticação com JWT
- Modelagem de Banco de Dados
- Responsividade Mobile First
- Integração Frontend ↔ Backend
- Deploy em ambiente cloud
- Docker
- Variáveis de ambiente
- CORS
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
- Integração com backend Spring Security

---

## 📊 Dashboard Inteligente

Visualização operacional do sistema:

- Total de reservas
- Reservas do dia
- Clientes cadastrados
- Mesas disponíveis
- Restaurantes cadastrados
- Reservas recentes
- Indicadores de desempenho
- Resumo de disponibilidade

---

## 🏢 Gestão de Restaurantes

- Cadastro de restaurantes
- Atualização de dados
- Exclusão de registros
- Consulta detalhada
- Listagem com dados reais do banco
- Integração completa com API REST
- Persistência em PostgreSQL

---

## 🪑 Gestão de Mesas

- Cadastro de mesas
- Capacidade por mesa
- Status operacional
- Controle de disponibilidade
- Relacionamento com restaurantes
- Listagem com dados reais do banco
- Integração com API do backend

---

## 👥 Gestão de Clientes

- Cadastro de clientes
- Pesquisa por nome
- Gerenciamento de informações
- Exclusão de registros
- Identificação de clientes VIP
- Persistência real no banco de dados
- Integração com API REST

---

## 📅 Gestão de Reservas

- Criação de reservas
- Associação entre cliente, mesa e restaurante
- Controle de data e horário
- Quantidade de pessoas
- Histórico completo
- Consulta de reservas
- Status de reserva
- Persistência no banco PostgreSQL

### Status suportados

- AGENDADA
- CONFIRMADA
- CANCELADA
- FINALIZADA
- NO_SHOW

---

## 📈 Controle de Disponibilidade

O sistema realiza o controle operacional das mesas permitindo:

- Consulta de disponibilidade
- Verificação de ocupação
- Controle de conflitos
- Gestão eficiente de capacidade
- Apoio à organização das reservas

---

## 🎭 Modo Demonstração

Além do ambiente real conectado ao backend, o projeto mantém a proposta de um modo demonstração:

- Dados simulados
- Uso de LocalStorage
- Ideal para apresentações
- Demonstração sem necessidade de API
- Fluxo separado do ambiente real

---

# 🏗️ Arquitetura da Solução

```text
┌──────────────────────────┐
│      Angular Frontend    │
│ Components, Services     │
│ Guards, Interceptors     │
│ SCSS Responsivo          │
└─────────────┬────────────┘
              │
              │ HTTP / REST
              ▼
┌──────────────────────────┐
│     Spring Boot API      │
│ Controllers, Services    │
│ Security, JWT, JPA       │
│ Regras de Negócio        │
└─────────────┬────────────┘
              │
              │ Hibernate / JDBC
              ▼
┌──────────────────────────┐
│     PostgreSQL Neon      │
│   Persistence Layer      │
│   Banco em Produção      │
└──────────────────────────┘
```

---

# 📋 Regras de Negócio

✅ Um restaurante possui múltiplas mesas

✅ Cada mesa possui capacidade definida

✅ Um cliente pode possuir várias reservas

✅ Uma reserva deve estar associada a cliente, mesa e restaurante

✅ Uma mesa não deve receber reservas conflitantes no mesmo período

✅ A disponibilidade é calculada com base no uso das mesas

✅ Reservas possuem fluxo de status controlado

✅ Histórico operacional das reservas

✅ Controle de ocupação em tempo real

✅ O sistema permite gerenciamento completo de restaurantes, clientes, mesas e reservas

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

## Relacionamentos principais

- Um restaurante pode possuir várias mesas
- Uma mesa pertence a um restaurante
- Um cliente pode possuir várias reservas
- Uma reserva está associada a um cliente
- Uma reserva está associada a uma mesa
- Uma reserva está associada a um restaurante
- Reservas possuem status controlado

---

# 🛠️ Tecnologias Utilizadas

## Frontend

- Angular 20 Standalone
- TypeScript
- SCSS
- Angular Router
- RxJS
- HttpClient
- Guards
- Interceptors
- LocalStorage
- Layout responsivo

### Conceitos Aplicados no Frontend

- Componentização
- Standalone Components
- Services
- Guards
- Interceptors
- Consumo de API REST
- Organização por páginas e serviços
- Responsividade Mobile First
- Separação de responsabilidades
- Integração com backend em produção

---

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven Wrapper
- PostgreSQL Driver
- Docker

### Conceitos Aplicados no Backend

- Arquitetura em Camadas
- Controllers
- Services
- Repositories
- DTO Pattern
- Repository Pattern
- Service Layer
- REST API
- Configuração de CORS
- Variáveis de ambiente
- Tratamento de autenticação
- Integração com banco PostgreSQL

---

## Banco de Dados

- PostgreSQL
- Neon PostgreSQL
- Relacionamentos 1:N
- Constraints
- Integridade Referencial
- Persistência real em ambiente cloud

---

## Deploy

- Vercel para o frontend Angular
- Render para o backend Spring Boot
- Neon PostgreSQL para o banco de dados
- Docker para empacotamento da API
- GitHub para versionamento e integração com deploy

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

✅ Layout adaptado para uso em diferentes dispositivos

---

# 📂 Estrutura do Projeto

```text
MesaLivre/
│
├── mesalivre-api/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── Dockerfile
│
├── mesalivre-web/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# 🚀 Executando o Projeto Localmente

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Java 21
- Node.js
- npm
- PostgreSQL
- Git
- IntelliJ IDEA ou outra IDE de preferência

---

## 1. Clonar o Repositório

```bash
git clone https://github.com/Brunnomk/MesaLivre.git
```

```bash
cd MesaLivre
```

---

## 2. Executar o Backend

Acesse a pasta da API:

```bash
cd mesalivre-api
```

Execute o projeto com Maven Wrapper:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

API disponível em:

```text
http://localhost:8080
```

Exemplo de endpoint:

```text
http://localhost:8080/api/restaurantes
```

---

## 3. Executar o Frontend

Acesse a pasta do frontend:

```bash
cd mesalivre-web
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação Angular:

```bash
npm start
```

Aplicação disponível em:

```text
http://localhost:4200
```

---

# 🔐 Variáveis de Ambiente

## Backend

No ambiente de produção, o backend utiliza variáveis de ambiente para conexão com o banco de dados Neon PostgreSQL.

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

Exemplo de configuração utilizada no `application.properties`:

```properties
spring.application.name=mesa-livre-backend

server.port=${PORT:8080}

spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/mesa_livre}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}

spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Essa configuração permite que o projeto rode localmente e também em produção, utilizando variáveis de ambiente no Render.

---

# 🌐 Endpoints Principais

## Autenticação

```text
POST /api/auth/login
POST /api/auth/register
```

---

## Restaurantes

```text
GET    /api/restaurantes
POST   /api/restaurantes
PUT    /api/restaurantes/{id}
DELETE /api/restaurantes/{id}
```

---

## Clientes

```text
GET    /api/clientes
POST   /api/clientes
PUT    /api/clientes/{id}
DELETE /api/clientes/{id}
```

---

## Mesas

```text
GET  /api/mesas
POST /api/restaurantes/{restauranteId}/mesas
```

---

## Reservas

```text
GET  /api/reservas
POST /api/reservas
```

---

# 🚀 Deploy em Produção

O projeto foi publicado com frontend, backend e banco de dados separados, simulando uma arquitetura real de aplicação Full Stack em produção.

---

## Frontend - Vercel

O frontend Angular está hospedado na Vercel.

### URL

```text
https://mesa-livre-nine.vercel.app
```

### Configurações utilizadas

```text
Root Directory: mesalivre-web
Build Command: npm run build
Output Directory: dist/mesa-livre-frontend/browser
Install Command: npm install
```

---

## Backend - Render

O backend Spring Boot está hospedado no Render.

### URL

```text
https://mesalivre-api.onrender.com
```

### Configurações utilizadas

```text
Root Directory: mesalivre-api
Environment: Docker
Dockerfile Path: ./Dockerfile
```

---

## Banco de Dados - Neon PostgreSQL

O banco PostgreSQL está hospedado no Neon.

O backend se conecta ao banco através das variáveis de ambiente configuradas no Render:

```env
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
SPRING_JPA_HIBERNATE_DDL_AUTO
```

---

## Dockerfile do Backend

O backend utiliza Docker para build e execução no Render.

```dockerfile
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# 🔄 Integração Frontend e Backend

O frontend Angular consome a API hospedada no Render:

```text
https://mesalivre-api.onrender.com
```

Durante o deploy foram realizados ajustes importantes:

- Configuração das URLs dos services Angular
- Correção do endpoint do backend em produção
- Configuração de CORS no Spring Boot
- Liberação do domínio da Vercel no backend
- Testes reais de comunicação entre frontend e backend
- Testes de criação de clientes, restaurantes, mesas e reservas

---

# 🔒 Segurança

O sistema implementa boas práticas de segurança:

- JWT Authentication
- Spring Security
- Senhas criptografadas
- Controle de sessão
- APIs protegidas
- Rotas autenticadas
- Guards no frontend
- Interceptors HTTP
- CORS configurado para ambiente de produção
- Dados sensíveis fora do repositório
- Uso de variáveis de ambiente no deploy

---

# 📸 Demonstração

## Dashboard

- Indicadores em tempo real
- Resumo operacional
- Estatísticas de reservas
- Visão geral do sistema

---

## Restaurantes

- Cadastro de restaurantes
- Edição de informações
- Exclusão de registros
- Listagem com dados reais

---

## Reservas

- Cadastro completo
- Controle de status
- Histórico de movimentações
- Associação com cliente e mesa

---

## Mesas

- Disponibilidade operacional
- Controle de capacidade
- Associação com restaurante
- Cadastro e listagem

---

## Clientes

- Cadastro e gerenciamento
- Pesquisa rápida
- Identificação de clientes VIP
- Persistência no PostgreSQL

---

# 🧪 Testes Realizados

Durante o desenvolvimento e deploy foram validados:

- Clone do repositório em ambiente local
- Execução local do backend no IntelliJ IDEA
- Execução local do frontend Angular
- Integração Angular com Spring Boot local
- Conexão do backend com PostgreSQL local
- Conexão do backend com Neon PostgreSQL
- Build do backend com Maven
- Deploy do backend no Render
- Build do frontend Angular
- Deploy do frontend no Vercel
- Configuração do output directory do Angular no Vercel
- Configuração de variáveis de ambiente no Render
- Configuração de CORS entre Vercel e Render
- Teste da API `/api/restaurantes`
- Teste de login
- Teste de cadastro de restaurantes
- Teste de cadastro de clientes
- Teste de cadastro de mesas
- Teste de criação de reservas
- Correção de URLs dos services Angular
- Correção de integração com restaurante padrão no ambiente atual

---

# 🧠 Conceitos Aplicados

O MesaLivre demonstra conhecimentos práticos em:

- Desenvolvimento Full Stack
- Angular moderno
- TypeScript
- SCSS
- Java 21
- Spring Boot
- Spring Security
- PostgreSQL
- JPA/Hibernate
- API REST
- JWT Authentication
- Docker
- Deploy em nuvem
- Vercel
- Render
- Neon
- Git e GitHub
- CORS
- Variáveis de ambiente
- Responsividade
- Arquitetura de Software
- Organização de projeto real

---

# 🚀 Roadmap

Funcionalidades planejadas para próximas versões:

- Seleção dinâmica de restaurante
- Multi-Restaurante completo
- Gestão de funcionários
- Perfis de usuário
- Controle avançado de permissões
- Notificações por E-mail
- Integração com WhatsApp
- QR Code para Check-in
- Relatórios Gerenciais
- Painel Analytics
- Histórico avançado de reservas
- Programa de Fidelidade
- Pagamentos Online
- Aplicativo Mobile
- Melhorias no fluxo de disponibilidade
- Melhorias no painel administrativo

---

# 💡 Diferenciais do Projeto

- Arquitetura Full Stack Moderna
- Angular Standalone
- API REST Segura
- Persistência Real em PostgreSQL
- Deploy real em ambiente cloud
- Frontend publicado na Vercel
- Backend publicado no Render
- Banco de dados publicado no Neon
- Responsividade Completa
- Integração Frontend e Backend
- Autenticação JWT
- Docker no backend
- Estrutura preparada para evolução SaaS
- Projeto com fluxo real de autenticação e persistência
- Ideal para portfólio profissional

---

# 👨‍💻 Autor

### Brunno Xavier de Oliveira

Desenvolvedor Full Stack em formação  
Estudante de Engenharia de Software

🔗 GitHub  
https://github.com/Brunnomk

🔗 LinkedIn  
https://linkedin.com/in/brunno-xavier-de-oliveira

---

## ⭐ Destaques do Projeto

O **MesaLivre** foi desenvolvido como projeto de portfólio para demonstrar habilidades práticas em desenvolvimento Full Stack.

O projeto apresenta uma aplicação real, com frontend moderno, backend estruturado, banco de dados relacional, autenticação, deploy em nuvem e integração completa entre as camadas da aplicação.

Principais competências demonstradas:

- Angular
- TypeScript
- Java 21
- Spring Boot
- Spring Security
- PostgreSQL
- API REST
- JWT Authentication
- Docker
- Deploy em nuvem
- Git e GitHub
- Arquitetura de Software
- Desenvolvimento Full Stack
- Engenharia de Software
- Responsividade Mobile First

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.

---
