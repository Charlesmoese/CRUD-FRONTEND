# CRUD-FRONTEND

Este projeto é uma aplicação web de gerenciamento de contatos, que permite aos usuários se registrarem, fazerem login e gerenciarem seus contatos de forma segura utilizando autenticação via token JWT.

## Estrutura do Projeto

- **src/App.css**: Estilos globais da aplicação.
- **src/App.jsx**: Componente principal que define as rotas da aplicação.
- **src/config.js**: Exporta a URL base da API.
- **src/index.css**: Estilos globais que definem a aparência da aplicação.
- **src/main.jsx**: Ponto de entrada da aplicação.
- **src/components/ContactForm.jsx**: Formulário para criação e edição de contatos.
- **src/components/ContactList.jsx**: Exibe a lista de contatos e permite edição/exclusão.
- **src/components/Home.jsx**: Página principal que exibe o formulário e a lista de contatos.
- **src/components/Login.jsx**: Tela de login para autenticação de usuários.
- **src/components/Register.jsx**: Tela de registro para novos usuários.

## Configuração do Ambiente

1. Clone o repositório:
   ```
   git clone https://github.com/Charlesmoese/CRUD-AUTENTICADO.git
   ```

2. Navegue até o diretório do projeto:
   ```
   cd CRUD-FRONTEND/frontend
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente:
   ```
   VITE_API_URL=https://crud-autenticado-kappa.vercel.app/
   ```

5. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

## Implantação

A aplicação pode ser implantada no Vercel. Siga as instruções na documentação do Vercel para conectar seu repositório e implantar a aplicação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.