//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS ÍCONES
import { IoMoon, IoSunny } from "react-icons/io5";

export default function Header() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleTheme } = useContext(GlobalContext);

    return(
        <div className={`z-[2] fixed top-0 left-0 w-full flex tems-center px-4 justify-end ${theme == 'dark' ? 'text-my-white' : 'text-my-black '}`}>
            <div
                onClick={() => {
                    console.log("clicou")
                    toggleTheme()
                }}
                className={`text-[36px] m-6 transition-all duration-[.25s] hover:rotate-[360deg] cursor-pointer`}
            >
                {theme == 'light' ? (
                    <IoSunny />
                ):(
                    <IoMoon />
                )} 
            </div>
        </div>
    )
}