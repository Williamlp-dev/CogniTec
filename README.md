# CogniTec - Soluções de IA para Alzheimer

<p align="center">
  <img src="/public/assets/img/logo.png" alt="CogniTec Logo" width="200" />
</p>

CogniTec é uma plataforma web dedicada a melhorar a qualidade de vida de pessoas com Alzheimer e facilitar o trabalho de seus cuidadores, familiares e profissionais de saúde através de tecnologia assistiva e inteligência artificial.

## 🧠 Sobre o Projeto

O CogniTec foi desenvolvido para criar um ambiente digital seguro e acolhedor para pacientes com Alzheimer, seus familiares, cuidadores e médicos. A plataforma está alinhada com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, especificamente com o ODS 3 - Saúde e Bem-Estar.

### Principais Funcionalidades

- **Sistema de autenticação** com diferentes perfis de usuário (familiar, cuidador, médico)
- **Painel administrativo** para gerenciamento de usuários
- **Perfil personalizado** para cada tipo de usuário
- **Landing page informativa** com detalhes sobre serviços e planos
- **Proteção de rotas** baseada no tipo de usuário

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **DevOps**: Docker, Biome, Vercel

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Docker e Docker Compose
- Git

## 🔧 Instalação

1. **Clone o repositório**
   \`\`\`bash
   git clone https://github.com/seu-usuario/cognitec.git
   cd cognitec
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure as variáveis de ambiente**

   - Crie um arquivo `.env` na raiz do projeto com base no `.env.example`
     \`\`\`
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cognitec"
     NEXTAUTH_SECRET="sua-chave-secreta-aqui"
     NEXTAUTH_URL="http://localhost:3000"
     ADMIN_EMAIL="admin@cognitec.com"
     ADMIN_PASSWORD="senha-segura-aqui"
     \`\`\`

4. **Inicie o banco de dados com Docker**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

5. **Execute as migrações do Prisma**
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`

6. **Inicie o servidor de desenvolvimento**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Acesse a aplicação**
   - Abra seu navegador e acesse `http://localhost:3000`

## 👥 Tipos de Usuário

- **Familiar**: Acesso a funcionalidades básicas para acompanhamento do paciente
- **Cuidador**: Acesso a ferramentas de monitoramento e gestão de cuidados
- **Médico**: Acesso a relatórios detalhados e histórico médico
- **Administrador**: Acesso completo ao sistema, incluindo gerenciamento de usuários

## 📱 Interface do Usuário

A interface do CogniTec foi projetada para ser intuitiva e acessível, com foco na experiência do usuário. Utilizamos animações suaves e um design limpo para facilitar a navegação.

### Principais Telas

- **Landing Page**: Apresentação da plataforma, serviços e planos
- **Login/Cadastro**: Sistema de autenticação com diferentes perfis
- **Painel Administrativo**: Gerenciamento de usuários e estatísticas
- **Perfil do Usuário**: Informações pessoais e configurações

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: descrição da sua feature'`)
4. Faça push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Contato

- Email: cognitecst@gmail.com
- Website: [cognitec.com](https://cognitec.vercel.app/)

---

<p align="center">
  Desenvolvido com 💚 pela equipe Push
