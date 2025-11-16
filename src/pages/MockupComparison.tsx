import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";

const games = ["Catan", "Terraforming Mars", "Azul", "Carcassonne"];

const MockupComparison = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentGame = games[currentGameIndex];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-12 gap-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Game Input Mockups</h1>
        <p className="text-muted-foreground">Subtle, clean options for editable rolling game names</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Option 1: Underlined with Edit Icon on Hover */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card">
          <h2 className="text-xl font-semibold text-foreground">Option 1: Underlined + Icon</h2>
          <p className="text-sm text-muted-foreground">Subtle underline with edit icon appearing on hover</p>
          
          <div className="text-3xl md:text-4xl font-bold text-foreground flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span>I want</span>
            <span className="gradient-text">rules</span>
            <span>for</span>
            <div 
              className="relative inline-flex items-baseline gap-1.5"
              onMouseEnter={() => setHoveredOption(1)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGame}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="gradient-text border-b-2 border-accent-start/40 cursor-text px-1"
                >
                  {currentGame}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence>
                {hoveredOption === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pencil className="w-4 h-4 text-accent-start" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Option 2: Dotted Underline with Blinking Cursor */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card">
          <h2 className="text-xl font-semibold text-foreground">Option 2: Dotted + Cursor</h2>
          <p className="text-sm text-muted-foreground">Dotted underline with subtle blinking cursor hint</p>
          
          <div className="text-3xl md:text-4xl font-bold text-foreground flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span>I want</span>
            <span className="gradient-text">rules</span>
            <span>for</span>
            <div className="relative inline-flex items-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGame}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="gradient-text border-b-2 border-dotted border-accent-start/60 cursor-text px-1"
                >
                  {currentGame}
                </motion.span>
              </AnimatePresence>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent-start ml-0.5"
              >
                |
              </motion.span>
            </div>
          </div>
        </div>

        {/* Option 3: Subtle Gradient Background Glow */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card">
          <h2 className="text-xl font-semibold text-foreground">Option 3: Gradient Glow</h2>
          <p className="text-sm text-muted-foreground">Subtle gradient background that glows on hover</p>
          
          <div className="text-3xl md:text-4xl font-bold text-foreground flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span>I want</span>
            <span className="gradient-text">rules</span>
            <span>for</span>
            <div 
              className="relative"
              onMouseEnter={() => setHoveredOption(3)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGame}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`gradient-text px-3 py-1 rounded-lg cursor-text transition-all duration-300 ${
                    hoveredOption === 3 ? 'bg-accent/15 shadow-soft' : 'bg-accent/5'
                  }`}
                >
                  {currentGame}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Option 4: Minimal Border Box with Hint */}
        <div className="border border-border rounded-lg p-8 space-y-4 bg-card">
          <h2 className="text-xl font-semibold text-foreground">Option 4: Border Box</h2>
          <p className="text-sm text-muted-foreground">Minimal border with "click to edit" hint on hover</p>
          
          <div className="text-3xl md:text-4xl font-bold text-foreground flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span>I want</span>
            <span className="gradient-text">rules</span>
            <span>for</span>
            <div 
              className="relative inline-block"
              onMouseEnter={() => setHoveredOption(4)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGame}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`gradient-text px-3 py-1 rounded-md cursor-text transition-all duration-300 border inline-flex items-baseline gap-2 ${
                    hoveredOption === 4 
                      ? 'border-accent-start/60' 
                      : 'border-accent-start/20'
                  }`}
                >
                  <span>{currentGame}</span>
                  {hoveredOption === 4 && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 0.5, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-xs text-muted-foreground whitespace-nowrap"
                    >
                      (click to edit)
                    </motion.span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center max-w-2xl">
        All options feature rolling game names and make the field editable. Choose the style that feels most natural and clear to you.
      </p>
    </div>
  );
};

export default MockupComparison;
