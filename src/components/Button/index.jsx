import { MdOutlineArrowRightAlt } from "react-icons/md"
import { useNavigate } from "react-router"

export default function Button({ text, route, event }) {

    const navigate = useNavigate()

    return(
        <div
            onClick={() => {
                if(route){
                    navigate(route)
                    return
                }
                event()
            }}
            className={`border-[1px] border-my-secondary cursor-pointer hover:bg-transparent hover:text-my-secondary py-3 w-[80%] rounded-[6px] bg-my-secondary flex items-center justify-center relative text-my-white transition-all duration-[.15s] max-w-[700px]`}
        >
            <p className={`flex-grow-[1] uppercase text-center font-light text-[18px]`}>{text}</p>
            <MdOutlineArrowRightAlt
                className={`absolute right-0 mr-3 text-[32px]`}
            />
        </div>
    )
}