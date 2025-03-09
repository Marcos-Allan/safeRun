//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import axios from 'axios'
import { toast } from 'react-toastify';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import GoogleLogin from '../../components/GoogleLogin';

export default  function ForgoutPassword() {
    
    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()
    
    //UTILIZAÇÃO DO HOOK useState
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(undefined)
    const [timeoutIdEmail, setTimeoutIdEmail] = useState(null);

    const [btnValid, setBtnValid] = useState(false)

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading, user, toggleUser } = useContext(GlobalContext);

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function forgoutPassword() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        axios.get(`https://backendsaferun.onrender.com/forgout-password/${email}`)
        .then(function (response) {
            //RETORNA A RESPOSTA DA REQUISIÇÃO PRO USUÁRIO
            console.log(response.data)
            
            if(response.data == 'Usuário não cadastrado com esse email'){
                toast.dismiss();
                //CHAMA O MODAL DE ERRO
                toast.error(response.data)
                
                // MUDA O ESTADO DA APLICAÇÃO PARA false
                toggleLoading(false)
            }else{
                toast.dismiss();
                //CHAMA O MODAL DE SUCESSO
                toast.success(`Email enviado para ${email}`, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })

                //VERIFICA SE O USUÁRIO TEM FOTO DE PERFIL
                const image = response.data.img ? response.data.img : undefined

                //SETA OS DADOS DO USUÁRIO NO FRONTEND DA APLICAÇÃO
                toggleUser(response.data.user._id, user.name, user.email, user.history, user.cart, user.client_type, image, user.logged )
                
                // MUDA O ESTADO DA APLICAÇÃO PARA false
                toggleLoading(false)

                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/confirm-code')
            }

        })
        .catch(function (error) {
            //ESCREVE O ERRO NO CONSOLE
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handleEmailInput(e) {
        //SETA O ESTADO DO INPUT DE EMAIL COM undefined
        setEmailValid(undefined)

        //SETA O EMAIL COM BASE NO TEXTO DIGITADO NO INPUT
        setEmail(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdEmail) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdEmail);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatEmailInput(e.target.value)
        }, 350);

        //SETA UM NOVO TIMER
        setTimeoutIdEmail(newTimeoutId);
    }
    
    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatEmailInput(email) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoEmail = /^[\w._-]+@[\w._-]+\.[\w]{2,}/i

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(email.length >= 0 && email.length < 16){
            //SETA O EMAIL DO INPUT DE EMAIL COMO undefined
            setEmailValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoEmail.test(email) == true) {
                //SETA O EMAIL DO INPUT DE EMAIL COMO true
                setEmailValid(true)
            }else{
                //SETA O EMAIL DO INPUT DE EMAIL COMO false
                setEmailValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(emailValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[emailValid])

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1 max-w-[700px]`}>Recupere sua senha</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px] max-w-[700px]`}>Informe seu email, para recuperar a conta</p>

            <Input
                type={'email'}
                label={'Email'}
                placeholder={'exemplo@gmail.com'}
                validate={emailValid}
                value={email}
                onChange={handleEmailInput}
                ind={'email'}
            />

            <Button text={'enviar código'} event={() => forgoutPassword()} />
            
            <p className={`text-my-gray font-light text-[16px] mt-4 mb-1`}>Já tem uma conta? <Link to={'/sign-in'} className={`font-bold text-[18px]`}>Entre</Link></p>

            <p className={`text-my-gray font-light text-[16px] mt-2 mb-6`}>Não tem uma conta ainda? <Link to={'/sign-up'} className={`font-bold text-[18px]`}>Crie uma</Link></p>

            <GoogleLogin />
        </div>
    )
}