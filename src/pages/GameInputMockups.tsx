import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, AlertCircle, Gamepad2, MessageSquare, ArrowLeft, Loader2 } from "lucide-react";

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
  const [isSearching2, setIsSearching2] = useState(false);
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

  // Option 1: Show results immediately when typing (min 2 chars)
  useEffect(() => {
    if (input1.length >= 2 && !selected1) {
      setShowResults1(true);
    } else {
      setShowResults1(false);
    }
  }, [input1, selected1]);

  // Option 2: Show results after a pause (debounced)
  useEffect(() => {
    if (input2.length >= 2 && !selected2) {
      setIsSearching2(true);
      const timer = setTimeout(() => {
        setShowResults2(true);
        setIsSearching2(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowResults2(false);
      setIsSearching2(false);
    }
  }, [input2, selected2]);

  // Option 3: Show after space or 3+ chars
  useEffect(() => {
    const hasSpace = input3.includes(" ");
    if ((hasSpace || input3.length >= 3) && !selected3) {
      setShowResults3(true);
    } else {
      setShowResults3(false);
    }
  }, [input3, selected3]);

  // Option 4: Show after Enter key (controlled separately)

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
          4 approaches for when to show matching games as the user types
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Option 1: Immediate (2+ characters) */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 1
              </span>
              <span className="text-foreground font-semibold">Immediate (2+ chars)</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Suggestions appear instantly after typing 2 characters. Fast but may feel jumpy.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop — Type 2+ characters to see suggestions</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={selected1 || input1}
                      onChange={(e) => { setInput1(e.target.value); setSelected1(null); }}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-xl pl-12 pr-12 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {selected1 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {hasNoMatch(input1) ? (
                          <div className="p-4 text-center">
                            <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                            <p className="text-foreground font-medium mb-1">Game not found</p>
                            <p className="text-muted-foreground text-sm mb-3">
                              We don't have "{input1}" yet
                            </p>
                            <button className="text-accent-start text-sm hover:underline flex items-center gap-1 mx-auto">
                              <MessageSquare className="w-4 h-4" />
                              Request this game
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            {filterGames(input1).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected1(game); setInput1(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3"
                              >
                                <Gamepad2 className="w-4 h-4 text-muted-foreground" />
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
                <span className="text-xs text-muted-foreground mb-2 block">Mobile Preview</span>
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
                      <div key={game} className="px-3 py-2.5 border-b border-border/50 last:border-0 text-foreground flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                        <span><strong className="text-accent-start">Cat</strong>an{game.replace("Catan", "")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Debounced (after pause) */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 2
              </span>
              <span className="text-foreground font-semibold">Debounced (500ms pause)</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Waits for user to stop typing before searching. Shows loading spinner. Less jumpy, slight delay.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop — Pause typing to see suggestions</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={selected2 || input2}
                      onChange={(e) => { setInput2(e.target.value); setSelected2(null); }}
                      placeholder="Which game are you playing?"
                      className="w-full bg-card border border-border rounded-xl pl-12 pr-12 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                    />
                    {isSearching2 && (
                      <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
                    )}
                    {selected2 && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {showResults2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {hasNoMatch(input2) ? (
                          <div className="p-4 text-center">
                            <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                            <p className="text-foreground font-medium mb-1">No matches for "{input2}"</p>
                            <p className="text-muted-foreground text-sm mb-3">
                              This game isn't in our library yet
                            </p>
                            <button className="gradient-accent px-4 py-2 rounded-lg text-foreground text-sm font-medium">
                              Request this game
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            <div className="px-3 py-2 bg-background/50 border-b border-border/30">
                              <span className="text-xs text-muted-foreground">
                                {filterGames(input2).length} games found
                              </span>
                            </div>
                            {filterGames(input2).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected2(game); setInput2(game); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3"
                              >
                                <Gamepad2 className="w-4 h-4 text-accent-start" />
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
                  Type and pause to trigger search
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile — With loading state</span>
                <div className="max-w-[280px] mx-auto space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base text-foreground"
                      value="Monop"
                      readOnly
                    />
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Searching...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Option 3: After space or 3+ chars */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 3
              </span>
              <span className="text-foreground font-semibold">After Space or 3+ Chars</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Shows suggestions after user types a space (indicating they're thinking) or after 3 characters.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop — Type 3 chars or press space</span>
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={selected3 || input3}
                      onChange={(e) => { setInput3(e.target.value); setSelected3(null); }}
                      placeholder="Which game are you playing?"
                      className={`w-full bg-card border-2 rounded-xl px-5 py-4 text-base text-foreground text-center placeholder:text-muted-foreground focus:outline-none transition-colors ${
                        selected3 
                          ? "border-green-500/50 bg-green-500/5" 
                          : hasNoMatch(input3) && showResults3
                            ? "border-red-500/50 bg-red-500/5"
                            : "border-border focus:border-accent-start/50"
                      }`}
                    />
                    {selected3 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                    {hasNoMatch(input3) && showResults3 && (
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
                    {showResults3 && !selected3 && filterGames(input3).length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <div className="max-h-48 overflow-y-auto">
                          {filterGames(input3).map((game) => (
                            <button
                              key={game}
                              onClick={() => { setSelected3(game); setInput3(game); }}
                              className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3"
                            >
                              <Gamepad2 className="w-4 h-4 text-accent-start" />
                              {game}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Error state inline */}
                  <AnimatePresence>
                    {hasNoMatch(input3) && showResults3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center mt-3"
                      >
                        <p className="text-red-400 text-sm mb-1">We don't have "{input3}" yet</p>
                        <button className="text-accent-start text-sm hover:underline">
                          Request it via feedback →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Try typing "pan" or "ticket "
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile — Error state</span>
                <div className="max-w-[280px] mx-auto space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-card border-2 border-red-500/50 bg-red-500/5 rounded-lg px-4 py-3 text-base text-foreground text-center"
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

          {/* Option 4: Explicit Search Button */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-start/20 text-accent-start px-3 py-1 rounded-full text-sm font-medium">
                Option 4
              </span>
              <span className="text-foreground font-semibold">Explicit Search (Enter/Button)</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              User must press Enter or click Search to validate. Most control, but extra step required.
            </p>
            
            <div className="space-y-4">
              {/* Desktop Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Desktop — Press Enter or click Search</span>
                <div className="relative max-w-md mx-auto">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={selected4 || input4}
                        onChange={(e) => { setInput4(e.target.value); setSelected4(null); setShowResults4(false); }}
                        onKeyDown={(e) => { if (e.key === "Enter" && input4.length >= 2) setShowResults4(true); }}
                        placeholder="Enter game name..."
                        className="w-full bg-card border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50"
                      />
                      {selected4 && (
                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <button 
                      onClick={() => { if (input4.length >= 2) setShowResults4(true); }}
                      className="gradient-accent px-6 py-4 rounded-xl text-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                      Search
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showResults4 && !selected4 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {hasNoMatch(input4) ? (
                          <div className="p-4">
                            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg mb-3">
                              <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />
                              <div>
                                <p className="text-foreground text-sm font-medium">"{input4}" not found</p>
                                <p className="text-muted-foreground text-xs mt-1">
                                  We're always adding new games. Use the feedback form to request this one!
                                </p>
                              </div>
                            </div>
                            <button className="w-full gradient-accent py-2 rounded-lg text-foreground text-sm font-medium">
                              Request "{input4}"
                            </button>
                          </div>
                        ) : (
                          <div className="max-h-48 overflow-y-auto">
                            <div className="px-3 py-2 bg-background/50 border-b border-border/30">
                              <span className="text-xs text-muted-foreground">
                                Found {filterGames(input4).length} matching games
                              </span>
                            </div>
                            {filterGames(input4).map((game) => (
                              <button
                                key={game}
                                onClick={() => { setSelected4(game); setInput4(game); setShowResults4(false); }}
                                className="w-full px-4 py-3 text-left text-foreground hover:bg-accent-start/10 transition-colors flex items-center gap-3"
                              >
                                <Gamepad2 className="w-5 h-5 text-accent-start" />
                                <span>{game}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Type "wing" then press Enter or click Search
                </p>
              </div>
              
              {/* Mobile Preview */}
              <div className="border border-border/50 rounded-xl p-4 bg-background/50">
                <span className="text-xs text-muted-foreground mb-2 block">Mobile — Stacked layout</span>
                <div className="max-w-[280px] mx-auto space-y-2">
                  <input
                    type="text"
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base text-foreground"
                    value="Wingspan"
                    readOnly
                  />
                  <button className="w-full gradient-accent py-3 rounded-lg text-foreground text-sm font-medium">
                    Search
                  </button>
                  <div className="bg-card border border-border rounded-lg overflow-hidden text-sm shadow-lg">
                    <div className="px-3 py-2 bg-background/50 border-b border-border/30">
                      <span className="text-xs text-muted-foreground">1 game found</span>
                    </div>
                    <div className="px-3 py-2.5 text-foreground flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-accent-start" />
                      Wingspan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">UX Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 1: Immediate</h3>
              <p className="text-sm text-muted-foreground mb-2">Shows after 2 characters</p>
              <p className="text-xs text-green-400">✓ Fastest feedback</p>
              <p className="text-xs text-red-400">✗ Can feel jumpy</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 2: Debounced</h3>
              <p className="text-sm text-muted-foreground mb-2">Waits 500ms after pause</p>
              <p className="text-xs text-green-400">✓ Smooth, less jumpy</p>
              <p className="text-xs text-red-400">✗ Slight delay</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 3: Space/3 chars</h3>
              <p className="text-sm text-muted-foreground mb-2">Triggers on space or length</p>
              <p className="text-xs text-green-400">✓ User-intent based</p>
              <p className="text-xs text-red-400">✗ Space behavior may confuse</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Option 4: Explicit</h3>
              <p className="text-sm text-muted-foreground mb-2">Requires Enter/button</p>
              <p className="text-xs text-green-400">✓ Full user control</p>
              <p className="text-xs text-red-400">✗ Extra step needed</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-accent-start/10 border border-accent-start/20 rounded-xl">
            <p className="text-foreground font-medium mb-1">💡 Recommendation</p>
            <p className="text-sm text-muted-foreground">
              <strong>Option 2 (Debounced)</strong> is typically the best UX balance — it feels responsive but not chaotic. 
              The loading spinner provides clear feedback that the system is working.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInputMockups;
