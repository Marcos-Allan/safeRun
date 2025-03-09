//IMPORTAÇÃO DAS BIBLIOTECAS
import { useState, useContext, useEffect } from 'react'
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

export default  function SwitchPassword() {

    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading, toggleUser, user } = useContext(GlobalContext);

    //UTILIZAÇÃO DO HOOK useState
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [passwordValid, setPasswordValid] = useState(undefined)
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(undefined)
    
    const [btnValid, setBtnValid] = useState(false)

    const [timeoutIdPassword, setTimeoutIdPassword] = useState(null);
    const [timeoutIdConfirmPassword, setTimeoutIdConfirmPassword] = useState(null);

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function updateUser() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        axios.put(`https://backendsaferun.onrender.com/update-user/${user.id}`, {
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
                toast.success(`Senha alterada com sucesso!`,  {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })

                //VERIFICA SE O USUÁRIO TEM FOTO DE PERFIL
                const image = response.data.img ? response.data.img : undefined

                //COLOCA OS DADOS DO BACKEND DO USUÁRIO NO FRONTEND
                //id, name, email, history, cart, client_type, cpf, img, logged
                toggleUser(response.data._id, response.data.name, response.data.email, response.data.historico_pedido, response.data.cart, response.data.client_type, response.data.cpf, image, true)
                
                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/sign-in')
            }else{
                toast.dismiss();
                //CHAMA O MODAL DE ERRO
                toast.error(response.data,  {
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
    function handlePasswordInput(e) {
        //SETA O ESTADO DO INPUT DE SENHA COMO undefined
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
    function handleConfirmPasswordInput(e) {
        //SETA O ESTADO DO INPUT DE CONFIRMAR SENHA COMO undefined
        setConfirmPasswordValid(undefined)
        
        //SETA A CONFIRMAÇÃO DA SENHA COM BASE NO TEXTO DIGITADO NO INPUT
        setConfirmPassword(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdConfirmPassword) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdConfirmPassword);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatConfirmPasswordInput(e.target.value)
        }, 350);

        //SETA UM NOVO TIMER
        setTimeoutIdConfirmPassword(newTimeoutId);
    }

    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatPasswordInput(password) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(password.length >= 0 && password.length < 6){
            //SETA O ESTADO DO INPUT DE SENHA COMO undefined
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
    
    function validatConfirmPasswordInput(confirmPassword) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoConfirmPassword = new RegExp(`^${password}$`)

        //VERIFICA SE O EMAIL ESTÁ VAZIO
        if(confirmPassword.length >= 0 && confirmPassword.length < 6){
            //SETA O ESTADO DO INPUT DE CONFIRMAR A SENHA COMO undefined
            setConfirmPasswordValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoConfirmPassword.test(confirmPassword) == true) {
                //SETA O ESTADO DO INPUT DE CONFIRMAR A SENHA COMO true
                setConfirmPasswordValid(true)
            }else{
                //SETA O ESTADO DO INPUT DE CONFIRMAR A SENHA COMO false
                setConfirmPasswordValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(passwordValid == true && confirmPasswordValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[passwordValid, confirmPasswordValid])

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1 max-w-[700px]`}>Troque sua senha</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px] max-w-[700px]`}>Tudo certo!, digite sua nova senha </p>

            <Input
                label={'Senha'}
                placeholder={'********'}
                type={'password'}
                validate={passwordValid}
                value={password}
                onChange={handlePasswordInput}
                ind='new-password'
            />
            
            <Input
                label={'Confirmar senha'}
                placeholder={'********'}
                type={'password'}
                validate={confirmPasswordValid}
                value={confirmPassword}
                onChange={handleConfirmPasswordInput}
                ind='current-password'
            />

            <div className={`flex justify-center w-full mb-12`}>
                <Button text={'Trocar'} event={() => updateUser()} />
            </div>

            <GoogleLogin />
        </div>
    )
}