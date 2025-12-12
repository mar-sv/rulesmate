import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowLeft } from "lucide-react";

const availableGames = [
  "Catan",
  "Catan: Seafarers",
  "Catan: Cities & Knights",
  "Ticket to Ride",
  "Ticket to Ride: Europe",
  "Monopoly",
  "Monopoly Deal",
  "Scrabble",
  "Chess",
  "Pandemic",
  "Pandemic Legacy",
  "Azul",
  "Azul: Summer Pavilion",
  "Wingspan",
  "Codenames",
  "7 Wonders",
];

const GameInputMockups = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);
  const [showResults3, setShowResults3] = useState(false);
  const [showResults4, setShowResults4] = useState(false);
  const [selected1, setSelected1] = useState<string | null>(null);
  const [selected2, setSelected2] = useState<string | null>(null);
  const [selected3, setSelected3] = useState<string | null>(null);
  const [selected4, setSelected4] = useState<string | null>(null);

  const filterGames = (query: string) => {
    if (!query.trim()) return [];
    return availableGames.filter(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );
  };

  const hasNoMatch = (query: string) => {
    if (!query.trim()) return false;
    return !availableGames.some(game => 
      game.toLowerCase().includes(query.toLowerCase())
    );
  };

  // All options use: Show after space or 3+ chars
  useEffect(() => {
    const hasSpace = input1.includes(" ");
    if ((hasSpace || input1.length >= 3) && !selected1) {
      setShowResults1(true);
    } else {
      setShowResults1(false);
    }
  }, [input1, selected1]);

  useEffect(() => {
    const hasSpace = input2.includes(" ");
    if ((hasSpace || input2.length >= 3) && !selected2) {
      setShowResults2(true);
    } else {
      setShowResults2(false);
    }
  }, [input2, selected2]);

  useEffect(() => {
    const hasSpace = input3.includes(" ");
    if ((hasSpace || input3.length >= 3) && !selected3) {
      setShowResults3(true);
    } else {
      setShowResults3(false);
    }
  }, [input3, selected3]);

  useEffect(() => {
    const hasSpace = input4.includes(" ");
    if ((hasSpace || input4.length >= 3) && !selected4) {
      setShowResults4(true);
    } else {
      setShowResults4(false);
    }
  }, [input4, selected4]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2 mt-8">
          Game Input Validation Mockups
        </h1>
        <p className="text-muted-foreground mb-8">
          4 visual approaches for game validation (all trigger after 3 chars or space)
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mockup 1: Dropdown with highlight */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Mockup 1
              </span>
              <span className="text-foreground font-semibold">Dropdown with Match Highlight</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Classic dropdown showing matches with the search term highlighted in the results.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected1 || input1}
                      onChange={(e) => { setInput1(e.target.value); setSelected1(null); }}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {selected1 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults1 && !selected1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {hasNoMatch(input1) ? (
                          <div className="p-4 text-center">
                            <p className="text-foreground font-medium mb-1">Game not found</p>
                            <p className="text-muted-foreground text-sm mb-3">
                              We don't have "{input1}" yet
                            </p>
                            <button className="text-accent-start text-sm hover:underline">
                              Request this game →
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            {filterGames(input1).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected1(game); setInput1(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                              >
                                <span dangerouslySetInnerHTML={{
                                  __html: game.replace(
                                    new RegExp(`(${input1})`, 'gi'),
                                    '<strong class="text-accent-start">$1</strong>'
                                  )
                                }} />
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try typing "cat" or "tick"
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Which game?"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base text-foreground"
                      value="Cat"
                      readOnly
                    />
                  </div>
                  <div className="mt-2 bg-card border border-border rounded-lg overflow-hidden text-sm shadow-lg">
                    {["Catan", "Catan: Seafarers", "Catan: Cities & Knights"].map((game) => (
                      <div key={game} className="px-3 py-2.5 border-b border-border/50 last:border-0 text-foreground">
                        <strong className="text-accent-start">Cat</strong>an{game.replace("Catan", "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mockup 2: Inline validation with border color */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Mockup 2
              </span>
              <span className="text-foreground font-semibold">Inline Validation + Border State</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Border color changes based on validation state. Error message appears inline below input.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected2 || input2}
                      onChange={(e) => { setInput2(e.target.value); setSelected2(null); }}
                      placeholder="Which game are you playing?"
                      className={`w-full bg-card border-2 rounded-xl px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                        selected2 
                          ? "border-green-500/50 bg-green-500/5" 
                          : hasNoMatch(input2) && showResults2
                            ? "border-red-500/50 bg-red-500/5"
                            : "border-border focus:border-accent-start/50"
                      }`}
                    />
                    {selected2 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                    {hasNoMatch(input2) && showResults2 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults2 && !selected2 && filterGames(input2).length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <div className="max-h-48 overflow-y-auto">
                          {filterGames(input2).map((game) => (
                            <button
                              key={game}
                              onClick={() => { setSelected2(game); setInput2(game); }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                            >
                              {game}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Error state inline */}
                  <AnimatePresence>
                    {hasNoMatch(input2) && showResults2 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center mt-3"
                      >
                        <p className="text-red-400 text-sm mb-1">We don't have "{input2}" yet</p>
                        <button className="text-accent-start text-sm hover:underline">
                          Request it via feedback →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try typing "pan" or "gloom"
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile — Error state</span>
                <div className="max-w-[280px] mx-auto space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-card border-2 border-red-500/50 bg-red-500/5 rounded-lg px-4 py-3 text-base text-foreground"
                      value="Gloomhaven"
                      readOnly
                    />
                    <X className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-red-400 text-xs text-center">Game not available</p>
                  <button className="w-full text-accent-start text-xs hover:underline text-center">
                    Request this game →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mockup 3: Compact dropdown with count */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Mockup 3
              </span>
              <span className="text-foreground font-semibold">Dropdown with Match Count</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Shows number of matches in dropdown header. Clean, informative feedback.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected3 || input3}
                      onChange={(e) => { setInput3(e.target.value); setSelected3(null); }}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {selected3 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults3 && !selected3 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {hasNoMatch(input3) ? (
                          <div className="p-4">
                            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg mb-3">
                              <div>
                                <p className="text-foreground text-sm font-medium">"{input3}" not found</p>
                                <p className="text-muted-foreground text-xs mt-1">
                                  We're always adding new games. Use the feedback form to request this one!
                                </p>
                              </div>
                            </div>
                            <button className="w-full gradient-accent py-2 rounded-lg text-foreground text-sm font-medium">
                              Request "{input3}"
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            <div className="px-4 py-2 bg-background/50 border-b border-border/30">
                              <span className="text-xs text-muted-foreground">
                                {filterGames(input3).length} game{filterGames(input3).length !== 1 ? 's' : ''} found
                              </span>
                            </div>
                            {filterGames(input3).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected3(game); setInput3(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors"
                              >
                                {game}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try typing "mon" or "xyz"
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto">
                  <input
                    type="text"
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base text-foreground"
                    value="Ticket"
                    readOnly
                  />
                  <div className="mt-2 bg-card border border-border rounded-lg overflow-hidden text-sm shadow-lg">
                    <div className="px-3 py-2 bg-background/50 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">2 games found</span>
                    </div>
                    {["Ticket to Ride", "Ticket to Ride: Europe"].map((game) => (
                      <div key={game} className="px-3 py-2.5 border-b border-border/50 last:border-0 text-foreground">
                        {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mockup 4: Floating pill notification */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Mockup 4
              </span>
              <span className="text-foreground font-semibold">Floating Pill Notification</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Compact pill-shaped dropdown. Minimal visual footprint, modern feel.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected4 || input4}
                      onChange={(e) => { setInput4(e.target.value); setSelected4(null); }}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-full px-6 py-4 text-base text-foreground text-center placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {selected4 && (
                      <Check className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults4 && !selected4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-card border border-border rounded-2xl shadow-lg overflow-hidden z-50 min-w-[250px]"
                      >
                        {hasNoMatch(input4) ? (
                          <div className="p-4 text-center">
                            <p className="text-foreground text-sm mb-2">No match for "{input4}"</p>
                            <button className="text-accent-start text-sm hover:underline">
                              Request this game
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto py-2">
                            {filterGames(input4).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected4(game); setInput4(game); }}
                                className="w-full px-5 py-2.5 text-center text-foreground hover:bg-accent-start/10 transition-colors"
                              >
                                {game}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try typing "azu" or "wing"
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile</span>
                <div className="max-w-[280px] mx-auto">
                  <input
                    type="text"
                    className="w-full bg-card border border-border rounded-full px-4 py-3 text-base text-foreground text-center"
                    value="Azul"
                    readOnly
                  />
                  <div className="mt-3 mx-auto bg-card border border-border rounded-xl overflow-hidden text-sm shadow-lg max-w-[200px]">
                    {["Azul", "Azul: Summer Pavilion"].map((game) => (
                      <div key={game} className="px-4 py-2.5 border-b border-border/50 last:border-0 text-foreground text-center">
                        {game}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Visual Comparison</h2>
          <p className="text-muted-foreground text-sm mb-4">
            All mockups use the same trigger: suggestions appear after 3 characters or a space.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Mockup 1</h3>
              <p className="text-sm text-muted-foreground mb-2">Highlight matches</p>
              <p className="text-xs text-green-400">✓ Clear what matched</p>
              <p className="text-xs text-muted-foreground">Standard approach</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Mockup 2</h3>
              <p className="text-sm text-muted-foreground mb-2">Border validation</p>
              <p className="text-xs text-green-400">✓ Clear valid/invalid state</p>
              <p className="text-xs text-muted-foreground">Strong feedback</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Mockup 3</h3>
              <p className="text-sm text-muted-foreground mb-2">Match count</p>
              <p className="text-xs text-green-400">✓ Informative header</p>
              <p className="text-xs text-muted-foreground">Clean & helpful</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Mockup 4</h3>
              <p className="text-sm text-muted-foreground mb-2">Floating pill</p>
              <p className="text-xs text-green-400">✓ Modern aesthetic</p>
              <p className="text-xs text-muted-foreground">Minimal footprint</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInputMockups;
