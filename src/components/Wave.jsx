
import * as React from "react"
import { motion } from "framer-motion"

function Wave({ height = 790 }) { 
  const startOffsets = [20, 60, 100, 40, 80]
  const bubbleSizes = [20, 25, 15, 18, 22]
  const bubbleDurations = [14, 18, 11, 16, 13]
  const startYOffsets = [0, -30, -15, -45, -10]

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
      }}
    >
      {/* Hullámok */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "85%",
          zIndex: 0,
          opacity: 0.3,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              bottom: i * 10,
              left: 0,
              width: "200%",
              height: "100%",
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="%2313465B"/></svg>')`,
              backgroundSize: "50% 100%",
              opacity: i === 0 ? 1 : i === 1 ? 0.5 : 0.3,
            }}
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Buborékok */}
      {[0, 1, 2, 3, 4].map((i) => {
        const startY = -Math.random() * 50
        return (
          <motion.div
            key={`bubble-${i}`}
            style={{
              position: "absolute",
              left: `${10 + i * 20}%`,
              bottom: startOffsets[i],
              width: bubbleSizes[i],
              height: bubbleSizes[i],
              borderRadius: "50%",
              backgroundColor: "rgba(19, 70, 91, 0.3)",
              zIndex: 1,
            }}
            initial={{ y: startYOffsets[i], opacity: 1 }}
            animate={{ y: -600 }} // magasabb animáció a hullám magasságáig
            transition={{
              duration: bubbleDurations[i],
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}
export default React.memo(Wave)