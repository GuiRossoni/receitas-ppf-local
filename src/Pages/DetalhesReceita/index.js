import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { buscarReceitaPorId, editarReceita, removerReceita } from '../../api';

function DetalhesReceita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [modoPreparo, setModoPreparo] = useState('');
  const [mensagemConfirmacao, setMensagemConfirmacao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getReceita = async () => {
      const receita = await buscarReceitaPorId(parseInt(id));
      setReceita(receita);
      setTitulo(receita.titulo);
      setIngredientes(receita.ingredientes);
      setModoPreparo(receita.modoPreparo);
    };
    
    getReceita();
  }, [id, window.location.search]);

  const handleEditar = async () => {
    const receitaAtualizada = { titulo, ingredientes, modoPreparo };
    await editarReceita(parseInt(id), receitaAtualizada);
    setEditMode(false);
    setMensagemConfirmacao('Receita editada com sucesso!');
    
    // Remove a mensagem de confirmação após 3 segundos (opcional)
    setTimeout(() => {
        setMensagemConfirmacao('');
    }, 3000);
    
    navigate(`/receitas/${id}?updated=true`);
  };

  const handleRemover = async () => {
    const confirmarRemocao = window.confirm("Tem certeza de que deseja remover esta receita?");
    if (confirmarRemocao) {
      await removerReceita(parseInt(id));
      navigate('/receitas');
    }
  };

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, { ingrediente: '', quantidade: '', unidade: '' }]);
  };

  const handleRemoveIngrediente = (index) => {
    const newIngredientes = ingredientes.filter((_, i) => i !== index);
    setIngredientes(newIngredientes);
  };

  if (!receita) return <div>Loading...</div>;

  return (
    <div>
        <ul className='link'>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/receitas">Voltar</Link></li>
            <li><Link to="/adicionar">Nova Receita</Link></li>
        </ul>
        {editMode ? (
            <div>
                <h1>Editar Receita</h1>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título"
                />
                <h2>Ingredientes</h2>
                <ul>
                    {ingredientes.map((item, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={item.quantidade}
                                onChange={(e) => {
                                    const newIngredientes = [...ingredientes];
                                    newIngredientes[index].quantidade = e.target.value;
                                    setIngredientes(newIngredientes);
                                }}
                                placeholder="Quantidade"
                            />{' '}
                            <input
                                type="text"
                                value={item.unidade}
                                onChange={(e) => {
                                    const newIngredientes = [...ingredientes];
                                    newIngredientes[index].unidade = e.target.value;
                                    setIngredientes(newIngredientes);
                                }}
                                placeholder="Unidade"
                            />{' '}
                            de{' '}
                            <input
                                type="text"
                                value={item.ingrediente}
                                onChange={(e) => {
                                    const newIngredientes = [...ingredientes];
                                    newIngredientes[index].ingrediente = e.target.value;
                                    setIngredientes(newIngredientes);
                                }}
                                placeholder="Ingrediente"
                            />
                            <button onClick={() => handleRemoveIngrediente(index)}>Remover</button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
                <h2>Modo de Preparo</h2>
                <textarea
                    value={modoPreparo}
                    onChange={(e) => setModoPreparo(e.target.value)}
                    placeholder="Modo de Preparo"
                />
                <button onClick={handleEditar}>Salvar</button>
                <button onClick={() => setEditMode(false)}>Cancelar</button>
            </div>
        ) : (
            <div>
                <h1>{receita.titulo}</h1>
                <h2>Ingredientes</h2>
                <ul>
                    {receita.ingredientes.map((item, index) => (
                        <li key={index}>
                            {item.quantidade} {item.unidade} de {item.ingrediente}
                        </li>
                    ))}
                </ul>
                <h2>Modo de Preparo</h2>
                <p>{receita.modoPreparo}</p>
                <button onClick={() => setEditMode(true)}>Editar</button>
                <button onClick={handleRemover}>Remover</button>
            </div>
        )}
        {mensagemConfirmacao && <p>{mensagemConfirmacao}</p>} {/* Exibe a mensagem de confirmação */}
    </div>
);

}

export default DetalhesReceita;
