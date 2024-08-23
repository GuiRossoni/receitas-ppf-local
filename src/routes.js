import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home";
import Erro from "./Pages/Erro";
import ListaReceitas from './Pages/ListaReceitas';
import DetalhesReceita from './Pages/DetalhesReceita';
import AdicionarReceita from './Pages/AdicionarReceita';

function RoutesApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receitas" element={<ListaReceitas />} />
        <Route path="/receitas/:id" element={<DetalhesReceita />} />
        <Route path="/adicionar" element={<AdicionarReceita />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
