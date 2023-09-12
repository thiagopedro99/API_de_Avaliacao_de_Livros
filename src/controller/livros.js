const db = require('../database/db');


const listarLivros = async (req, res) => {
    
    try {
        const livros = await db.query("SELECT * FROM livros");
        
        return res.json(livros);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });
    }
}


const buscarLivro = async (req, res) => {
    const { titulo, genero, autor, nota, anoPublicacao } = req.query

    try {

        let query = "SELECT * FROM livros WHERE";
        const params = [];
        let paramCounter = 1;

        if (titulo) {
            query += ` titulo = $${paramCounter++}`;
            params.push(titulo);
        }

        if (genero) {
            if (params.length > 0) {
                query += " AND";
            }
            query += ` genero = $${paramCounter++}`;
            params.push(genero);
        }

        if (autor) {
            if (params.length > 0) {
                query += " AND";
            }
            query += ` autor = $${paramCounter++}`;
            params.push(autor);
        }

        if (nota) {
            if (params.length > 0) {
                query += " AND";
            }
            query += ` nota = $${paramCounter++}`;
            params.push(nota);
        }

        if (anoPublicacao) {
            if (params.length > 0) {
                query += " AND";
            }
            query += ` ano_publicacao = $${paramCounter}`;
            params.push(anoPublicacao);
        }

        if (params.length === 0) {
            return res.status(404).json({ message: "Nenhum livro encontrado" });
        }

        const livros = await db.query(query, params);

        if (livros.length === 0) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }

        return res.json(livros);

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu um erro interno do servidor." });

    }

}


module.exports = {
    listarLivros,
    buscarLivro,
    
}