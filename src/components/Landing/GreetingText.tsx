import { motion } from "framer-motion";
export const GreetingText = () => {
  return <div className="space-y-2">
      <motion.h1 initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6,
      ease: "easeOut"
    }} className="text-2xl text-foreground/90 text-center font-medium md:text-3xl">
        Your AI-Powered Board Game Assistant
      </motion.h1>
      <motion.p initial={{
      y: -10,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }} className="text-xl text-foreground/70 text-center md:text-2xl">Hey! I'm Rules Mate, how can I help you?</motion.p>
    </div>;
};