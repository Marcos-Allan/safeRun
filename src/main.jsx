//IMPORTAÇÃO DAS BIBILIOTECAS NECESSÁRIAS PARA RODAR A APLICAÇÃO
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

//IMPORTAÇÃO DO ESTILO GLOBAL DA PÁGINA
import './index.css'

//IMPORTAÇÃO DAS PÁGINAS DA APLICAÇÃO
import Home from './screens/Home/'
import SignIn from './screens/SignIn/';

//IMPORTAÇÃP DO PROVEDOR DE ESTADOS GLOBAIS
import { GlobalProvider } from './provider/provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<div>Error</div>} />
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
)
