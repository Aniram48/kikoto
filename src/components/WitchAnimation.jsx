import { motion } from "framer-motion" 
import WitchIcon from "../components/WitchIcon"

export default function WitchAnimation() {
  return (
    <motion.div
      className="absolute left-0 top-[40%] -translate-y-1/2 pointer-events-none z-0"
      initial={{ x: "-120px" }}
      animate={{
        x: "120vw",
        rotate: [-15, 15, -18, 12, -15],
        y: [0, -15, 10, -12, 0],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <WitchIcon />
    </motion.div>
  )
}