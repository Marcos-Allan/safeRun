//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';

//IMPORTAÇÃO DOS ÍCONES
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function Navbar() {
    //IMPORTAÇAO DO HOOK useLocation
    const location = useLocation();
    
    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    useEffect(() => {
        console.log(location.pathname)
    },[])

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    //UTILIZAÇÃO DO HOOK useState
    const [isHover, setIsHover] = useState(undefined)

    //FUNÇÃO RESPONSÁVEL POR VERIFICAR QUAL ICONE ESTA RECEBENDO O HOVER
    function toggleIsHover(icon=undefined) {
        setIsHover(icon)
    }

    return(
        <div
            className={`sm:border-r-[1px] sm:border-my-gray
                w-full h-[80px] flex items-center justify-start px-[10%] fixed bottom-0 left-0
            sm:flex-col sm:px-1 sm:w-auto sm:h-screen sm:top-0 sm:items-center sm:justify-start z-[3] 
            ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}
            rounded-tl-[24px] rounded-tr-[24px] sm:rounded-[0px] py-8
        `}>
            
            {/* Ícone Home */}
            <div
                onMouseEnter={() => toggleIsHover('home')}
                onMouseLeave={() => toggleIsHover()}
                onClick={() => navigate('/principal')} 
                className={`flex items-center justify-center sm:flex-col sm:items-center sm:h-[60px] sm:gap-1
                cursor-pointer sm:mb-12 px-2 transition-all duration-[.2s]
                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                ${location.pathname == '/principal' ? 'bg-my-secondary text-my-white rounded-[16px] sm:bg-transparent sm:rounded-[0px]' : ''}
            `}>
                <div className={`flex items-center justify-center w-[40px] h-[40px] sm:min-h-[54px] sm:min-w-[54px] rounded-[50%] transition-all duration-[.2s]
                    ${location.pathname == '/principal' ? 'bg-my-secondary sm:border-[1px] sm:border-my-secondary' : ''}
                    ${isHover == 'home' && 'sm:bg-my-white sm:text-my-secondary'}
                `}>
                    <HiOutlineHome className="text-[24px]" />
                </div>
                <p className={`me-3 sm:me-0 text-[14px] sm:mt-0 sm:text-my-secondary font-medium transition-all ${location.pathname !== '/principal' ? 'hidden sm:block opacity-0' : 'opacity-100'}`}>
                    Home
                </p>
            </div>

            {/* Ícone Perfil */}
            <div
                onMouseEnter={() => toggleIsHover('perfil')}
                onMouseLeave={() => toggleIsHover()}
                onClick={() => navigate('/my-perfil')}
                className={`flex items-center justify-center sm:flex-col sm:items-center sm:h-[60px] sm:gap-1
                cursor-pointer sm:mb-12 px-2 transition-all duration-[.2s]
                ${theme == 'light' ? 'text-my-black' : 'text-my-white'}
                ${location.pathname == '/my-perfil' ? 'bg-my-secondary text-my-white rounded-[16px] sm:bg-transparent sm:rounded-[0px]' : ''}
            `}>
                <div className={`flex items-center justify-center w-[40px] h-[40px] sm:min-h-[54px] sm:min-w-[54px] rounded-[50%] transition-all duration-[.2s]
                    ${location.pathname == '/my-perfil' ? 'bg-my-secondary sm:border-[1px] sm:border-my-secondary' : ''}
                    ${isHover == 'perfil' && 'sm:bg-my-white sm:text-my-secondary'}
                `}>
                    <FaRegUser className="text-[24px]" />
                </div>
                <p className={`me-3 sm:me-0 text-[14px] sm:mt-0 sm:text-my-secondary font-medium transition-all
                    ${location.pathname !== '/my-perfil' ? 'hidden sm:block opacity-0' : 'opacity-100'}
                `}>
                    Perfil
                </p>
            </div>
        </div>
    )
}