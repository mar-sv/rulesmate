import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
        <Bot className="w-5 h-5 text-foreground" />
      </div>
      <div className="bg-bga-surface rounded-2xl px-4 py-3 shadow-soft">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse-glow" />
          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse-glow" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};
