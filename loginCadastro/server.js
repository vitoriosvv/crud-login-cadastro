import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src')));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

// Rota de Cadastramento
app.post('/api/cadastrar', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    
    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            if (err.errno === 1062) {
                return res.status(400).json({ sucesso: false, mensagem: 'Este e-mail já está cadastrado!' });
            }
            return res.status(500).json({ sucesso: false, mensagem: 'Erro interno no servidor.' });
        }
        
        return res.json({ sucesso: true, mensagem: 'Cadastro realizado com sucesso!' });
    });
});

// Rota Listagem
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT id, email FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json([]);
        }
        res.json(results);
    });
});

// Rota Verificação
app.post('/api/usuarios/verificar-senha', (req, res) => {
    const { id, senha } = req.body;
    
    db.query('SELECT * FROM usuarios WHERE id = ? AND senha = ?', [id, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
        }
        if (results.length > 0) {
            res.json({ valido: true });
        } else {
            res.json({ valido: false, mensagem: 'Senha incorreta!' });
        }
    });
});

//  Rota Atualização Dados
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    const sql = 'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?';
    
    db.query(sql, [email, senha, id], (err, result) => {
        if (err) {
            if (err.errno === 1062) {
                return res.status(400).json({ sucesso: false, mensagem: 'Este e-mail já pertence a outro usuário!' });
            }
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar registro.' });
        }
        res.json({ sucesso: true, mensagem: 'Registro atualizado com sucesso!' });
    });
});

// Rota Exclusão de usuário via ID
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir registro.' });
        }
        res.json({ sucesso: true, mensagem: 'Registro excluído com sucesso!' });
    });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});