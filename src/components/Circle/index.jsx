import { motion } from 'framer-motion'

export default function Circle({ width, posX, posY, bg }) {
    console.log(`Background: ${bg}, posX: ${posX}, ${window.innerWidth}`)
    return(
        <motion.div
            initial={{
                left: `${posX >= Number(window.innerWidth / 2) ? width : `-${width}`}%`
            }}
            animate={{ left: posX }}
            transition={{ duration: 0.6, delay: `0.${Math.floor(Math.random() * 10)}` }}
            style={{ width: `${width}px`, height: `${width}px`, top: `${posY}%` }}
            className={`absolute rounded-[50%] ${bg === 0 ? 'bg-my-primary' : 'bg-my-secondary'}`}
        />
    )
}