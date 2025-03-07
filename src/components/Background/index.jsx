//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect } from "react";

//IMPORTAÇÃO DOS COMPONENTES
import Circle from "../Circle";

export default function Background() {

    //UTILIZAÇÃO DO HOOK useState
    const [width, setWidth] = useState(window.innerWidth <= 900 ? window.innerWidth : 900)

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //FUNÇAO RESPONSÁVEL POR SETAR O TAMANHO DA TELA
        const handleResize = () => {
            //VERIFICA SE O TAMANHO DA TELA É MAIOR QUE 900px
            if(window.innerWidth <= 900){
                //SETA O TAMANHO DA TELA
                setWidth(window.innerWidth)
            }else{
                //SETA O TAMANHO DA TELA
                setWidth(900)
            }
        }

        //ADICIONA EVENTO DE REDIMENSIONAMENTO DA TELA
        window.addEventListener('resize', handleResize)
        
        //REMOVE EVENTO DE REDIMENSIONAMENTO DA TELA
        return () => window.removeEventListener('resize', handleResize)
    },[])

    return(
        <div className={`mx-auto w-screen max-w-[900px] h-screen fixed top-0`}>
            <Circle posX={-70} posY={-1} width={200}z bg={0} />
            <Circle posX={Number(width) - 90} posY={24} width={250} bg={1} />
        </div>
    )
}