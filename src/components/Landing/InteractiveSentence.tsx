import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const intents = ["rules", "clarifications", "walkthrough", "setup"];
const games = ["Catan", "Terraforming Mars", "Azul", "Carcassonne"];

interface InteractiveSentenceProps {
  onSubmit: (intent: string, game: string) => void;
}

export const InteractiveSentence = ({ onSubmit }: InteractiveSentenceProps) => {
  const [selectedIntent, setSelectedIntent] = useState(intents[0]);
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  // Auto-rotate game names
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectedGame(games[currentGameIndex]);
  }, [currentGameIndex]);

  const handleIntentClick = () => {
    const currentIndex = intents.indexOf(selectedIntent);
    const nextIndex = (currentIndex + 1) % intents.length;
    setSelectedIntent(intents[nextIndex]);
  };

  const handleGameClick = () => {
    const currentIndex = games.indexOf(selectedGame);
    const nextIndex = (currentIndex + 1) % games.length;
    setSelectedGame(games[nextIndex]);
    setCurrentGameIndex(nextIndex);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center space-y-8"
    >
      <div className="text-4xl md:text-5xl font-bold text-white flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <span>I want</span>
        <button
          onClick={handleIntentClick}
          className="gradient-text font-semibold hover:scale-105 transition-transform cursor-pointer px-2 py-1 rounded-lg hover:bg-accent/10"
        >
          {selectedIntent}
        </button>
        <span>for</span>
        <div className="relative inline-block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedGame}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 gradient-accent rounded-full px-4 py-2 shadow-soft"
            >
              <input
                type="text"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                onFocus={handleFocus}
                placeholder="Enter game name..."
                className="bg-transparent outline-none font-semibold text-foreground w-[160px] placeholder:text-foreground/50 placeholder:text-sm"
              />
            </motion.div>
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
