import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { adicionarReceita } from '../../api';

function AdicionarReceita() {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState([{ quantidade: '', unidade: '', ingrediente: '' }]);
  const [modoPreparo, setModoPreparo] = useState('');
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState('');
  const navigate = useNavigate();

  // Função para adicionar um novo campo de ingrediente
  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, { quantidade: '', unidade: '', ingrediente: '' }]);
  };

  // Função para remover um campo de ingrediente
  const handleRemoveIngrediente = (index) => {
    const novosIngredientes = ingredientes.filter((_, i) => i !== index);
    setIngredientes(novosIngredientes);
  };

  // Função para atualizar o valor de um campo de ingrediente
  const handleChangeIngrediente = (index, field, value) => {
    const novosIngredientes = [...ingredientes];
    novosIngredientes[index][field] = value;
    setIngredientes(novosIngredientes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaReceita = {
        id: Date.now(), // Gerar um ID único
        titulo,
        ingredientes,
        modoPreparo
    };

    await adicionarReceita(novaReceita);
    setMensagemConfirmacao('Receita adicionada com sucesso!');
    
    // Opcional: Redireciona para a página inicial após alguns segundos
    setTimeout(() => {
        navigate('/');
    }, 2000); // Redireciona após 2 segundos
};

return (
  <div>
      <ul className='link'>
          <li><Link to="/">Voltar</Link></li>
          <li><Link to="/receitas">Receitas</Link></li>
      </ul>
      <h1>Adicionar Nova Receita</h1>
      <form onSubmit={handleSubmit}>
          <div>
              <label>Receita:</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div>
              <h3>Ingredientes:</h3>
              {ingredientes.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                      <input
                          type="text"
                          placeholder="Ingrediente"
                          value={item.ingrediente}
                          onChange={(e) => handleChangeIngrediente(index, 'ingrediente', e.target.value)}
                          required
                      />
                      <input
                          type="text"
                          placeholder="Quantidade"
                          value={item.quantidade}
                          onChange={(e) => handleChangeIngrediente(index, 'quantidade', e.target.value)}
                          required
                      />
                      <input
                          type="text"
                          placeholder="Unidade"
                          value={item.unidade}
                          onChange={(e) => handleChangeIngrediente(index, 'unidade', e.target.value)}
                          required
                      />
                      <button type="button" onClick={() => handleRemoveIngrediente(index)}>Remover</button>
                  </div>
              ))}
              <button type="button" onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
          </div>
          <div>
              <label>Modo de Preparo:</label>
              <textarea value={modoPreparo} onChange={(e) => setModoPreparo(e.target.value)} required></textarea>
          </div>
          <button type="submit">Adicionar Receita</button>
      </form>
      {mensagemConfirmacao && <p>{mensagemConfirmacao}</p>} {/* Exibe a mensagem de confirmação */}
  </div>
);

}

export default AdicionarReceita;
