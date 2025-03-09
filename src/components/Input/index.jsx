//IMPORTAÇÃO DAS BIBLIOTECAS
import { useContext, useState } from 'react'

//IMPORTAÇÃO DOS ICONES
import { FaCheck } from "react-icons/fa"
import { FaCircleXmark } from "react-icons/fa6"
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaRegIdCard } from "react-icons/fa6";

//IMPORTAÇÃO DO PROVEDOR DOS ESTADOS GLOBAIS
import { GlobalContext } from '../../provider/context';

export default function Input(props) {

    //UTILIZAÇÃO DO HOOK useState
    const [visible, setVisible] = useState(false)

    //IMPORTAÇÃO DAS VARIAVEIS DE ESTADO GLOBAL
    const { theme } = useContext(GlobalContext);

    //FUNÇÃO RESPONSÁVEL POR TROCAR O TIPO DO CAMPO DE TEXTO
    function togglePasswordType() {
        setVisible(!visible)
    }

    return(
        <div className='w-[80%] max-w-[700px]'>
            <label
                className={`font-left w-full
                    ${props.validate == true && 'text-my-primary'}
                    ${props.validate == false && 'text-my-red'}
                    ${props.validate == undefined && 'text-my-gray'}
                `}
            >{props.label}</label>
            {/* w-[80%] flex items-center justify-center pl-2 py-1 border-[1px] border-my-gray rounded-[8px] mb-6 */}
            <div
                className={`relative flex items-center justify-center mb-6 border-[1px] rounded-[8px] px-2
                    ${props.validate == true && 'border-my-primary'}
                    ${props.validate == false && 'border-my-red'}
                    ${props.validate == undefined && 'border-my-gray'}
                `}
            >
                {props.type && (
                        <>
                            {props.type == 'email' && (
                                <label>
                                    <MdOutlineEmail className={`text-[24px] mb-1
                                        ${props.validate == true && 'text-my-primary'}
                                        ${props.validate == false && 'text-my-red'}
                                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}`}
                                    />
                                </label>
                            )}
                            {props.type == 'name' && (
                                <label>
                                    <FiUser className={`text-[24px] mb-1
                                        ${props.validate == true && 'text-my-primary'}
                                        ${props.validate == false && 'text-my-red'}
                                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}`}
                                    />
                                </label>
                            )}
                            {props.type == 'code' && (
                                <label>
                                    <IoMdPhonePortrait className={`text-[24px] mb-1
                                        ${props.validate == true && 'text-my-primary'}
                                        ${props.validate == false && 'text-my-red'}
                                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}`}
                                    />
                                </label>
                            )}
                            {props.type == 'cpf' && (
                                <label>
                                    <FaRegIdCard className={`text-[24px] mb-1
                                        ${props.validate == true && 'text-my-primary'}
                                        ${props.validate == false && 'text-my-red'}
                                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}`}
                                    />
                                </label>
                            )}
                            {props.type == 'password' && (
                                <label>
                                    <HiOutlineLockClosed className={`text-[24px] mb-1
                                        ${props.validate == true && 'text-my-primary'}
                                        ${props.validate == false && 'text-my-red'}
                                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}`}
                                    />
                                </label>
                            )}
                            {props.type == 'password' && (
                                <div
                                    onClick={() => togglePasswordType()}
                                    className={`absolute right-0 mr-4 text-[24px] text-my-gray`}
                                >
                                    {visible == true ? (
                                        <LuEye
                                            className={`cursor-pointer transition-all duration-[.3s] hover:scale-[1.4]
                                                ${props.validate == true && 'text-my-primary'}
                                                ${props.validate == false && 'text-my-red'}
                                            `}
                                        />
                                    ):(
                                        <LuEyeOff 
                                            className={`cursor-pointer transition-all duration-[.3s] hover:scale-[1.4]
                                                ${props.validate == true && 'text-my-primary'}
                                                ${props.validate == false && 'text-my-red'}
                                            `}
                                        />
                                    )}
                                </div>
                            )}
                        </>
                )}
                <input
                    autoComplete={props.ind}
                    type={props.type && props.type == 'password' ? `${visible == true ? 'text' : 'password'}` : 'text'}
                    className={`
                        px-3 flex-grow-[1] h-full  outline-none py-[18px]
                        
                        ${props.validate == true && 'text-my-primary'}
                        ${props.validate == false && 'text-my-red'}
                        ${props.validate == undefined && `${theme == 'light' ? 'text-my-black' : 'text-my-white'}`}

                        ${props.validate == true && 'placeholder:text-my-primary'}
                        ${props.validate == false && 'placeholder:text-my-red'}
                        ${props.validate == undefined && 'placeholder:text-my-gray'}
                    `}
                    placeholder={`${props.placeholder}`}
                    value={props.value}
                    onChange={props.onChange}
                />

                {!props.type && props.validate == true && (
                    <div
                        className={`absolute right-0 mr-4 text-[24px] text-my-primary`}
                    >
                        <FaCheck />
                    </div>
                )}
                
                {!props.type && props.validate == false && (
                    <div
                        className={`absolute right-0 mr-4 text-[24px] text-my-red`}
                    >
                        <FaCircleXmark className='text-my-red'/>
                    </div>
                )}
            </div>
        </div>
    )
}