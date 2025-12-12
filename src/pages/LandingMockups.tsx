import { motion } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings, Sparkles, Gamepad2, Dice5 } from "lucide-react";

const shortcuts = [
  { label: "Rules", icon: BookOpen },
  { label: "Clarifications", icon: MessageCircleQuestion },
  { label: "Walkthrough", icon: Play },
  { label: "Setup", icon: Settings },
];

// Option 1: Centered Cards with Glow Effect
const Option1 = () => (
  <div className="bg-gradient-to-b from-[hsl(var(--bg-start))] to-[hsl(var(--bg-end))] min-h-[600px] p-4 rounded-xl border border-border">
    <div className="text-xs text-muted-foreground mb-2 text-center">Option 1: Glowing Cards</div>
    
    <div className="flex flex-col items-center justify-center h-[550px] gap-6 px-2">
      {/* Logo/Icon */}
      <motion.div 
        className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-glow"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Dice5 className="w-8 h-8 text-foreground" />
      </motion.div>
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-foreground">Rules Mate</h1>
        <p className="text-sm text-muted-foreground">Your AI Board Game Assistant</p>
      </div>
      
      {/* Game Input Card */}
      <div className="w-full max-w-xs bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-4 shadow-soft">
        <p className="text-xs text-muted-foreground mb-2 text-center">What game are you playing?</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter game name..."
            className="flex-1 min-w-0 bg-background/50 border border-border/50 rounded-xl px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      {/* Intent Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <button 
              key={shortcut.label}
              className="flex flex-col items-center gap-2 p-4 bg-card/30 border border-border/30 rounded-xl hover:border-accent-start/50 hover:bg-card/50 transition-all"
            >
              <Icon className="w-5 h-5 text-accent-start" />
              <span className="text-sm font-medium text-foreground">{shortcut.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* CTA Button */}
      <button className="gradient-accent px-8 py-3 rounded-full text-foreground font-semibold shadow-glow">
        Let's Go
      </button>
    </div>
  </div>
);

// Option 2: Minimal with Large Typography
const Option2 = () => (
  <div className="bg-gradient-to-b from-[hsl(var(--bg-start))] to-[hsl(var(--bg-end))] min-h-[600px] p-4 rounded-xl border border-border">
    <div className="text-xs text-muted-foreground mb-2 text-center">Option 2: Bold Typography</div>
    
    <div className="flex flex-col h-[550px] px-2">
      {/* Top Section */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* Large Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold leading-tight">
            <span className="text-foreground">Need help</span>
            <br />
            <span className="gradient-text">with a game?</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Get instant answers about rules, setup, and strategies.
          </p>
        </div>
        
        {/* Game Input - Full Width */}
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Type your game name..."
            className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground"
          />
          
          {/* Horizontal Scroll Intent Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {shortcuts.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <button 
                  key={shortcut.label}
                  className="flex items-center gap-2 px-4 py-2 bg-transparent border border-accent-start/40 rounded-full whitespace-nowrap hover:bg-accent-start/10 transition-all"
                >
                  <Icon className="w-4 h-4 text-accent-start" />
                  <span className="text-sm text-foreground">{shortcut.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom CTA - Fixed at bottom */}
      <div className="pb-4">
        <button className="w-full gradient-accent py-4 rounded-2xl text-foreground font-bold text-lg shadow-glow">
          Start Chatting
        </button>
      </div>
    </div>
  </div>
);

// Option 3: Playful with Illustrations
const Option3 = () => (
  <div className="bg-gradient-to-b from-[hsl(var(--bg-start))] to-[hsl(var(--bg-end))] min-h-[600px] p-4 rounded-xl border border-border overflow-hidden relative">
    <div className="text-xs text-muted-foreground mb-2 text-center relative z-10">Option 3: Playful & Friendly</div>
    
    {/* Background decorative elements */}
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <Dice5 className="absolute top-10 right-4 w-24 h-24 text-accent-start rotate-12" />
      <Gamepad2 className="absolute bottom-32 left-4 w-20 h-20 text-accent-end -rotate-12" />
    </div>
    
    <div className="flex flex-col h-[550px] px-2 relative z-10">
      {/* Greeting Section */}
      <div className="flex-1 flex flex-col justify-center gap-5">
        {/* Emoji Wave */}
        <motion.div 
          className="text-4xl"
          animate={{ rotate: [0, 14, -8, 14, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        >
          👋
        </motion.div>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Hey there!</h1>
          <p className="text-foreground/80 text-base">
            I'm <span className="gradient-text font-semibold">Rules Mate</span>, your friendly board game helper.
          </p>
        </div>
        
        {/* What do you need help with */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">What do you need help with?</p>
          
          {/* Stacked Intent Buttons */}
          <div className="space-y-2">
            {shortcuts.slice(0, 3).map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <button 
                  key={shortcut.label}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-card/50 border border-border/50 rounded-xl text-left hover:border-accent-start/50 hover:bg-card transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-start/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-start" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{shortcut.label}</span>
                    <p className="text-xs text-muted-foreground">
                      {shortcut.label === "Rules" && "Learn how to play"}
                      {shortcut.label === "Clarifications" && "Resolve disputes"}
                      {shortcut.label === "Walkthrough" && "Step by step guide"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Game Input at Bottom */}
      <div className="pb-4 space-y-3">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Which game?"
            className="flex-1 min-w-0 bg-card border border-border rounded-xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground"
          />
          <button className="gradient-accent px-5 py-3 rounded-xl text-foreground font-semibold shadow-glow flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Go
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LandingMockups = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2 py-4">
          <h1 className="text-2xl font-bold text-foreground">Landing Page Mockups</h1>
          <p className="text-muted-foreground text-sm">Mobile-optimized design proposals</p>
        </div>
        
        <Option1 />
        <Option2 />
        <Option3 />
        
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">Which design do you prefer?</p>
        </div>
      </div>
    </div>
  );
};

export default LandingMockups;
