//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router'

//IMPORTAÇÃO DOS ÍCONES
import { FcGoogle } from "react-icons/fc";

//IMPORTAÇÃO DOS SERVIÇOS DO FIREBASE
import { auth, provider, signInWithPopup } from '../../utils/firebase.tsx'

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

export default function GoogleLogin() {

    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    //UTILIZAÇÃO DO HOOK useState
    const [isHover, setIsHover] = useState(false)

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading, toggleUser } = useContext(GlobalContext);

    //FUNÇÃO RESPONSÁVEL POR FAZER LOGIN
    function signIn(email, name) {
        axios.post('https://backendsaferun.onrender.com/register-google', {
            email: email,
            name: name,
        })
        .then(function (response) {
            
            if(typeof response.data === 'object'){
                toast.dismiss();
                //CHAMA O MODAL DE SUCESSO
                toast.success(`${response.data.message} ${response.data.person.name}`, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })

                //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
                // toggleUser(response.data.person._id, response.data.person.name, response.data.person.email, response.data.person.historico_pedido, response.data.person.cart, response.data.person.client_type, true)
                toggleUser(response.data._id, 'Danilo', 'Danilo@gmail.com', response.data.historico_pedido, response.data.cart, response.data.client_type, '000.000.000-00', undefined,  '11 00000-0000', '11 00000-0000', true)

                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/principal')
            }else{
                toast.dismiss();
                //CHAMA O MODAL DE ERRO
                toast.error(response.data)
            }
        })
        .catch(function (error) {
            //ESCREVE O ERRO OCORRIDO NO CONSOLE
            console.log(error)
        })
    }

    //FUNÇÃO REPOSNSÁVEL POR FAZER LOGIN COM O GOOGLE
    const handleGoogleLogin = async () => {
        //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA true
        toggleLoading(true)

        try {
            //REALIZA O LOGIN VIA POPUP DO GOOGLE
            const result = await signInWithPopup(auth, provider);
            
            // FAZ LOGIN COM A CONTA DO USÁRIO
            if(result.user){
                //MUDA O ESTADO DE CARREGAMENTO DA PÁGINA PARA false
                toggleLoading(false)
                signIn(result.user.email || "", result.user.displayName || "")
                console.log(result.user)
            }
        } catch (error) {
            //ESCREVE O ERRO NO CONSOLE
            console.error("Erro ao fazer login:", error);
        }
    };

    return(
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => handleGoogleLogin()}
            className={`w-[80%] flex items-center justify-center border-[1px] border-my-gray px-4 py-3 rounded-[6px] relative max-w-[700px] cursor-pointer`}
        >
            <FcGoogle className={`text-[32px] ${isHover == true ? 'rotate-[360deg]' : 'rotate-[0deg]'} transition-all duration-[.4s]`} />
            <p className={`flex-grow-[1] text-center text-[18px] font-semibold text-my-gray`}>Continue com o Google</p>
        </div>
    )
}