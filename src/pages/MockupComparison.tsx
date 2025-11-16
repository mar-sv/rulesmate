import { motion } from "framer-motion";
import { Pencil, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const MockupComparison = () => {
  const [game1, setGame1] = useState("Catan");
  const [game2, setGame2] = useState("Catan");
  const [game3, setGame3] = useState("Catan");
  const [game4, setGame4] = useState("Catan");
  const [isEditing2, setIsEditing2] = useState(false);

  return (
    <div className="min-h-screen w-full px-8 py-12 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Game Input Mockups</h1>
        <p className="text-muted-foreground">Choose your preferred design</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Option 1: Inline Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bga-surface border border-border/50 rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-accent-start/20 rounded-full text-sm font-medium text-accent-start">
              Option 1
            </div>
            <h3 className="text-xl font-semibold text-foreground">Inline Input Field</h3>
            <p className="text-sm text-muted-foreground">Clean text input blended into sentence</p>
          </div>

          <div className="text-2xl text-foreground/90 flex flex-wrap items-center gap-2">
            <span>I want</span>
            <span className="gradient-text font-semibold">rules</span>
            <span>for</span>
            <input
              type="text"
              value={game1}
              onChange={(e) => setGame1(e.target.value)}
              placeholder="type game here..."
              className="bg-background/50 border-b-2 border-accent-start/40 focus:border-accent-start px-3 py-1 outline-none gradient-text font-semibold min-w-[200px] placeholder:text-muted-foreground placeholder:text-base"
            />
          </div>
        </motion.div>

        {/* Option 2: Highlighted Editable Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bga-surface border border-border/50 rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-accent-start/20 rounded-full text-sm font-medium text-accent-start">
              Option 2
            </div>
            <h3 className="text-xl font-semibold text-foreground">Highlighted Editable</h3>
            <p className="text-sm text-muted-foreground">Gradient text with edit icon</p>
          </div>

          <div className="text-2xl text-foreground/90 flex flex-wrap items-center gap-2">
            <span>I want</span>
            <span className="gradient-text font-semibold">rules</span>
            <span>for</span>
            {isEditing2 ? (
              <input
                type="text"
                value={game2}
                onChange={(e) => setGame2(e.target.value)}
                onBlur={() => setIsEditing2(false)}
                autoFocus
                className="bg-transparent border-b-2 border-accent-start gradient-text font-semibold min-w-[200px] outline-none px-2"
              />
            ) : (
              <button
                onClick={() => setIsEditing2(true)}
                className="gradient-text font-semibold hover:scale-105 transition-transform px-2 py-1 rounded-lg hover:bg-accent/10 flex items-center gap-1 group"
              >
                {game2}
                <Pencil className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Option 3: Pill/Chip Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bga-surface border border-border/50 rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-accent-start/20 rounded-full text-sm font-medium text-accent-start">
              Option 3
            </div>
            <h3 className="text-xl font-semibold text-foreground">Pill/Chip Style</h3>
            <p className="text-sm text-muted-foreground">Game name in rounded chip</p>
          </div>

          <div className="text-2xl text-foreground/90 flex flex-wrap items-center gap-2">
            <span>I want</span>
            <span className="gradient-text font-semibold">rules</span>
            <span>for</span>
            <div className="inline-flex items-center gap-2 gradient-accent rounded-full px-4 py-1.5 shadow-soft">
              <input
                type="text"
                value={game3}
                onChange={(e) => setGame3(e.target.value)}
                className="bg-transparent outline-none font-semibold text-foreground min-w-[120px]"
              />
              <button className="hover:scale-110 transition-transform">
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Option 4: Dropdown Hybrid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bga-surface border border-border/50 rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-accent-start/20 rounded-full text-sm font-medium text-accent-start">
              Option 4
            </div>
            <h3 className="text-xl font-semibold text-foreground">Dropdown Hybrid</h3>
            <p className="text-sm text-muted-foreground">Editable with dropdown suggestions</p>
          </div>

          <div className="text-2xl text-foreground/90 flex flex-wrap items-center gap-2">
            <span>I want</span>
            <span className="gradient-text font-semibold">rules</span>
            <span>for</span>
            <div className="relative inline-block">
              <button className="gradient-text font-semibold hover:scale-105 transition-transform px-3 py-1 rounded-lg hover:bg-accent/10 flex items-center gap-2">
                <input
                  type="text"
                  value={game4}
                  onChange={(e) => setGame4(e.target.value)}
                  className="bg-transparent outline-none min-w-[120px]"
                />
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 bg-bga-surface border border-border/50 rounded-xl p-2 min-w-[200px] shadow-soft">
                <div className="text-sm space-y-1">
                  <div className="text-muted-foreground px-3 py-1">Popular:</div>
                  {["Catan", "Wingspan", "Azul"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGame4(g)}
                      className="w-full text-left px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center pt-8">
        <p className="text-muted-foreground text-sm">
          All options maintain gradient theme & allow custom game input
        </p>
      </div>
    </div>
  );
};

export default MockupComparison;
