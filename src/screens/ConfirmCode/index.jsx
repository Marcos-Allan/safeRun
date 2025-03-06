//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'
import { Link } from 'react-router';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../../components/Button';
import Header from '../../components/Header';

//IMPORTAÇÃO DOS ÍCONES
import { FcGoogle } from "react-icons/fc";
import { IoMdPhonePortrait } from "react-icons/io";

export default  function ConfirmCode() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1`}>Confirme o código</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px]`}>Insira o código enviado para o email</p>

            <label htmlFor="#input-codigo" className={`text-my-gray text-left w-[80%] mb-2`}>Código</label>
            <div className={`w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] mb-6`}>
                <label htmlFor="#input-codigo">
                    <IoMdPhonePortrait className={`text-[24px] mb-1`} />
                </label>
                <input id="input-codigo" placeholder="Código" className={`py-3 px-3 focus:outline-none flex-grow-[1] placeholder:text-my-gray`} />
            </div>

            <Button text={'confirmar'} />
            
            <p className={`text-my-gray font-light text-[16px] mt-4 mb-6`}>Não tem uma conta ainda? <Link to={'/sign-up'} className={`font-bold text-[18px]`}>Crie uma</Link></p>

            <div className={`w-[80%] flex items-center justify-center border-[1px] border-my-gray px-4 py-3 rounded-[6px] relative`}>
                <FcGoogle className={`text-[32px]`} />
                <p className={`flex-grow-[1] text-center text-[18px] font-semibold text-my-gray`}>Continue com o Google</p>
            </div>
        </div>
    )
}