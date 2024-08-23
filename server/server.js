const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importa o pacote CORS

const app = express();
const PORT = process.env.PORT || 3001; // Porta do servidor

// Habilita CORS para todas as rotas
app.use(cors());

// Middleware para parsing do JSON
app.use(bodyParser.json());

// Caminho para o arquivo JSON
const receitasFilePath = path.join(__dirname, './Json/receitas.json');

// Função auxiliar para ler o JSON
const readReceitasFromFile = () => {
    return JSON.parse(fs.readFileSync(receitasFilePath, 'utf-8'));
};

// Função auxiliar para salvar o JSON
const writeReceitasToFile = (data) => {
    fs.writeFileSync(receitasFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Rota para buscar todas as receitas
app.get('/api/receitas', (req, res) => {
    const receitas = readReceitasFromFile();
    res.json(receitas);
});

// Rota para buscar uma receita por ID
app.get('/api/receitas/:id', (req, res) => {
    const receitas = readReceitasFromFile();
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (receita) {
        res.json(receita);
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});

// Rota para adicionar uma nova receita
app.post('/api/receitas', (req, res) => {
    const receitas = readReceitasFromFile();
    const novaReceita = { ...req.body, id: Date.now() };
    receitas.push(novaReceita);
    writeReceitasToFile(receitas);
    res.status(201).json(novaReceita);
});

// Rota para editar uma receita existente
app.put('/api/receitas/:id', (req, res) => {
    const receitas = readReceitasFromFile();
    const index = receitas.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        receitas[index] = { ...receitas[index], ...req.body };
        writeReceitasToFile(receitas);
        res.json(receitas[index]);
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});

// Rota para remover uma receita por ID
app.delete('/api/receitas/:id', (req, res) => {
    const receitas = readReceitasFromFile();
    const index = receitas.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        receitas.splice(index, 1);
        writeReceitasToFile(receitas);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Receita não encontrada' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
