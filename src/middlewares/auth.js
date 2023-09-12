const db = require('../database/db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const [Beares, token] = req.headers.authorization.split(" ");

    if (!token) {
        return res.status(401).json({ message: 'O usuário deve estar logado para acessar essa rota' });
    }

    const tokenValido = jwt.verify(token, process.env.JWT_SECRET);


    if (!tokenValido) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
}


module.exports = { auth }