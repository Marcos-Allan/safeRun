//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router';


//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS COMPONENTES
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import GoogleLogin from '../../components/GoogleLogin';

//IMPORTAÇÃO DOS ÍCONES
import { FaCheck } from 'react-icons/fa';

export default  function SignUp() {
    
    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    //UTILIZAÇÃO DO HOOK useState
    const [terms, setTerms] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const [cpf, setCpf] = useState('')
    
    const [nameValid, setNameValid] = useState(undefined)
    const [emailValid, setEmailValid] = useState(undefined) 
    const [passwordValid, setPasswordValid] = useState(undefined)
    const [cpfValid, setCpfValid] = useState(undefined)
    
    const [btnValid, setBtnValid] = useState(false)

    const [timeoutIdName, setTimeoutIdName] = useState(null);
    const [timeoutIdEmail, setTimeoutIdEmail] = useState(null);
    const [timeoutIdPassword, setTimeoutIdPassword] = useState(null);
    const [timeoutIdCpf, setTimeoutIdCpf] = useState(null);

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading, toggleUser } = useContext(GlobalContext);

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
            cpf: cpf,
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
                toast.success(`Seja muito bem vindo ${response.data.name}`, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })

                //VERIFICA SE O USUÁRIO TEM FOTO DE PERFIL
                const image = response.data.img ? response.data.img : undefined

                //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
                toggleUser(response.data._id, response.data.name, response.data.email, response.data.historico_pedido, response.data.cart, response.data.client_type, response.data.cpf, image, true)
                
                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/principal')
            }else{
                toast.dismiss();
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

    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handleCpfInput(e) {
        //SETA O ESTADO DO INPUT DE NAME COMO undefined
        setCpfValid(undefined)

        //SETA O NAME COM BASE NO TEXTO DIGITADO NO INPUT
        setCpf(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdCpf) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdCpf);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatCpfInput(e.target.value)
        }, 350);
        
        //SETA UM NOVO TIMER
        setTimeoutIdCpf(newTimeoutId);
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

    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatCpfInput(cpf) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoCpf = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
        
        //VERIFICA SE O NOME ESTÁ VAZIO
        if(cpf.length >= 0 && cpf.length < 11){
            //SETA O NAME DO INPUT DE CPF COMO undefined
            setCpfValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoCpf.test(cpf) == true) {
                //SETA O NAME DO INPUT DE EMAIL COMO true
                setCpfValid(true)
            }else{
                //SETA O NAME DO INPUT DE EMAIL COMO false
                setCpfValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(emailValid == true && passwordValid == true && nameValid == true && cpfValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[emailValid, passwordValid, nameValid, cpfValid])

    return(
        <div className={`max-w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'} overflow-x-hidden pb-[50px]`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1 max-w-[700px]`}>Vamos comçar</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px] max-w-[700px]`}>Crie uma conta para continuar</p>

            
            <Input
                type={'name'}
                label={'Nome'}
                placeholder={'Ana'}
                validate={nameValid}
                value={name}
                onChange={handleNameInput}
                ind={'name'}
            />
            
            <Input
                type={'cpf'}
                label={'CPF'}
                placeholder={'000.000.000-00'}
                validate={cpfValid}
                value={cpf}
                onChange={handleCpfInput}
                ind={'cpf'}
            />
            
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

            <div className={`w-[80%] flex items-center justify-center gap-2 mb-4 font-light max-w-[700px]`}>
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

            <p className={`text-my-gray font-light text-[16px] mt-4 mb-1`}>Já tem uma conta? <Link to={'/sign-in'} className={`font-bold text-[18px]`}>Entre</Link></p>
            
            <p className={`text-my-gray font-light text-[16px] mt-2 mb-6`}>Esqueceu sua senha? <Link to={'/forgout-password'} className={`font-bold text-[18px]`}>Recupere</Link></p>

            <GoogleLogin />
        </div>
    )
}