import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings, Check, X } from "lucide-react";
import { FeedbackBar } from "@/components/FeedbackBar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { searchGames, Game, submitSelectedGame } from "@/lib/api";

const shortcuts = [
  { icon: BookOpen, intent: "rules" },
  { icon: MessageCircleQuestion, intent: "clarifications" },
  { icon: Play, intent: "walkthrough" },
  { icon: Settings, intent: "setup" },
];

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [game, setGame] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!game.trim() || selectedGame) {
      setSearchResults([]);
      return;
    }

    const hasSpace = game.includes(" ");
    if (!hasSpace && game.length < 3) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchGames(game);
        setSearchResults(results);
      } catch (error) {
        console.error("Failed to search games:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [game, selectedGame]);

  const hasNoMatch = !isSearching && game.trim().length >= 3 && searchResults.length === 0 && !selectedGame;

  // Show results when we have search results
  useEffect(() => {
    const hasSpace = game.includes(" ");
    if ((hasSpace || game.length >= 3) && !selectedGame && searchResults.length > 0) {
      setShowResults(true);
    } else if (searchResults.length === 0) {
      setShowResults(false);
    }
  }, [game, selectedGame, searchResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (selectedGame) {
      navigate("/chat", {
        state: {
          intent: selectedIntent || "general",
          game: selectedGame.name,
          gameId: selectedGame.id
        }
      });
    }
  };

  const handleIntentClick = (intent: string) => {
    setSelectedIntent(intent);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedGame) {
      handleSubmit();
    }
  };

  const handleGameSelect = (gameItem: Game) => {
    setSelectedGame(gameItem);
    setGame(gameItem.name);
    setShowResults(false);
    setSearchResults([]);
    void submitSelectedGame(gameItem).catch((error) => {
      console.error("Failed to submit selected game:", error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
    setSelectedGame(null);
  };

  const isValidGame = selectedGame !== null;
  const showError = hasNoMatch && showResults === false && game.trim().length >= 3;

  return (
    <main className="h-[100dvh] flex flex-col overflow-hidden relative">
      {/* Language Switcher - Top Right Corner */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
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
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black gradient-text">
              Rules Mate
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              {t("landing.tagline")}
            </p>
          </motion.div>
          
          {/* Game Input with Validation */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mb-6 md:mb-8"
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder={t("landing.inputPlaceholder")}
                value={game}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`w-full bg-card border-2 rounded-xl px-4 md:px-6 py-3 md:py-4 text-base md:text-lg text-foreground placeholder:text-muted-foreground focus:placeholder:text-transparent text-center focus:outline-none transition-all ${
                  isValidGame
                    ? "border-accent-start/50 bg-accent-start/5"
                    : showError
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-border focus:border-accent-start/50 focus:ring-2 focus:ring-accent-start/50"
                }`}
              />
              {isValidGame && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 inset-y-0 flex items-center"
                >
                  <Check className="w-5 h-5 text-accent-start" />
                </motion.div>
              )}
              {showError && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 inset-y-0 flex items-center"
                >
                  <X className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </div>
            
            {/* Dropdown Results */}
            <AnimatePresence>
              {showResults && !selectedGame && searchResults.length > 0 && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  <div className="max-h-48 overflow-y-auto">
                    {searchResults.map((gameItem) => (
                      <button
                        key={gameItem.id}
                        onClick={() => handleGameSelect(gameItem)}
                        className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                      >
                        {gameItem.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Error state inline */}
            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center mt-3"
                >
                  <p className="text-red-400 text-sm mb-1">
                    {t("landing.notFound", { game })}
                  </p>
                  <button className="text-muted-foreground text-xs hover:text-foreground transition-colors">
                    {t("landing.requestGame")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
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
              const label = t(`intents.${shortcut.intent}`);
              const subtitle = t(`intents.${shortcut.intent}Subtitle`);

              return (
                <motion.button
                  key={shortcut.intent}
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
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? "bg-accent-start/30" : "bg-accent-start/20"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                        isSelected ? "text-accent-end" : "text-accent-start"
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
                    {subtitle}
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
            disabled={!isValidGame}
            className="bg-accent-end px-10 sm:px-12 md:px-16 py-3 md:py-4 rounded-full text-foreground text-base md:text-lg font-bold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("landing.start")}
          </motion.button>
        </div>
      </motion.div>
      <FeedbackBar />
    </main>
  );
};

export default Index;
