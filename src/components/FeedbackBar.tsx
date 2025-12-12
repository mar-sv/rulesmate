import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
export const FeedbackBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    if (!message.trim()) return;
    // TODO: Handle feedback submission
    console.log("Feedback submitted:", message);
    setMessage("");
    setIsExpanded(false);
  };
  return (
    <div className="border-t border-border bg-background shrink-0">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            initial={{ height: 40 }}
            animate={{ height: "auto" }}
            exit={{ height: 40 }}
            className="p-2 sm:p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground">
                Found a bug? Have a suggestion? Let us know!
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Describe the issue..."
                className="flex-1 h-10 px-3 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button
                onClick={handleSubmit}
                size="icon"
                className="h-10 w-10 bg-[hsl(var(--feedback))] hover:bg-[hsl(var(--feedback))]/90 text-background shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-medium text-background bg-[hsl(var(--feedback))] hover:brightness-110 transition-all"
          >
            <ChevronUp className="w-3 h-3" />
            <span>Found a bug? Have a suggestion? Let us know!</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};