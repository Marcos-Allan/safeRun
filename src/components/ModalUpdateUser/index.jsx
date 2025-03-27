//IMPORTAÇÃO DAS BIBIOTECAS
import { useRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

//IMPORTAÇÃO DOS ÍCONES
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io"

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IIMPORTAÇÃO DOS COMPONENTES
import Input from '../Input/index.jsx';
import Button from '../Button/index.jsx';

export default function ModalUpdateUser() {

    //FAZ REFERENCIA A UM ELEMENTO
    const inputFileRef = useRef(null)

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, user, toggleLoading, toggleUser, updateUserModal, toggleUpdateUserModal } = useContext(GlobalContext);

    const [progress, setProgress] = useState(0)
    
    const [name, setName] = useState(user.name)
    const [img, setImg] = useState(user.img)
    const [cpf, setCpf] = useState(user.cpf)
    const [phoneOne, setPhoneOne] = useState(user.phone1)
    const [phoneTwo, setPhoneTwo] = useState(user.phone2)
    
    const [nameValid, setNameValid] = useState(undefined)
    const [cpfValid, setCpfValid] = useState(undefined)
    const [phoneOneValid, setPhoneOneValid] = useState(undefined)
    const [phoneTwoValid, setPhoneTwoValid] = useState(undefined)
    
    const [btnValid, setBtnValid] = useState(false)

    const [timeoutIdName, setTimeoutIdName] = useState(null);
    const [timeoutIdCpf, setTimeoutIdCpf] = useState(null);
    const [timeoutIdPhoneOne, setTimeoutIdPhoneOne] = useState(null);
    const [timeoutIdPhoneTwo, setTimeoutIdPhoneTwo] = useState(null);
    
    //update-usr/${user.id}
    // password, cpf, img

    //FUNÇÃO RESPONSÁVEL POR PEGAR A IMAGEM DOS ARQUIVOS DO USUÁRIO
    const handleFileIMG = () => {

        //PEGA O ARQUIVO ESCOLHIDO
        const file = inputFileRef.current?.files?.[0]

        //VERIFICA SE TEM ARQUIVO
        if(file){
            //LÊ O ARQUIVO ESCOLHIDO
            const reader = new FileReader()

            //EXECUTA A FUNÇÃO ASSIM QUE O ARQUIVO É CARREGADO
            reader.onloadend = () => {
                //SETA AS IMAGENS COMO URL
                setImg(reader.result)
            }
            //LÊ A URL DO ARQUIVO
            reader.readAsDataURL(file)
        }
    }

    //FUNÇÃO RESPONSÁVEL POR ATUALIZAR OS DADOS DO USUÁRIO
    async function updateUser() {
        //MUDA O ESTADO DA APLICAÇÃO PARA true
        toggleLoading(true)

        //MUDA O ESTADO DE CARREGAMENTO DA APLICAÇÃO PARA true
        toggleLoading(true);
        
        //DISPENSA O MODAL ATUAL
        toast.dismiss();

        //CHAMA O MODAL DE SUCESSO
        toast.success(`Dados atualizados com sucesso`, {
            style: {
                backgroundColor: theme == 'light' ? "#FEFEFE" : "#0D0D0D",
                color: theme == 'light' ? "#0D0D0D" : "#FEFEFE"
            }
        })
        
        //VERIFICA SE O USUÁRIO TEM FOTO DE PERFIL
        const image = undefined

        //COLOCA OS DADOS NO FRONTEND DA APLICAÇÃO
        toggleUser(user.id, name, user.email, user.historico_pedido, user.cart, user.client_type, cpf, image, phoneOne, phoneTwo, true)

        //MUDA O ESTADO DA APLICAÇÃO PARA false
        toggleLoading(false)
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
    function handlePhoneOneInput(e) {
        //SETA O ESTADO DO INPUT DE NAME COMO undefined
        setPhoneOneValid(undefined)

        //SETA O NAME COM BASE NO TEXTO DIGITADO NO INPUT
        setPhoneOne(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdPhoneOne) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdPhoneOne);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatPhoneOneInput(e.target.value)
        }, 350);
        
        //SETA UM NOVO TIMER
        setTimeoutIdPhoneOne(newTimeoutId);
    }
    
    //FUNÇÃO RESPONSÁVEL POR SALVAR  O VALOR DO INPUT   
    function handlePhoneTwoInput(e) {
        //SETA O ESTADO DO INPUT DE NAME COMO undefined
        setPhoneTwoValid(undefined)

        //SETA O NAME COM BASE NO TEXTO DIGITADO NO INPUT
        setPhoneTwo(e.target.value)

        //VERIFICA SE TEM TIMER ATIVO
        if (timeoutIdPhoneTwo) {
            //CANCELA O TIMER ANTERIOR
            clearTimeout(timeoutIdPhoneTwo);
        }

        //DEFINE UM NOVO TIMER PARA VALIDAR O INPUT
        const newTimeoutId = setTimeout(() => {
            //CHAMA A FUNÇÃO QUE VALIDA O INPUT
            validatPhoneTwoInput(e.target.value)
        }, 350);
        
        //SETA UM NOVO TIMER
        setTimeoutIdPhoneTwo(newTimeoutId);
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
    
    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatPhoneOneInput(phoneOne) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPhone = /^\d{2}\s?\d{5}-\d{4}$/
        
        //VERIFICA SE O NOME ESTÁ VAZIO
        if(phoneOne.length >= 0 && phoneOne.length < 3){
            //SETA O NAME DO INPUT DE EMAIL COMO undefined
            setNameValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoPhone.test(phoneOne) == true) {
                //SETA O NAME DO INPUT DE EMAIL COMO true
                setPhoneOneValid(true)
            }else{
                //SETA O NAME DO INPUT DE EMAIL COMO false
                setPhoneOneValid(false)
            }
        }
    }
    
    //FUNÇÃO RESPONSÁVEL POR VALIDAR CAMPO DP INPUT
    function validatPhoneTwoInput(phoneTwo) {
        //USA REGEX PARA VERIFICAR O PADRÃO DA STRING
        const padraoPhone = /^\d{2}\s?\d{5}-\d{4}$/
        
        //VERIFICA SE O NOME ESTÁ VAZIO
        if(phoneTwo.length >= 0 && phoneTwo.length < 3){
            //SETA O NAME DO INPUT DE EMAIL COMO undefined
            setNameValid(undefined)
        }else{
            //VERIFICA SE O VALOR DO INPUT ESTÁ ENTRO DO PADRÃO DO REGEX
            if(padraoPhone.test(phoneTwo) == true) {
                //SETA O NAME DO INPUT DE EMAIL COMO true
                setPhoneTwoValid(true)
            }else{
                //SETA O NAME DO INPUT DE EMAIL COMO false
                setPhoneTwoValid(false)
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
        if(nameValid == true && cpfValid == true){
            //SETA O ESTADO DO BOTÃO COMO true
            setBtnValid(true)
        }else{
            //SETA O ESTADO DO BOTÃO COMO false
            setBtnValid(false)
        }
    },[nameValid, cpfValid, updateUserModal])

    return(
        <>
            {updateUserModal == true && (    
                <div className={`fixed top-0 left-0 z-[4] min-w-screen min-h-screen flex flex-col items-center justify-center ${theme == 'light' ? 'bg-[#0d0d0d8d]' : 'bg-[#fefefedc]'}`}>

                    <IoMdClose
                        onClick={() => toggleUpdateUserModal()}
                        className={`transition-all duration-[.3s] hover:rotate-[360deg] cursor-pointer absolute top-0 right-0 m-5 text-[34px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`}
                    />
                    
                    <div className={`py-3 w-[80%] min-h-[280px] max-w-[500px] flex flex-col items-center rounded-[8px] justify-start ${theme == 'light' ? 'bg-my-white' : 'bg-my-black'}`}>
                        <h1 className={`font-bold text-[24px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Informações</h1>
                        
                            <label  className={`w-[80%] cursor-pointer flex items-center justify-start gap-2`} htmlFor='fileArchive'>
                                <div className={`block p-3 rounded-[50%] ${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} hover:scale-[1.2] transition-all duration-[.45s]`}>
                                    <FaImage className={`${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
                                </div>
                                <p className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Trocar imagem e perfil</p>
                            </label>

                        {img !== undefined && (
                            <div
                                style={{ backgroundImage: `url('${img}')` }}
                                className={`my-2 w-[100px] h-[100px] rounded-[50%] bg-cover`}
                            />
                        )}

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
                            type={'phone'}
                            label={'Telefone 1'}
                            placeholder={'11 00000-0000'}
                            validate={phoneOneValid}
                            value={phoneOne}
                            onChange={handlePhoneOneInput}
                            ind={'phone'}
                        />
                        
                        <Input
                            type={'phone'}
                            label={'Telefone 2'}
                            placeholder={'11 00000-0000'}
                            validate={phoneTwoValid}
                            value={phoneTwo}
                            onChange={handlePhoneTwoInput}
                            ind={'phone'}
                        />

                        <Button text={'atualizar'} event={() => updateUser()} />
                    </div>

                    {/* <label className='absolute top-[-6px] right-[-6px]' htmlFor='fileArchive'>
                        <div className={`w-full flex flex-row items-center justify-between`}>
                            <p
                                className={`
                                    hover:scale-[1.1]
                                    transition-all
                                    duration-[.3s]
                                    cursor-pointer
                                    text-[32px]
                                    rounded-[50%]
                                    p-2
                                    bg-my-secondary
                                    ${theme == 'light' ? 'text-my-white' : 'text-my-black'}
                                `}
                            >imagem</p>
                        </div>
                    </label> */}

                    <div className={`w-[90%] sm:w-[60%] flex flex-row items-center justify-center relative`}>
                        <input ref={inputFileRef} className='hidden' type="file" name="fileArchive" id="fileArchive" onChange={handleFileIMG} />
                    </div>
                </div>
            )}
        </>
    )
}