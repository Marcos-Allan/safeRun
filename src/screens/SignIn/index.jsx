//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router';
import axios from 'axios'
import { toast } from 'react-toastify';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input/index';
import GoogleLogin from '../../components/GoogleLogin';

export default  function SignIn() {

    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    //UTILIZAÇÃO DO HOOK useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailValid, setEmailValid] = useState(undefined)
    const [passwordValid, setPasswordValid] = useState(undefined)
    
    const [btnValid, setBtnValid] = useState(false)

    const [timeoutIdEmail, setTimeoutIdEmail] = useState(null);
    const [timeoutIdPassword, setTimeoutIdPassword] = useState(null);

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading, toggleUser } = useContext(GlobalContext);

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function signIn() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        console.log('evento chamado')

        axios.post(`https://backendsaferun.onrender.com/login`, {
            email: email,
            password: password,
        })
        .then(function (response) {
            //RETORNA A RESPOSTA DA REQUISIÇÃO PRO USUÁRIO
            console.log('rd: '+response.data)

            //VERIFICA SE O USUÁRIO TEM FOTO DE PERFIL
            const image = response.data.img ? response.data.img : undefined

            //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
            // toggleUser(response.data._id, response.data.name, response.data.email, response.data.historico_pedido, response.data.cart, response.data.client_type, response.data.cpf, image,  true)
            toggleUser(response.data._id, 'Danilo', 'Danilo@gmail.com', response.data.historico_pedido, response.data.cart, response.data.client_type, '000.000.000-00', undefined,  '11 00000-0000', '11 00000-0000', true)

            //MUDA O ESTADO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //VERIFICA SE O TIPO RETORNADO DA REQUISIÇÃO É UM OBJETO
            if(typeof response.data === 'object'){
                //DISPENSA O MODAL
                toast.dismiss();
                //CHAMA O MODAL DE SUCESSO
                toast.success(`Bem vindo novamente ${response.data.name}`, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })
                
                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/principal')
            }else{
                //DISPENSA O MODAL
                toast.dismiss();
                //ESCREVE NO CONSOLE O ERRO OCORRIDO DURANTE 
                console.log('evento falho')
                //CHAMA O MODAL DE ERRO
                toast.error(response.data, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })
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
    
    function handlePasswordInput(e) {
        //SETA O ESTADO DO INPUT DE SENHA COM undefined
        setPasswordValid(undefined)

        //SETA A SENHA COM BASE NO TEXTO DIGITADO NO INPUT
        setPassword(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdPassword) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdPassword);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatPasswordInput(e.target.value)
        }, 350);

        //SETA UM NOVO TIMER
        setTimeoutIdPassword(newTimeoutId);
    }

    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatEmailInput(email) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoEmail = /^[\w._-]+@[\w._-]+\.[\w]{2,}/i

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(email.length >= 0 && email.length < 16){
            //SETA O ESTADO DO INPUT DE EMAIL COMO undefined
            setEmailValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoEmail.test(email) == true) {
                //SETA O ESTADO DO INPUT DE EMAIL COMO true
                setEmailValid(true)
            }else{
                //SETA O ESTADO DO INPUT DE EMAIL COMO false
                setEmailValid(false)
            }
        }
    }
    
    function validatPasswordInput(password) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(password.length >= 0 && password.length < 6){
            setPasswordValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoPassword.test(password) == true) {
                //SETA O ESTADO DO INPUT DE SENHA COMO true
                setPasswordValid(true)
            }else{
                //SETA O ESTADO DO INPUT DE SENHA COMO false
                setPasswordValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(emailValid == true && passwordValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[emailValid, passwordValid])

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'} overflow-x-hidden pb-[50px]`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1 max-w-[700px]`}>Entre com sua conta</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px] max-w-[700px]`}>Bem vindo de volta, sentimos sua falta!</p>

            <Input
                type={'email'}
                label={'Email'}
                placeholder={'exemplo@gmail.com'}
                validate={emailValid}
                value={email}
                onChange={handleEmailInput}
                ind={'email'}
            />

            <Input
                label={'Senha'}
                placeholder={'*******'}
                type={'password'}
                validate={passwordValid}
                value={password}
                onChange={handlePasswordInput}
                ind={'current-password'}
            />

            <Button text={'entrar'} event={() => signIn()} />

            <p className={`text-my-gray font-light text-[16px] mt-4 mb-1`}>Não tem uma conta ainda? <Link to={'/sign-up'} className={`font-bold text-[18px]`}>Crie uma</Link></p>
            
            <p className={`text-my-gray font-light text-[16px] mt-2 mb-6`}>Esqueceu sua senha? <Link to={'/forgout-password'} className={`font-bold text-[18px]`}>Recupere</Link></p>
            
            <GoogleLogin />
        </div>
    )
}