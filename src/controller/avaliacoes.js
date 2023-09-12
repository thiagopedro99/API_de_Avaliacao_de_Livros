const db = require('../database/db')
const { format } = require('date-fns')
const jwt = require('jsonwebtoken')
const { validarCampos } = require('../models/validacoes')

const mediaDeAvaliacoes = async (req, res) => {
    const { id } = req.params

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Id do livro inválido" })
    }

    try {
        const livro = await db.query("SELECT * FROM livros WHERE id = $1", [id]);

        if (livro.length === 0) {
            return res.status(404).json({ message: "Livro não encontrado" })
        }

        const media = await db.query("SELECT AVG(nota) FROM avaliacoes WHERE livro_id = $1", [id]);
        return res.json(media);


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });
    }
}






const avaliarLivro = async (req, res) => {
    const { livro_id } = req.params
    const [bearer, token] = req.headers.authorization.split(" ")

    const { nota, comentario } = req.body

    if (!validarCampos(nota, comentario)) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos" })
    }

    if (isNaN(parseInt(nota) || nota < 0 || nota > 5)) {
        return res.status(400).json({ message: "A nota deve ser um número inteiro de 1 a 5" })
    }


    if (isNaN(parseInt(livro_id)) || !livro_id) {
        return res.status(400).json({ message: "Id do livro inválido" })
    }

    try {

        const livro = await db.query("SELECT * FROM livros WHERE id=$1", [livro_id]);
        const validarToken = await jwt.verify(token, process.env.JWT_SECRET)
        const usuario_id = validarToken.idUsuario

        if (livro.length === 0) {
            return res.status(404).json({ message: "Livro não encontrado" })
        }
        const data_avaliacao = format(new Date(), "yyyy/MM/dd HH:mm:ss");
        db.query('INSERT INTO AVALIACOES (nota, comentario, livro_id, usuario_id, data_avaliacao) VALUES($1 , $2, $3, $4, $5)', [nota, comentario, livro_id, usuario_id, data_avaliacao])
        return res.status(201).json({ message: "Avaliação realizada com sucesso" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });

    }


}

const listarAvaliacoesDoLivro = async (req, res) => {
    const { livro_id } = req.params

    if (isNaN(parseInt(livro_id)) || !livro_id) {
        return res.status(400).json({ message: "Id do livro inválido" })
    }

    try {
        const avaliacoes = await db.query('SELECT * FROM avaliacoes WHERE livro_id = $1', [livro_id]);
        const livro = await db.query("SELECT * FROM livros WHERE id=$1", [livro_id]);

        if (livro.length === 0) {
            return res.status(404).json({ message: "Livro não encontrado" })
        }

        if (avaliacoes.length === 0) {
            return res.status(404).json({ message: "Nenhuma avaliação encontrada para o livro informado" })
        }
        return res.json(avaliacoes);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });

    }

}

module.exports = {
    mediaDeAvaliacoes,
    avaliarLivro,
    listarAvaliacoesDoLivro
}