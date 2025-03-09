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

export default  function ConfirmCode() {

    //UTILIZAÇÃO DO HOOK useNavigate
    const navigate = useNavigate()

    //UTILIZAÇÃO DO HOOK useState
    const [code, setCode] = useState('')
    const [codeValid, setCodeValid] = useState(undefined)
    
    const [btnValid, setBtnValid] = useState(false)

    const [timeoutIdCode, setTimeoutIdCode] = useState(null)
    
    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, toggleLoading } = useContext(GlobalContext);

    //FUNÇÃO RESPONÁVEL POR FAZER LOGIN
    function verifyCode() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        axios.get(`https://backendsaferun.onrender.com/verify-code/${code}`)
        .then(function (response) {
            //RETORNA A RESPOSTA DA REQUISIÇÃO PRO USUÁRIO
            console.log(response.data)
            
            //VERIFICA SE O TIPO RETORNADO DA REQUISIÇÃO É UMA STRING
            if(response.data == 'Código de verificação errado'){
                toast.dismiss();
                //CHAMA O MODAL DE ERRO
                toast.error(response.data, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })
                
                // MUDA O ESTADO DA APLICAÇÃO PARA false
                toggleLoading(false)
            }else{
                toast.dismiss();
                //CHAMA O MODAL DE SUCESSO
                toast.success(`Código correto`, {
                    style: {
                        backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                        color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
                    }
                })
                
                // MUDA O ESTADO DA APLICAÇÃO PARA false
                toggleLoading(false)

                //NAVEGA PARA A PRÓXIMA PÁGINA
                navigate('/switch-password')
            }

        })
        .catch(function (error) {
            //ESCREVE O ERRO NO CONSOLE
            console.log(error)
        })
    }

    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handleCodeInput(e) {
        //SETA O ESTADO DO INPUT DE CODE COMO undefined
        setCodeValid(undefined)

        //SETA O CODE COM BASE NO TEXTO DIGITADO NO INPUT
        setCode(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdCode) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdCode);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatCodelInput(e.target.value)
        }, 350);

        //SETA UM NOVO TIMER
        setTimeoutIdCode(newTimeoutId);
    }

    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatCodelInput() {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoCode = /^\d{3}-\d{2}$/

        //VERIFICA SE O code ESTÁ VAZIO
        if(code.length >= 0 && code.length < 6){
            //SETA O ESTADO DO INPUT DE CODE COMO undefined
            setCodeValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoCode.test(code) == true) {
                //SETA O ESTADO DO INPUT DE CODE COMO true
                setCodeValid(true)
            }else{
                //SETA O ESTADO DO INPUT DE CODE COMO false
                setCodeValid(false)
            }
        }
    }

    //FUNÇÃO CHAMADA TODA VEZ QUE A PÁGINA É RECARREGADA
    useEffect(() => {
        //VERIFICA SE OS ESTADOS DDOS INPUTS ESTÃO CORRETOS
        if(codeValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[codeValid])

    return(
        <div className={`w-screen min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'}`}>

            <Header />

            <h1 className={`z-[2] w-[80%] text-left font-bold text-[28px] mb-1 max-w-[700px]`}>Confirme o código</h1>
            <p className={`pl-1 text-left w-[80%] text-my-gray mb-10 text-[16px] max-w-[700px]`}>Insira o código enviado para o email</p>

            <Input
                type={'code'}
                label={'Código'}
                placeholder={'000-000'}
                validate={codeValid}
                value={code}
                onChange={handleCodeInput}
                ind='off'
            />

            <div className={`flex justify-center w-full mb-12`}>
                <Button text={'confirmar'} event={() => verifyCode()} />
            </div>

            <GoogleLogin />
        </div>
    )
}