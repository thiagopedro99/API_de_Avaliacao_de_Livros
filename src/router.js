const express = require('express');
const userController = require('./controller/usuarios');
const bookController = require('./controller/livros');
const avaliacaoController = require('./controller/avaliacoes');
const { auth } = require('./middlewares/auth');
const routes = express.Router();

routes.post('/usuarios/registrar', userController.registrar);
routes.post('/usuarios/login', userController.login);

routes.get('/livros', bookController.listarLivros);
routes.get('/livros/busca', bookController.buscarLivro);

routes.get('/livros/:id/media-avaliacoes', avaliacaoController.mediaDeAvaliacoes);
routes.post('/livros/:livro_id/avaliacoes', auth, avaliacaoController.avaliarLivro);
routes.get('/livros/:livro_id/avaliacoes',avaliacaoController.listarAvaliacoesDoLivro );

module.exports = routes