import { motion } from "framer-motion";

export const GreetingText = () => {
  return (
    <motion.h1
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-8"
    >
      Hey! How can I help you?
    </motion.h1>
  );
};
