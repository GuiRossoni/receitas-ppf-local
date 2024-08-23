// URL base do backend
const API_URL = 'http://localhost:3001/api';

// Função para buscar todas as receitas
export async function buscarReceitas() {
    const response = await fetch(`${API_URL}/receitas`);
    return await response.json();
}

// Função para buscar uma receita por ID
export async function buscarReceitaPorId(id) {
    const response = await fetch(`${API_URL}/receitas/${id}`);
    return await response.json();
}

// Função para adicionar uma nova receita
export async function adicionarReceita(novaReceita) {
    const response = await fetch(`${API_URL}/receitas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaReceita)
    });
    return await response.json();
}

// Função para editar uma receita existente
export async function editarReceita(id, receitaAtualizada) {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receitaAtualizada)
    });
    return await response.json();
}

// Função para remover uma receita por ID
export async function removerReceita(id) {
    const response = await fetch(`${API_URL}/receitas/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}
