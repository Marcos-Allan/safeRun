//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext } from 'react'

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DAS IMAGENS
import logoLight from '../../assets/Saferun-light.png'
import logoDark from '../../assets/Saferun-dark.png'

//IMPORTAÇÃO DOS COMPONENTES
import Button from "../../components/Button"
import Background from "../../components/Background"
import Header from '../../components/Header';

export default function Home() {
    
    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    return(
        <div className={`w-screen min-h-[100dvh] ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'} flex flex-col items-center justify-start pt-[300px]`}>
            <Header />

            <Background />
            
            <h1 className={`z-[2] w-[80%] text-center font-bold text-[42px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'} mb-[-80px]`}>Bem-vindo a</h1>
            
            <img className={`z-[2]`} src={`${theme == 'light' ? logoLight : logoDark}`} />
            
            <p className={`z-[2] text-center w-[80%] text-my-gray mt-[-100px] mb-10 text-[20px]`}>Com bastante experiência na industria de roupas, nós criamos camisas de alta qualidade</p>
            
            <Button text={'iniciar'} route={'/sign-in'} />

        </div>
    )
}