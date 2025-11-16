import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="max-w-4xl w-full space-y-12">
        {children}
      </div>
    </motion.div>
  );
};
