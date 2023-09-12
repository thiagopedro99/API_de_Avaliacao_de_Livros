-- Criação da Tabela de Usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

-- Criação da Tabela de Livros
CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  genero VARCHAR(255),
  ano_publicacao INTEGER,
  descricao TEXT
);

-- Criação da Tabela de Avaliações
CREATE TABLE avaliacoes (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  livro_id INTEGER REFERENCES livros(id),
  nota INTEGER NOT NULL,
  comentario TEXT,
  data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Criação de um novo livro para testes
INSERT INTO livros (titulo, autor, genero, ano_publicacao, descricao)
VALUES ('Aventuras de Sherlock Holmes', 'Arthur Conan Doyle', 'Mistério', 1892, 'Descrição do livro...');
