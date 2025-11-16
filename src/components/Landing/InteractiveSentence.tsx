import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const intents = ["rules", "clarifications", "walkthrough", "setup"];
const games = ["Catan", "Terraforming Mars", "Azul", "Carcassonne"];

interface InteractiveSentenceProps {
  onSubmit: (intent: string, game: string) => void;
  selectedIntent: string;
  setSelectedIntent: (intent: string) => void;
}

export const InteractiveSentence = ({ onSubmit, selectedIntent, setSelectedIntent }: InteractiveSentenceProps) => {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const currentGame = games[currentGameIndex];

  // Auto-rotate game names when not editing
  useEffect(() => {
    if (isEditing) return;

    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setSelectedGame(games[currentGameIndex]);
    }
  }, [currentGameIndex, isEditing]);

  const handleIntentClick = () => {
    const currentIndex = intents.indexOf(selectedIntent);
    const nextIndex = (currentIndex + 1) % intents.length;
    setSelectedIntent(intents[nextIndex]);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(true);
    e.target.select();
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center space-y-8"
    >
      <div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white
                flex flex-nowrap
                items-center justify-center
                gap-2 md:gap-3"
      >
        <span>I want</span>
        <button
          onClick={handleIntentClick}
          className="gradient-text font-semibold hover:scale-105 transition-transform cursor-pointer px-2 py-1 rounded-lg hover:bg-accent/10"
        >
          {selectedIntent}
        </button>
        <span>for</span>
        <div className="relative inline-flex items-baseline justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={isEditing ? "editing" : currentGame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-baseline"
            >
              <input
                type="text"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit(selectedIntent, selectedGame);
                  }
                }}
                placeholder="Enter game name..."
                style={{ width: `${Math.max(selectedGame.length * 0.6, 8)}em` }}
                className="bg-transparent outline-none gradient-text font-semibold text-center border-b-2 border-accent-start/60 cursor-text px-2 pb-1 placeholder:text-foreground/50 placeholder:text-base"
              />
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent-start ml-1"
              >
                |
              </motion.span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit(selectedIntent, selectedGame)}
        className="gradient-accent px-8 py-4 rounded-full text-foreground font-semibold text-lg shadow-glow hover:shadow-[0_0_30px_rgba(177,94,255,0.5)] transition-all"
      >
        Let's Go
      </motion.button>
    </motion.div>
  );
};
