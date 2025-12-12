import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings } from "lucide-react";
import { FeedbackBar } from "@/components/FeedbackBar";

const shortcuts = [
  { label: "Rules", icon: BookOpen, subtitle: "Learn how to play", intent: "rules" },
  { label: "Clarifications", icon: MessageCircleQuestion, subtitle: "Quick answers", intent: "clarifications" },
  { label: "Walkthrough", icon: Play, subtitle: "Step-by-step", intent: "walkthrough" },
  { label: "Setup", icon: Settings, subtitle: "Get started fast", intent: "setup" },
];

const Index = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleSubmit = () => {
    if (game.trim() && selectedIntent) {
      navigate("/chat", { state: { intent: selectedIntent, game: game.trim() } });
    }
  };

  const handleIntentClick = (intent: string) => {
    setSelectedIntent(intent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && game.trim() && selectedIntent) {
      handleSubmit();
    }
  };

  return (
    <main className="h-[100dvh] flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 w-full flex flex-col items-center justify-center px-4 py-4 sm:py-8"
      >
        <div className="flex flex-col items-center text-center max-w-md md:max-w-2xl w-full">
          {/* Brand */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-2 mb-8 md:mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black gradient-text">Rules Mate</h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Board game help, instantly.</p>
          </motion.div>
          
          {/* Game Input */}
          <motion.input 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            type="text" 
            placeholder="Which game?"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-card border border-border rounded-xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg text-foreground placeholder:text-muted-foreground text-center mb-6 md:mb-8 focus:outline-none focus:ring-2 focus:ring-accent-start/50 focus:border-accent-start/50 transition-all"
          />
          
          {/* Intent Grid */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-2xl mb-6 md:mb-8"
          >
            {shortcuts.map((shortcut, index) => {
              const Icon = shortcut.icon;
              const isSelected = selectedIntent === shortcut.intent;
              return (
                <motion.button 
                  key={shortcut.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleIntentClick(shortcut.intent)}
                  className={`flex flex-col items-center gap-1.5 md:gap-2 p-3 sm:p-4 md:p-5 bg-card/30 border rounded-xl transition-all ${
                    isSelected 
                      ? "border-accent-start bg-accent-start/10" 
                      : "border-border/30 hover:border-accent-start/50 hover:bg-card/50"
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? "bg-accent-start/30" : "bg-accent-start/20"
                  }`}>
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isSelected ? "text-accent-end" : "text-accent-start"}`} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">{shortcut.label}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    {shortcut.subtitle}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
          
          {/* CTA Button */}
          <motion.button 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!game.trim() || !selectedIntent}
            className="gradient-accent px-10 sm:px-12 md:px-16 py-3 md:py-4 rounded-full text-foreground text-base md:text-lg font-bold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Start
          </motion.button>
        </div>
      </motion.div>
      <FeedbackBar />
    </main>
  );
};

export default Index;
