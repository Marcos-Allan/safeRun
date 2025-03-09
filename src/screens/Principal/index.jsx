//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇAO DOS COMPONENTES
import Header from "../../components/Header";
import Navbar from '../../components/Navbar';

export default function Principal() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, user } = useContext(GlobalContext);

    return(
        <div className={`max-w-screen sm:ps-[77px] sm:w-[100dvw-77px] min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'} overflow-x-hidden pb-[80px]`}>
            <Header />
            <Navbar />
        </div>
    )
}