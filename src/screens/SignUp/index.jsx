//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router';
import axios from 'axios'
import { toast } from 'react-toastify';

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
import { MdOutlineEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export default  function SignUp() {

    //UTILIZAÇÃO DO HOOK useState
    const [terms, setTerms] = useState(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const [nameValid, setNameValid] = useState<boolean | undefined>(undefined)
    const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined)
    const [passwordValid, setPasswordValid] = useState<boolean | undefined>(undefined)
    
    const [btnValid, setBtnValid] = useState<boolean>(false)

    const [timeoutIdName, setTimeoutIdName] = useState<NodeJS.Timeout | null>(null);
    const [timeoutIdEmail, setTimeoutIdEmail] = useState<NodeJS.Timeout | null>(null);
    const [timeoutIdPassword, setTimeoutIdPassword] = useState<NodeJS.Timeout | null>(null);

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    //FUNÇÃ ORESPONSÁVEL POR TROCAR O ESTADO DO terms
    function toggleTerms() {
        //MUDA O ESTADO DE terms
        setTerms(!terms)
    }

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function signUp() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        axios.post(`https://backendsaferun.onrender.com/register`, {
            name: name,
            email: email,
            password: password,
        })
        .then(function (response) {
            //RETORNA A RESPOSTA DA REQUISIÇÃO PRO USUÁRIO
            console.log(response.data)

            //MUDA O ESTADO DA APLICAÇÃO PARA false
            toggleLoading(false)

            //VERIFICA SE O TIPO RETORNADO DA REQUISIÇÃO É UM OBJETO
            if(typeof response.data === 'object'){
                toast.dismiss();
                //CHAMA O MODAL DE SUCESSO
                toast.success(`Seja muito bem vindo ${response.data.name}`)

                //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
                toggleUser(response.data._id, response.data.name, response.data.email, response.data.historico_pedido, response.data.client_type, true)
                
                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/principal')
            }else{
                toast.dismiss();
                //CHAMA O MODAL DE ERRO
                toast.error(response.data)
            }
        })
        .catch(function (error) {
            //ESCREVE O ERRO NO CONSOLE
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handleNameInput(e) {
        //SETA O ESTADO DO INPUT DE NAME COMO undefined
        setNameValid(undefined)

        //SETA O NAME COM BASE NO TEXTO DIGITADO NO INPUT
        setName(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdName) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdName);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatNameInput(e.target.value)
        }, 350);
        
        //SETA UM NOVO TIMER
        setTimeoutIdName(newTimeoutId);
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
        //SETA A SENHA DO INPUT DE EMAIL COM undefined
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
    function validatNameInput(name) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoName = /^[a-zA-Z\s]{2,}$/
        
        //VERIFICA SE O NOME ESTÁ VAZIO
        if(name.length >= 0 && name.length < 3){
            //SETA O NAME DO INPUT DE EMAIL COMO undefined
            setNameValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoName.test(name) == true) {
                //SETA O NAME DO INPUT DE EMAIL COMO true
                setNameValid(true)
            }else{
                //SETA O NAME DO INPUT DE EMAIL COMO false
                setNameValid(false)
            }
        }
    }

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
    
    function validatPasswordInput(password) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(password.length >= 0 && password.length < 6){
            //SETA A SENHA DO INPUT DE EMAIL COMO undefined
            setPasswordValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoPassword.test(password) == true) {
                //SETA A SENHA DO INPUT DE EMAIL COMO true
                setPasswordValid(true)
            }else{
                //SETA A SENHA DO INPUT DE EMAIL COMO true
                setPasswordValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(emailValid == true && passwordValid == true && nameValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[emailValid, passwordValid, nameValid])

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1`}>Vamos comçar</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px]`}>Crie sua conta para continuar</p>

            <label htmlFor="#input-email" className={`text-my-gray text-left w-[80%] mb-2`}>Email</label>
            <div className={`w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] mb-6`}>
                <label htmlFor="#input-email">
                    <MdOutlineEmail className={`text-[24px] mb-1`} />
                </label>
                <input id="input-email" placeholder="Email" className={`py-3 px-3 focus:outline-none flex-grow-[1] placeholder:text-my-gray`} />
            </div>

            <Input
                type={'email'}
                label={'Email'}
                placeholder={'Email'}
                validate={emailValid}
                value={email}
                onChange={handleEmailInput}
                ind={'email'}
            />
            
            <Input
                type={'text'}
                label={'Nome'}
                placeholder={'Nome'}
                validate={nameValid}
                value={name}
                onChange={handleNameInput}
                ind={'name'}
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
            
            <label htmlFor="#input-nome" className={`text-my-gray text-left w-[80%] mb-2`}>Nome</label>
            <div className={`w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] mb-6`}>
                <label htmlFor="#input-nome">
                    <FiUser className={`text-[24px] mb-1`} />
                </label>
                <input id="input-nome" placeholder="Nome" className={`py-3 px-3 focus:outline-none flex-grow-[1] placeholder:text-my-gray`} />
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

            <div className={`w-[80%] flex items-center gap-2 mb-4 font-light`}>
                <div
                    onClick={() => toggleTerms()}
                    className={`
                        w-[27px] h-[22px] rounded-[4px] flex items-center justify-center border-[1px]
                        ${terms == false ? 'border-my-gray' : 'bg-my-primary border-my-primary'} 
                    `}
                >
                    {terms == true && (
                        <FaCheck className={`text-[14px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
                    )}
                </div>
                <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Com a criação da conta eu aceito os <strong>termos e condições</strong></p>
            </div>
            
            <Button text={'criar conta'} event={() => signUp()} />

            <p className={`text-my-gray font-light text-[16px] mt-4 mb-6`}>Já tem uma conta? <Link to={'/sign-in'} className={`font-bold text-[18px]`}>Entre</Link></p>

            <div className={`w-[80%] flex items-center justify-center border-[1px] border-my-gray px-4 py-3 rounded-[6px] relative`}>
                <FcGoogle className={`text-[32px]`} />
                <p className={`flex-grow-[1] text-center text-[18px] font-semibold text-my-gray`}>Continue com o Google</p>
            </div>
        </div>
    )
}