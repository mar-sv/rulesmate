import { motion } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings, Sparkles, Gamepad2, Dice5 } from "lucide-react";

const shortcuts = [
  { label: "Rules", icon: BookOpen },
  { label: "Clarifications", icon: MessageCircleQuestion },
  { label: "Walkthrough", icon: Play },
  { label: "Setup", icon: Settings },
];

// Option 1: Centered Cards with Glow Effect
const Option1 = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`flex flex-col items-center justify-center h-full gap-${isMobile ? '4' : '6'} px-${isMobile ? '3' : '8'}`}>
    {/* Logo/Icon */}
    <motion.div 
      className={`${isMobile ? 'w-14 h-14' : 'w-20 h-20'} rounded-2xl gradient-accent flex items-center justify-center shadow-glow`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Dice5 className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} text-foreground`} />
    </motion.div>
    
    {/* Title */}
    <div className="text-center space-y-1">
      <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-foreground`}>Rules Mate</h1>
      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Your AI Board Game Assistant</p>
    </div>
    
    {/* Game Input Card */}
    <div className={`w-full ${isMobile ? 'max-w-[240px]' : 'max-w-md'} bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-3 shadow-soft`}>
      <p className="text-xs text-muted-foreground mb-2 text-center">What game are you playing?</p>
      <input 
        type="text" 
        placeholder="Enter game name..."
        className={`w-full bg-background/50 border border-border/50 rounded-xl px-3 py-2 ${isMobile ? 'text-sm' : 'text-base'} text-foreground placeholder:text-muted-foreground`}
      />
    </div>
    
    {/* Intent Cards - 2x2 Grid */}
    <div className={`grid grid-cols-2 gap-2 w-full ${isMobile ? 'max-w-[240px]' : 'max-w-md'}`}>
      {shortcuts.map((shortcut) => {
        const Icon = shortcut.icon;
        return (
          <button 
            key={shortcut.label}
            className={`flex flex-col items-center gap-1.5 ${isMobile ? 'p-2.5' : 'p-4'} bg-card/30 border border-border/30 rounded-xl hover:border-accent-start/50 hover:bg-card/50 transition-all`}
          >
            <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-accent-start`} />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-foreground`}>{shortcut.label}</span>
          </button>
        );
      })}
    </div>
    
    {/* CTA Button */}
    <button className={`gradient-accent ${isMobile ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'} rounded-full text-foreground font-semibold shadow-glow`}>
      Let's Go
    </button>
  </div>
);

// Option 2: Minimal with Large Typography
const Option2 = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`flex flex-col h-full ${isMobile ? 'px-3' : 'px-12'}`}>
    {/* Top Section */}
    <div className="flex-1 flex flex-col justify-center gap-4">
      {/* Large Title */}
      <div className="space-y-2">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-extrabold leading-tight`}>
          <span className="text-foreground">Need help</span>
          <br />
          <span className="gradient-text">with a game?</span>
        </h1>
        <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-base'}`}>
          Get instant answers about rules, setup, and strategies.
        </p>
      </div>
      
      {/* Game Input - Full Width */}
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Type your game name..."
          className={`w-full bg-card border border-border rounded-xl px-4 ${isMobile ? 'py-2.5 text-sm' : 'py-3.5 text-base'} text-foreground placeholder:text-muted-foreground`}
        />
        
        {/* Intent Pills */}
        <div className={`flex ${isMobile ? 'flex-wrap' : ''} gap-2`}>
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <button 
                key={shortcut.label}
                className={`flex items-center gap-1.5 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} bg-transparent border border-accent-start/40 rounded-full whitespace-nowrap hover:bg-accent-start/10 transition-all`}
              >
                <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-accent-start`} />
                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-foreground`}>{shortcut.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    
    {/* Bottom CTA */}
    <div className="pb-4">
      <button className={`w-full gradient-accent ${isMobile ? 'py-3 text-sm' : 'py-4 text-lg'} rounded-2xl text-foreground font-bold shadow-glow`}>
        Start Chatting
      </button>
    </div>
  </div>
);

// Option 3: Playful with Illustrations
const Option3 = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`flex flex-col h-full ${isMobile ? 'px-3' : 'px-12'} relative`}>
    {/* Background decorative elements */}
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <Dice5 className={`absolute top-8 right-4 ${isMobile ? 'w-16 h-16' : 'w-28 h-28'} text-accent-start rotate-12`} />
      <Gamepad2 className={`absolute bottom-24 left-4 ${isMobile ? 'w-14 h-14' : 'w-24 h-24'} text-accent-end -rotate-12`} />
    </div>
    
    <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
      {/* Emoji Wave */}
      <motion.div 
        className={`${isMobile ? 'text-3xl' : 'text-5xl'}`}
        animate={{ rotate: [0, 14, -8, 14, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      >
        👋
      </motion.div>
      
      <div className="space-y-1">
        <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-foreground`}>Hey there!</h1>
        <p className={`text-foreground/80 ${isMobile ? 'text-sm' : 'text-lg'}`}>
          I'm <span className="gradient-text font-semibold">Rules Mate</span>, your friendly board game helper.
        </p>
      </div>
      
      {/* Intent Buttons */}
      <div className="space-y-2">
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>What do you need help with?</p>
        
        <div className={`${isMobile ? 'space-y-1.5' : 'grid grid-cols-2 gap-2'}`}>
          {shortcuts.slice(0, isMobile ? 3 : 4).map((shortcut) => {
            const Icon = shortcut.icon;
            return (
              <button 
                key={shortcut.label}
                className={`w-full flex items-center gap-3 ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} bg-card/50 border border-border/50 rounded-xl text-left hover:border-accent-start/50 hover:bg-card transition-all`}
              >
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-accent-start/20 flex items-center justify-center shrink-0`}>
                  <Icon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-accent-start`} />
                </div>
                <div className="min-w-0">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-foreground`}>{shortcut.label}</span>
                  <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground truncate`}>
                    {shortcut.label === "Rules" && "Learn how to play"}
                    {shortcut.label === "Clarifications" && "Resolve disputes"}
                    {shortcut.label === "Walkthrough" && "Step by step guide"}
                    {shortcut.label === "Setup" && "Get started quickly"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    
    {/* Game Input at Bottom */}
    <div className="pb-4 space-y-3 relative z-10">
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Which game?"
          className={`flex-1 min-w-0 bg-card border border-border rounded-xl px-4 ${isMobile ? 'py-2.5 text-sm' : 'py-3 text-base'} text-foreground placeholder:text-muted-foreground`}
        />
        <button className={`gradient-accent ${isMobile ? 'px-4 py-2.5' : 'px-6 py-3'} rounded-xl text-foreground font-semibold shadow-glow flex items-center gap-2 shrink-0`}>
          <Sparkles className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          <span className={isMobile ? 'text-sm' : 'text-base'}>Go</span>
        </button>
      </div>
    </div>
  </div>
);

// Device Frame Component
const DeviceFrame = ({ 
  children, 
  type, 
  label 
}: { 
  children: React.ReactNode; 
  type: "mobile" | "desktop";
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div 
      className={`
        bg-gradient-to-b from-[hsl(var(--bg-start))] to-[hsl(var(--bg-end))] 
        rounded-2xl border-2 border-border/50 overflow-hidden
        ${type === "mobile" ? "w-[200px] h-[400px]" : "w-[400px] h-[280px]"}
      `}
    >
      {children}
    </div>
  </div>
);

// Option Row Component
const OptionRow = ({ 
  title, 
  OptionComponent 
}: { 
  title: string; 
  OptionComponent: React.ComponentType<{ isMobile: boolean }>;
}) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-foreground text-center">{title}</h2>
    <div className="flex flex-wrap justify-center gap-6">
      <DeviceFrame type="mobile" label="Mobile">
        <OptionComponent isMobile={true} />
      </DeviceFrame>
      <DeviceFrame type="desktop" label="Desktop">
        <OptionComponent isMobile={false} />
      </DeviceFrame>
    </div>
  </div>
);

const LandingMockups = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2 py-4">
          <h1 className="text-2xl font-bold text-foreground">Landing Page Mockups</h1>
          <p className="text-muted-foreground text-sm">Mobile & Desktop side by side</p>
        </div>
        
        <OptionRow title="Option 1: Glowing Cards" OptionComponent={Option1} />
        <OptionRow title="Option 2: Bold Typography" OptionComponent={Option2} />
        <OptionRow title="Option 3: Playful & Friendly" OptionComponent={Option3} />
        
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">Which design do you prefer?</p>
        </div>
      </div>
    </div>
  );
};

export default LandingMockups;
