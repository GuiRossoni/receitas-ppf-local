import React from 'react';
import { Link } from 'react-router-dom';
import '../../Components/assets/css/style.css';

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Receitas Super Poderosas</h1>
      <ul className='link'>
        <li><Link to="/receitas">Ver Receitas</Link></li>
        <li><Link to="/adicionar">Adicionar Receita</Link></li>
      </ul>
    </div>
  );
}

export default Home;
