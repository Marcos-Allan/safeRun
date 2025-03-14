//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from "../../provider/context";

//IMPORTAÇÃO DOS ÍCONES
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";

//IMPORTAÇÃO DOS COMPONENTES
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import ModalUpdateUser  from '../../components/ModalUpdateUser'

//IMPORTAÇÃO DAS IMAGENS
import camisa from '../../assets/camisa-placeholder.png'

export default function MyPerfil() {

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme, user, toggleUpdateUserModal } = useContext(GlobalContext);

    useEffect(() => {
        console.log(user)
    },[])

    return(
        <div className={`max-w-screen sm:ps-[77px] sm:w-[100dvw-77px] min-h-[100dvh] flex flex-col items-center justify-start pt-[70px] ${theme == 'light' ? 'bg-my-white text-my-black' : 'bg-my-black text-my-white'} overflow-x-hidden pb-[80px]`}>
            <Header />
            
            {user.img !== undefined ? (
                <div
                    style={{ backgroundImage: `url('${user.img}')` }}
                    className={`my-2 w-[140px] h-[140px] rounded-[50%] bg-cover`}
                />
            ) : (
                <div className={`${theme == 'light' ? 'bg-my-black' : 'bg-my-white'} rounded-[50%] p-12`}>
                    <FaUser className={`text-[100px] ${theme == 'light' ? 'text-my-white' : 'text-my-black'}`} />
                </div>
            )}

            <p className={`text-center mt-5 text-[30px] font-bold ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{user.name}</p>
            
            <p className={`text-center mt-2 text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{user.cpf !== undefined ? user.cpf : '000.000.000-00'}</p>

            <p className={`text-center mt-2 text-[22px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>{user.email}</p>

            <div className={`mt-8 py-4 rounded-[32px] w-full sm:w-[80%] max-w-[700px] flex-grow-[1] flex flex-col items-center justify-start ${theme == 'light' ? 'bg-my-black text-my-white' : 'bg-my-white text-my-black'}`}>
                <h1 className={`text-[20px] font-semibold my-3 mb-4`}>Pedidos Concluidos</h1>
                <div className={`bg-my-gray p-4 w-[50%] rounded-[12px] opacity-[0.7]`}>
                    <img src={camisa} />
                </div>
            </div>

            <div
                onClick={() => toggleUpdateUserModal()}
                className={`w-[80%] max-w-[650px] flex items-center justify-center border-b-[1px] border-my-gray py-3 mt-3 mb-6 cursor-pointer hover:scale-[0.95] transition-all duration-[.3s]`}
            >
                <FaRegUser className={`text-[32px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`} />
                <div className={`flex-grow-[1] flex flex-col gap-[2px] items-start justify-center px-4`}>
                    <h1 className={`${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}>Minha Conta</h1>
                    <p className={`text-my-gray`}>Edite suas informações</p>
                </div>
                <MdArrowRightAlt className={`text-[42px] ${theme == 'light' ? 'text-my-black' : 'text-my-white'}`} />
            </div>
            
            <Navbar />
            <ModalUpdateUser />
        </div>   
    )
}
