import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border/50 p-4 shrink-0 bg-background">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about the game..."
          disabled={disabled}
          className="flex-1 min-w-0 bg-bga-surface border border-border/50 rounded-2xl px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-start/50 disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-none gradient-accent rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-glow transition-all"
        >
          <Send className="w-5 h-5 text-foreground" />
        </motion.button>
      </div>
    </form>
  );
};
