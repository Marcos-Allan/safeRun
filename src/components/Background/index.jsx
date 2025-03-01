import Circle from "../Circle";

export default function Background() {
    return(
        <div className={`w-screen h-screen fixed top-0 left-0 overflow-hidden`}>
            <Circle posX={-70} posY={-1} width={200}z bg={0} />
            <Circle posX={Number(window.innerWidth) - 90} posY={24} width={250} bg={1} />
        </div>
    )
}