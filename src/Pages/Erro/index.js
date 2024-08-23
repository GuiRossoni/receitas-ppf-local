import { Link } from 'react-router-dom';

function Erro() {
  return (
    <div>
      <h2>Ops! Parece que essa pagina nao existe</h2>
        <span>Encontramos essas paginas aqui:</span>
        <Link to="/">Home</Link><br/>
    </div>
  );
}

export default Erro;