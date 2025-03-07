//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState } from 'react'

//IMPORTAÇÃO DOS ÍCONES
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {

    //UTILIZAÇÃO DO HOOK useState
    const [isHover, setIsHover] = useState(false)

    return(
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`w-[80%] flex items-center justify-center border-[1px] border-my-gray px-4 py-3 rounded-[6px] relative max-w-[700px] cursor-pointer`}
        >
            <FcGoogle className={`text-[32px] ${isHover == true ? 'rotate-[360deg]' : 'rotate-[0deg]'} transition-all duration-[.4s]`} />
            <p className={`flex-grow-[1] text-center text-[18px] font-semibold text-my-gray`}>Continue com o Google</p>
        </div>
    )
}