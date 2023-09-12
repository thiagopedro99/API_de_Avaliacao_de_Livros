# API de Avaliação de Livros

Esta é uma API simples para avaliação de livros, onde os usuários podem registrar-se, fazer login, buscar livros e adicionar avaliações a eles. Essa API permite a pesquisa avançada de livros por título, gênero, autor, nota e ano de publicação.

## Configuração do Banco de Dados

Antes de usar esta API, você precisará configurar o banco de dados PostgreSQL e criar as tabelas necessárias. Siga estas etapas:

1. Certifique-se de ter o PostgreSQL instalado em sua máquina.

2. Abra o terminal e conecte-se ao PostgreSQL usando o utilitário `psql`:

```bash
psql -U SEU_USUARIO
```

Certifique-se de substituir `SEU_USUARIO` pelo seu nome de usuário do PostgreSQL.

3. Crie um banco de dados com o nome `avaliacao_livros` (ou escolha um nome de sua preferência) executando o seguinte comando:

```sql
CREATE DATABASE avaliacao_livros;
```

4. Use o banco de dados recém-criado:

```sql
\c avaliacao_livros
```

5. Abra um terminal e navegue até a pasta raiz deste projeto.
<br>
6. Execute o arquivo SQL `avaliacao_livros.sql` para criar as tabelas necessárias no banco de dados. Você pode usar o seguinte comando para fazer isso:

```bash
psql -U SEU_USUARIO -d avaliacao_livros -a -f avaliacao_livros.sql
```
Certifique-se de substituir `SEU_USUARIO` pelo seu nome de usuário do PostgreSQL e ajustar o comando conforme necessário.

7. O banco de dados agora está configurado e as tabelas estão prontas para uso com a API de Avaliação de Livros.

## Uso da API

Para começar a usar a API, siga estas etapas:

1. Clone este repositório para sua máquina:

```bash
git clone https://github.com/seu-usuario/api-avaliacao-livros.git
```

2. Navegue até a pasta do projeto:

```bash
cd api-avaliacao-livros
```

3. Instale as dependências do projeto usando o npm ou yarn:

```bash
npm install
```

ou

```bash
yarn install
```

4. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Aqui está um exemplo:

```
JWT_SECRET=SuaChaveSecreta
DB_HOST=localhost
DB_PORT=5432
DB_NAME=avaliacao_livros
DB_USER=postgres
DB_PASSWORD=suasenha
```

Certifique-se de ajustar as configurações conforme necessário.

5. Inicie o servidor da API:

```bash
npm run dev
```

ou

```bash
yarn dev
```

A API estará disponível em `http://localhost:3000`.

6. Você pode usar uma ferramenta como o [Insomnia](https://insomnia.rest/) para testar as rotas da API. Aqui estão as rotas disponíveis:

- Registro de Usuário:
  - `POST /usuarios/registrar`

- Login de Usuário:
  - `POST /usuarios/login`

- Listagem de Livros:
  - `GET /livros`

- Busca Avançada de Livros:
  - `GET /livros/busca`

- Média de Avaliações de um Livro:
  - `GET /livros/:id/media-avaliacoes`

- Avaliação de Livro (requer autenticação):
  - `POST /livros/:livro_id/avaliacoes`

- Listagem de Avaliações de um Livro:
  - `GET /livros/:livro_id/avaliacoes`

Lembre-se de substituir `:id` e `:livro_id` pelos valores apropriados ao fazer as solicitações.


Para testar as rotas da API, siga estes passos no Insomnia:

- Importe a coleção do Insomnia incluída no repositório (Insomnia_Requests.json) para obter todas as solicitações prontas para uso.

- Execute as solicitações para testar as funcionalidades da API.


7. Agora você pode usar a API de Avaliação de Livros para registrar-se, fazer login, buscar e avaliar livros!

## Dependências

Este projeto utiliza as seguintes dependências:

- bcrypt: Para criptografar senhas de usuário.
- date-fns: Para formatar datas.
- dotenv: Para gerenciar variáveis de ambiente.
- express: Para criar a API REST.
- jsonwebtoken: Para autenticação baseada em token.
- pg-promise: Um banco de dados Postgres do cliente Node.js.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias para esta API. Se você encontrar algum problema ou tiver sugestões, abra uma ***issue*** ou envie um ***pull request***.
