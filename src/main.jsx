//IMPORTAÇÃO DAS BIBILIOTECAS NECESSÁRIAS PARA RODAR A APLICAÇÃO
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

//IMPORTAÇÃO DO ESTILO GLOBAL DA PÁGINA
import './index.css'

//IMPORTAÇÃO DO COMPONENTE DE MODAL
import { ToastContainer } from 'react-toastify';

//IMPORTAÇÃO DO ESTILO DA BIBLIOTECA DE MODAL
import 'react-toastify/dist/ReactToastify.css';

//IMPORTAÇÃP DO PROVEDOR DE ESTADOS GLOBAIS
import { GlobalProvider } from './provider/provider';

//IMPORTAÇÃO DAS PÁGINAS DA APLICAÇÃO
import Home from './screens/Home/'
import SignIn from './screens/SignIn/';
import SignUp from './screens/SignUp';
import ForgoutPassword from './screens/ForgoutPassword';
import ConfirmCode from './screens/ConfirmCode';
import SwitchPassword from './screens/SwitchPassword';
import MyPerfil from './screens/MyPerfil';
import Principal from './screens/Principal';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<div>Error</div>} />
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgout-password' element={<ForgoutPassword />} />
          <Route path='/confirm-code' element={<ConfirmCode />} />
          <Route path='/switch-password' element={<SwitchPassword />} />
          <Route path='/my-perfil' element={<MyPerfil />} />
          <Route path='/principal' element={<Principal />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer limit={1} />
    </GlobalProvider>
  </StrictMode>,
)
