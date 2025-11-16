import { motion } from "framer-motion";
export const GreetingText = () => {
  return <motion.h1 initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className="text-2xl text-foreground/90 text-center mb-4 font-medium md:text-4xl">
      Hey! How can I help you?
    </motion.h1>;
};