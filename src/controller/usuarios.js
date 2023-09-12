const jwt = require('jsonwebtoken');
const { validarCampos, validarFormatoEmail, validarSenha } = require('../models/validacoes')
const bcrypt = require('bcrypt');
const db = require('../database/db')

const registrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!validarCampos(nome, email, senha)) {
        return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' });
    }

    if (!validarFormatoEmail(email)) {
        return res.status(400).json({ erro: 'Email inválido' });
    }

    try {
        const usuario = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await db.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senhaCriptografada]);

        if (usuario.length > 0 && usuario[0].email === email) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });
    }
}




const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!validarCampos(email, senha)) {
        return res.status(400).json({ erro: 'Todos os campos devem ser preenchidos' });
    }

    if (!validarFormatoEmail(email)) {
        return res.status(400).json({ erro: 'Email inválido' });
    }


    try {

        const usuario = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);


        if (usuario.length > 0 && !await validarSenha(usuario, senha)) {
            return res.json({ mensagem: 'Senha incorreta' })
        }

        const idUsuario = usuario[0].id

        const token = await jwt.sign({ idUsuario }, process.env.JWT_SECRET, { expiresIn: '2d' });
     
        return res.json(token);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });
    }

}

module.exports = {
    registrar,
    login
}