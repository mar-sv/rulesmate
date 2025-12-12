import { motion } from "framer-motion";

export const GreetingText = () => {
  return (
    <div className="space-y-2">
      <motion.h1 
        initial={{
          y: -20,
          opacity: 0
        }} 
        animate={{
          y: 0,
          opacity: 1
        }} 
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }} 
        className="text-foreground/90 text-center whitespace-nowrap"
      >
        <span className="text-2xl md:text-3xl font-bold">Rules Mate</span>
        <span className="text-lg md:text-xl italic font-normal ml-2">Your AI-Powered Board Game Assistant</span>
      </motion.h1>
      <motion.p
        initial={{
          y: -10,
          opacity: 0
        }} 
        animate={{
          y: 0,
          opacity: 1
        }} 
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: "easeOut"
        }} 
        className="text-xl text-foreground/70 text-center md:text-2xl"
      >
        Hey! How can I help you?
      </motion.p>
    </div>
  );
};