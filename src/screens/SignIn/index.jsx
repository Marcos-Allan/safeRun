//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useContext } from 'react'
import { Link } from 'react-router';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../../components/Button';
import Header from '../../components/Header';

//IMPORTAÇÃO DOS ÍCONES
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default  function SignIn() {

    //UTILIZAÇÃO DO HOOK useState
    const [isVisible, setIsVisible] = useState(false)

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1`}>Entre com sua conta</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px]`}>Bem vindo de volta, sentimos sua falta!</p>

            <label htmlFor="#input-email" className={`text-my-gray text-left w-[80%] mb-2`}>Email</label>
            <div className={`w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] mb-6`}>
                <label htmlFor="#input-email">
                    <FiUser className={`text-[24px] mb-1`} />
                </label>
                <input id="input-email" placeholder="Email" className={`py-3 px-3 focus:outline-none flex-grow-[1] placeholder:text-my-gray`} />
            </div>
            
            <label htmlFor="#input-senha" className={`text-my-gray text-left w-[80%] mb-2`}>Senha</label>
            <div className={`w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] relative mb-8`}>
                <label htmlFor="#input">
                    <HiOutlineLockClosed className={`text-[24px]`} />
                </label>
                <input id="input-senha" placeholder="*******" type={`${isVisible == true ? 'text' : 'password'}`} className={`py-3 px-3 focus:outline-none flex-grow-[1] placeholder:text-my-gray`} />
                {isVisible == true ? (
                    <LuEyeOff
                        className={`text-[24px] absolute right-0 mr-2`}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                ) : (
                    <LuEye
                        className={`text-[24px] absolute right-0 mr-2`}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </div>

            <Button text={'login'} route={'/'} />
            <p className={`text-my-gray font-light text-[16px] mt-4 mb-6`}>Não tem uma conta ainda? <Link className={`font-bold text-[18px]`}>Crie uma</Link></p>

            <div className={`w-[80%] flex items-center justify-center border-[1px] border-my-gray px-4 py-3 rounded-[6px] relative`}>
                <FcGoogle className={`text-[32px]`} />
                <p className={`flex-grow-[1] text-center text-[18px] font-semibold text-my-gray`}>Continue com o Google</p>
            </div>
        </div>
    )
}