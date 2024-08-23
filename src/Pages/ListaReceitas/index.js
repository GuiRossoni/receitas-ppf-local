import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { buscarReceitas } from '../../api';

function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    const getReceitas = async () => {
      const data = await buscarReceitas();
      setReceitas(data);
    };
    getReceitas();
  }, []);

  return (
    <div>
      <ul className='link'>
        <li><Link to="/">Voltar</Link></li>
        <li><Link to="/adicionar">Nova Receita</Link></li>
      </ul>
      <h1>Lista de Receitas</h1>
      <ul>
        {receitas.map(receita => (
          <li key={receita.id}>
            <Link to={`/receitas/${receita.id}`}>{receita.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaReceitas;
