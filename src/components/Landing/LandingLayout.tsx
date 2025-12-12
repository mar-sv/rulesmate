import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FeedbackBar } from "@/components/FeedbackBar";

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 w-full flex flex-col items-center justify-center px-4 py-8"
      >
        <div className="max-w-4xl w-full space-y-12">
          {children}
        </div>
      </motion.div>
      <FeedbackBar />
    </main>
  );
};
