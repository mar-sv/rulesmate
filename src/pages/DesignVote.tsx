import { motion } from "framer-motion";
import { BookOpen, MessageCircleQuestion, Play, Settings, Check, ThumbsUp } from "lucide-react";
import { useState } from "react";

const shortcuts = [
  { label: "Rules", icon: BookOpen, subtitle: "Learn how to play" },
  { label: "Clarifications", icon: MessageCircleQuestion, subtitle: "Quick answers" },
  { label: "Walkthrough", icon: Play, subtitle: "Step-by-step" },
  { label: "Setup", icon: Settings, subtitle: "Get started fast" },
];

// Current Design Recreation
const CurrentDesign = ({ isMobile }: { isMobile: boolean }) => {
  const [selectedIntent, setSelectedIntent] = useState("rules");
  
  return (
    <div className={`flex flex-col items-center justify-center h-full ${isMobile ? 'px-3' : 'px-8'} text-center`}>
      {/* Greeting */}
      <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-muted-foreground mb-2`}>
        Hey! How can I help you?
      </p>
      
      {/* Interactive Sentence */}
      <div className={`flex flex-wrap items-center justify-center gap-1 mb-4 ${isMobile ? 'text-base' : 'text-2xl'}`}>
        <span className="font-bold text-foreground">I want</span>
        <button 
          onClick={() => {
            const intents = ["rules", "clarifications", "walkthrough", "setup"];
            const next = (intents.indexOf(selectedIntent) + 1) % intents.length;
            setSelectedIntent(intents[next]);
          }}
          className="gradient-text font-semibold px-1"
        >
          {selectedIntent}
        </button>
        <span className="font-bold text-foreground">for</span>
        <span className="gradient-text font-semibold border-b-2 border-accent-start/60 px-1">
          Catan<span className="animate-pulse">|</span>
        </span>
      </div>
      
      {/* CTA Button */}
      <button className={`gradient-accent ${isMobile ? 'px-5 py-2 text-sm' : 'px-8 py-3 text-base'} rounded-full text-foreground font-semibold shadow-glow mb-4`}>
        Let's Go
      </button>
      
      {/* Shortcut Chips */}
      <div className={`flex flex-wrap gap-2 justify-center ${isMobile ? 'max-w-[220px]' : ''}`}>
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <button 
              key={shortcut.label}
              className={`flex items-center gap-1.5 ${isMobile ? 'px-2.5 py-1.5 text-xs' : 'px-4 py-2 text-sm'} border border-accent-start/40 rounded-full text-foreground hover:bg-accent-start/10 transition-all`}
            >
              <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span>{shortcut.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// New Design (Option 2C)
const NewDesign = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`flex flex-col items-center justify-center h-full ${isMobile ? 'px-4' : 'px-12'} text-center`}>
    {/* Brand Centered */}
    <div className="space-y-1 mb-4">
      <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-black gradient-text`}>Rules Mate</h1>
      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Board game help, instantly.</p>
    </div>
    
    {/* Game Input */}
    <input 
      type="text" 
      placeholder="Which game?"
      className={`w-full ${isMobile ? 'max-w-[200px]' : 'max-w-sm'} bg-card border border-border rounded-xl px-4 ${isMobile ? 'py-2.5 text-sm' : 'py-3 text-base'} text-foreground placeholder:text-muted-foreground text-center mb-4`}
    />
    
    {/* Intent Grid with Subtitles */}
    <div className={`grid grid-cols-2 gap-2 ${isMobile ? 'w-full max-w-[220px]' : 'w-full max-w-md'} mb-4`}>
      {shortcuts.map((shortcut) => {
        const Icon = shortcut.icon;
        return (
          <button 
            key={shortcut.label}
            className={`flex flex-col items-center gap-1 ${isMobile ? 'p-2' : 'p-3'} bg-card/30 border border-border/30 rounded-xl hover:border-accent-start/50 hover:bg-card/50 transition-all`}
          >
            <div className={`${isMobile ? 'w-7 h-7' : 'w-9 h-9'} rounded-lg bg-accent-start/20 flex items-center justify-center`}>
              <Icon className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-accent-start`} />
            </div>
            <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-foreground`}>{shortcut.label}</span>
            <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-muted-foreground leading-tight`}>
              {shortcut.subtitle}
            </span>
          </button>
        );
      })}
    </div>
    
    {/* CTA */}
    <button className={`gradient-accent ${isMobile ? 'px-8 py-2.5 text-sm' : 'px-12 py-3 text-base'} rounded-full text-foreground font-bold shadow-glow`}>
      Start
    </button>
  </div>
);

// Device Frame Component
const DeviceFrame = ({ 
  children, 
  type,
}: { 
  children: React.ReactNode; 
  type: "mobile" | "desktop";
}) => (
  <div 
    className={`
      bg-gradient-to-b from-[hsl(var(--bg-start))] to-[hsl(var(--bg-end))] 
      rounded-2xl border-2 border-border/50 overflow-auto shadow-xl
      ${type === "mobile" ? "w-[260px] h-[520px]" : "w-[520px] h-[400px]"}
    `}
  >
    {children}
  </div>
);

// Voting Card
const VotingCard = ({ 
  title, 
  description,
  votes,
  onVote,
  isVoted,
  children,
  isMobile,
}: { 
  title: string;
  description: string;
  votes: number;
  onVote: () => void;
  isVoted: boolean;
  children: React.ReactNode;
  isMobile: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-card/30 border border-border/30"
  >
    <div className="text-center space-y-1">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
    </div>
    
    <DeviceFrame type={isMobile ? "mobile" : "desktop"}>
      {children}
    </DeviceFrame>
    
    <button
      onClick={onVote}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
        isVoted 
          ? 'gradient-accent text-foreground shadow-glow' 
          : 'bg-card border border-border text-foreground hover:border-accent-start/50'
      }`}
    >
      {isVoted ? <Check className="w-4 h-4" /> : <ThumbsUp className="w-4 h-4" />}
      {isVoted ? "Voted!" : "Vote"}
      <span className="bg-background/30 px-2 py-0.5 rounded-full text-xs">
        {votes}
      </span>
    </button>
  </motion.div>
);

const DesignVote = () => {
  const [votes, setVotes] = useState({ current: 0, new: 0 });
  const [voted, setVoted] = useState<"current" | "new" | null>(null);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("desktop");

  const handleVote = (design: "current" | "new") => {
    if (voted === design) {
      setVoted(null);
      setVotes(prev => ({ ...prev, [design]: prev[design] - 1 }));
    } else {
      if (voted) {
        setVotes(prev => ({ ...prev, [voted]: prev[voted] - 1 }));
      }
      setVoted(design);
      setVotes(prev => ({ ...prev, [design]: prev[design] + 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold gradient-text">Rules Mate</h1>
          <p className="text-lg text-foreground mt-1">Landing Page Design Vote</p>
          <p className="text-muted-foreground text-sm mt-2">Help us choose the best design — click to vote!</p>
        </div>
      </header>
      
      {/* View Toggle */}
      <div className="flex justify-center py-6">
        <div className="flex gap-1 p-1 bg-card border border-border rounded-full">
          <button
            onClick={() => setViewMode("desktop")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "desktop" 
                ? "gradient-accent text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Desktop View
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "mobile" 
                ? "gradient-accent text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mobile View
          </button>
        </div>
      </div>
      
      {/* Comparison Section */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
          {/* Option A: Current Design */}
          <VotingCard
            title="Option A"
            description="Interactive sentence with rotating game names and shortcut chips"
            votes={votes.current}
            onVote={() => handleVote("current")}
            isVoted={voted === "current"}
            isMobile={viewMode === "mobile"}
          >
            <CurrentDesign isMobile={viewMode === "mobile"} />
          </VotingCard>
          
          {/* VS Divider */}
          <div className="hidden lg:flex flex-col items-center justify-center h-[400px]">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
            <span className="absolute bg-background px-3 py-1 text-muted-foreground font-bold">VS</span>
          </div>
          <div className="lg:hidden flex items-center justify-center w-full py-2">
            <span className="bg-card px-4 py-2 rounded-full text-muted-foreground font-bold border border-border">VS</span>
          </div>
          
          {/* Option B: New Design */}
          <VotingCard
            title="Option B"
            description="Clean centered layout with brand focus and descriptive icon grid"
            votes={votes.new}
            onVote={() => handleVote("new")}
            isVoted={voted === "new"}
            isMobile={viewMode === "mobile"}
          >
            <NewDesign isMobile={viewMode === "mobile"} />
          </VotingCard>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-8 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Share this page to collect votes from your team
        </p>
      </footer>
    </div>
  );
};

export default DesignVote;
